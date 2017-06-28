/// <reference path="./index.d.ts" />
import AppConfig from '../../AppConfig';

interface Opts {
    data: any,
    succee: Function,
    error?: Function,
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

/** POST方法
 * @param {Opts} see interface Opts
 * @return { void }
 */
export function POST (url: string, opts: Opts) {
    var succee: Function = opts.succee;
    _fetch(
        fetch(AppConfig.API + url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: opts.data
        }),
        opts.timeout || 15000
    )
    .then(checkStatus)
    .then(parseJSON)
    .then((res) => {
        succee(res);
    }).catch(error => {
        if (error === 'timeout') {
            alert(error)
        } else if (opts.error) {
            opts.error(error);
        }
    });
}

/** GET方法
 * @param {Opts} see interface Opts
 * @return { void }
 */
export function GET (url: string, opts: Opts) {
    var succee: Function = opts.succee; 
    fetch(AppConfig.API + url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: opts.data
    })
    .then(checkStatus)
    .then(parseJSON)
    .then((res) => {
        succee(res)
    })
}
