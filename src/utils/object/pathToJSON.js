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
 * 
 * 暂未实现
 * pathToJSON ('a.b[0]', 1)
 * // => {a: {b: [1]}}
 */
function pathToJSON (path, value) {
    var paths = null;
    if (typeof path === 'string') {
        paths = path.split('.');
    }
    var newObject = {};
    createObject(paths, newObject, value);
    return newObject
}
// 递归加属性
function createObject (paths, object, value) {
    if (paths.length === 1) {
        object[paths[0]] = value;
        return;
    }
    var currentKey = paths.shift();
    object[currentKey] = {};
    return createObject(paths, object[currentKey], value)
}

export default pathToJSON;