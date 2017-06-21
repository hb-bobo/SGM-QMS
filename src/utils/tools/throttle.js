var throttle = function (fn, interval) {
  var __self = fn // 保存需要被延迟执行的函数引用
  var timer // 定时器
  var firstTime = true // 是否是第一次调用
  return function () {
    var args = arguments
    var __me = this
    if (firstTime) { // 如果是第一次调用，不需延迟执行
      __self.apply(__me, args)
      firstTime = false
      return false
    }
    if (timer) { // 如果定时器还在，说明前一次延迟执行还没有完成
      return false
    }
    timer = setTimeout(function () { // 延迟一段时间执行
      clearTimeout(timer)
      timer = null
      __self.apply(__me, args)
    }, interval || 500)
  }
}
export default throttle
