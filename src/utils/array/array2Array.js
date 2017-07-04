var isArray = Array.isArray;

/**
  * 数组格式转换
  * [a:1] ->[b:1]
  * @param {Object}
  * @return {Array}
  * options = {
      data: res.websiteList,
      format: ['id','text'],
      originaFormat: ['site','site_cn_name']
    }
  * */
var array2Array = function (options) {
  var arr = options.data
  var format = options.format
  var originaFormat = options.originaFormat
  if (!isArray(format) || typeof format[0] !== 'string') {
    throw new Error('TypeError: format must Array--->["id","value"]')
  }
  if (!isArray(originaFormat) || typeof originaFormat[0] !== 'string') {
    throw new Error('TypeError: originaFormat must Array--->["id","value"]')
  }
  if (isArray(arr)) {
    return arr.map(function (item) {
      var itemTemp = {}
      format.map(function (formatName, index) {
        itemTemp[formatName] = item[originaFormat[index]]
      })
      return itemTemp
    })
  } else {
    return []
  }
}
export default array2Array
