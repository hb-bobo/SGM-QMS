/**
 * 获取两点的距离(touch事件)
 * @param { Event } ev 
 * @return { number }
 */
var getTwoPointDistance = function (ev) {
    var x1 = ev.targetTouches[0].pageX;
    var y1 = ev.targetTouches[0].pageY;
    //var x2 = ev.targetTouches[1].pageX;
      var x2 = (ev.targetTouches[1] && ev.targetTouches[1].pageX) || 0;
    //var y2 = ev.targetTouches[1].pageY;
      var y2 = (ev.targetTouches[1] && ev.targetTouches[1].pageY) || 0;
    // 三角形 a b c;
    var a = x2 - x1;
    var b = y2 - y1;
    return Math.sqrt(a * a + b * b);
}

export default getTwoPointDistance