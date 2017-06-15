/**
 * @category Object
 * @param {string}  path
 * @param {any}  set value in new Object
 * @returns {Object} Returns {}
 * @example
 *
 *
 * pathToJSON ('a.b', 1)
 * // => {a: {b: 1}}
 * pathToJSON ('a.b[0]', 1)
 * // => {a: {b: [1]}}
 */
function pathToJSON (path, value, data) {
    var currentData = data || {};
    var path = path;
    if (!data) {
        path = key.split('.');
    }
    // !~paths[0].indexOf('[') 存在返回 false
    if (!~path[0].indexOf('[')) {
        currentData[paths[0]] = {}
    } else {
        currentData[paths[0]] = {}
    }
    pathToJSON(paths[0], value, newData);
}

export default pathToJSON;