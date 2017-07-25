/**
 * 获取元素剩下的空间
 * @param {element}
 * @return {number} element height
*/
var getRemainingHeight = function (element) {
  if (element instanceof HTMLElement) {
    var offsetHeight = element.getBoundingClientRect().top
    var clintH = document.documentElement.clientHeight
    return (clintH - offsetHeight)
  } else {
    throw Error('must be a dom');
  }
}
export default getRemainingHeight
