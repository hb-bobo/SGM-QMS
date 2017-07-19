/// <reference path="./index.d.ts" />
import AppConfig from '@/AppConfig';
import querystring from '@/utils/tools/querystring';

interface Opts {
    method?: 'POST' | 'GET',
    mode?: 'no-cors' | 'cors',
    data: any, 
    headers?: Headers,
    timeout?: number
}

interface StatusError extends Error {
    response?: Response
}

/** 
 * check response's status is ok
 * @param {Response}
 * 
 */
function checkStatus(response: Response) {
  if (response.status >= 200 && response.status < 300) {
    return response
  } else {
    var error: StatusError = new Error(response.statusText)
    error.response = response
    console.warn('response:' + error);
    return response;
  }
}
/** 
 * parese response to JSON
 * @param {Response}
 */
function parseJSON(response: Response) {
    return response.json()
}

/* 给fetch包装一个fetch, 增加超时功能 */
function _fetch(fetchPromise: Promise<any>, timeout: number)  {
    var abortFn: Function;

    // 这是一个可以被reject的promise
    var abortPromise: Promise<Function> = new Promise(function(resolve: Function, reject: Function) {
        abortFn = function() {
            reject('timeout');
        };
    });

    // 这里使用Promise.race，以最快 resolve 或 reject 的结果来传入后续绑定的回调
    var abortablePromise: Promise<any> = Promise.race([
        fetchPromise,
        abortPromise
    ]);

    setTimeout(
        function () {
            abortFn();
        },
        timeout
    );

    return abortablePromise;
}

var defaultHeaders: Headers = new Headers();
defaultHeaders.append('Content-Type', 'application/x-www-form-urlencoded');

/** POST方法
 * @param {string} url
 * @param {Opts} see interface Opts
 * @return { void }
 * @example
 *  POST('/getData', {
 *      headers: {
 *          'Content-Type': 'application/x-www-form-urlencoded'
 *      },
 *      data: {
 *          "path": "getProjectQualityList.json"
 *      },
 *  })
 *  .then((res) => {
 *      // todo somthing
 *  })
 *  .catch((error) => {
 *      // xxxx
 *  })
 *  转换字符为formData格式
 *  querystring.stringify({
 *      "path": "getProjectQualityList.json"
 *  })   =   "path=getProjectQualityList.json&xxx=xxx"
 */
export function POST (url: string, opts: Opts) {
    var reqUrl: string = AppConfig.API + url; 
    var reqOpts: RequestInit = {
        method: 'POST',
        mode: 'cors',
        headers: opts.headers || defaultHeaders,
        credentials: 'include',
        body: null
    }

    if (reqOpts.headers.get('Content-Type') === 'application/x-www-form-urlencoded') {
        // 转换字符为formData格式
        reqOpts.body = querystring.stringify(opts.data);
    } else {
        reqOpts.body = JSON.stringify(opts.data);
    }

    return new Promise(function (resolve: Function, reject?: Function) {
        _fetch(
            fetch(reqUrl, reqOpts),
            opts.timeout || 20000
        )
        .then(checkStatus)
        .then(parseJSON)
        .then((res) => {
            resolve(res);
        }).catch(error => {
            if (error === 'timeout') {
                alert(error)
            } else if (reject) {
                reject(error);
            }
        });
    });
}

/** GET方法
 * @param {string}
 * @param {Opts} see interface Opts
 * @return { void }
 * @example
 *  
 *  GET('/getData', {
 *      headers: {
 *          'Content-Type': 'application/x-www-form-urlencoded'
 *      },
 *      data: {
 *          "path": "getProjectQualityList.json"
 *      },
 *  })
 *  .then((res) => {
 *      // todo somthing
 *  })
 *  .catch((error) => {
 *      // xxxx
 *  })
 */

export function GET (url: string, {
    headers = defaultHeaders,
    data = {},
    timeout = 20000
} = {} ) {
    var reqUrl: string = AppConfig.API + url + '?' + querystring.stringify(data); 
    var reqOpts: RequestInit = {
        method: 'GET',
        mode: 'cors',
        headers: headers,
        credentials: 'include'
    }
    return new Promise(function (resolve: Function, reject?: Function) {
        _fetch(fetch(reqUrl, reqOpts), timeout)
        .then(checkStatus)
        .then(parseJSON)
        .then((res) => {
            resolve(res);
        }).catch(error => {
            if (error === 'timeout') {
                alert(error)
            } else if (reject) {
                reject(error);
            }
        });
    });
}