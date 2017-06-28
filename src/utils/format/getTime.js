import fillZero from './fillZero';

/**
 *
 * @category format
 * @param {number}
 * @returns {string}
 *
 * getTime() get current date
 * // => '2016-01-01'
 * 
 * getTime('yyyy-MM-dd hh:mm:ss') get current date
 * // => '2016-01-01 17:23:10'
 * 
 * getTime({
 *  time: 1492664545,
 *  format: 'yyyy-MM-dd'
 * })
 * // => '2016-01-01'
 */
function getTime (param) {
    var format = 'yyyy-MM-dd';
    var time = new Date();
    var noZero = false;
    var newTime = '';
    var weeks = ['\u661f\u671f\u65e5', '\u661f\u671f\u4e00', '\u661f\u671f\u4e8c', '\u661f\u671f\u4e09', '\u661f\u671f\u56db', '\u661f\u671f\u4e94', '\u661f\u671f\u516d'];
    if (typeof param === 'string') {
        format = param
    }
    if (Object.prototype.toString.call(param) === '[object Object]') {
        time = new Date(param.time);
        if (Object.is(NaN, time.getFullYear())) { 
            throw Error('time is Invalid date, 日期有误');
        }
        format = param.format ? param.format : format;
        noZero = param.noZero ? param.noZero :  false;
    }
    
    var times = {
        'yyyy': time.getFullYear(),
        'MM': time.getMonth() + 1,
        'dd': time.getDate(),
        'hh': time.getHours(),
        'mm': time.getMinutes(),
        'ss': time.getSeconds(),
        'day': weeks[time.getDay()]
    }
    
    if (!noZero) {
        for (let key in times) {
            var cur = times[key];
            times[key] = fillZero(cur);
        }
    }
    newTime = format.replace(/\w+/g, function (str) {
        if (str === 'yy') {
            return String(times['yyyy']).substring(2)
        }
        return times[str];
    });
    return newTime
}
export default getTime;