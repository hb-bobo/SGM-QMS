/// <reference path="./index.d.ts" />
import AppConfig from '@/AppConfig';
import querystring from '@/utils/tools/querystring';

interface Opts {
    data: any, // 一层的Object, 不支持复杂嵌套
    headers: Headers,
    timeout: number
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
    throw error
  }
}
/** 
 * parese response to JSON
 * @param {Response}
 */
function parseJSON(response: Response) {
  return response.json()
}

/* 给fetch包装一个fetch */
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
defaultHeaders.append('Content-Type', 'application/json');

/** POST方法
 * @param {string} url
 * @param {Opts} see interface Opts
 * @return { void }
 * @example
 * 
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
 */
export function POST (url: string, opts: Opts) {
    return new Promise(function (resolve: Function, reject?: Function) {
        _fetch(
            fetch(AppConfig.API + url, {
                method: 'POST',
                mode: 'no-cors',
                headers: opts.headers || defaultHeaders,
                credentials: 'include',
                body: opts.data
            }),
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

export function GET (url: string, opts: Opts) {
    return new Promise(function (resolve: Function, reject?: Function) {
        _fetch(
            fetch(AppConfig.API + url + '&' + querystring.stringify(opts.data), {
                method: 'GET',
                mode: 'no-cors',
                headers: opts.headers || defaultHeaders,
                credentials: 'include'
            }),
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