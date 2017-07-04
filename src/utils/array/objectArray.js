
var isObject = function (val) {
  return Object.prototype.toString.call(val) === '[Object object]';
}


/**
 * ['a'] -> [{key: 'a', value: 'a'}]
 * @param {array} [xx,xx] or [{},{}]
 * @param {object}  {'keyName':<string>,'valueName':<string>}
 * @return {array<object>}
*/


var objectArray = function (
  arr,
  {
    keyName = 'key',
    valueName = 'value'
  } = {}
) {
  if (arr.length === 0) {
    return []
  }
  if (isObject(arr[0])) {
    return arr
  } else {
    arr = arr.map(item => {
      return {[keyName]: item, [valueName]: item}
    })
    return arr
  }
}

export default objectArray
