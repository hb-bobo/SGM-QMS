/**
 * 获取元素剩下的空间
 * @param {element}
 * @return {number} element height
*/
var getRemainingHeight = function (element) {
  if (element) {
    var offsetHeight = element.getBoundingClientRect().top
    var clintH = document.documentElement.clientHeight
    return (clintH - offsetHeight)
  }
}
export default getRemainingHeight
