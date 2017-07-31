import fillZero from './fillZero';

/**
 * 日期时间格式化
 * @category format
 * @param {Date}
 * @param {string}
 * @param {Object}
 * @returns {string}
 *
 * dateFormat() get current date
 * // => '2016-01-01'
 * 
 * dateFormat(new Date(), 'yyyy-MM-dd hh:mm:ss') get current date
 * // => '2016-01-01 17:23:10'
 * 
 * dateFormat(new Date(), 'yyyy-MM-dd', {noZero: true})
 * // => '2016-1-12'
 */

function dateFormat (
    time = new Date(),
    format = 'yyyy-MM-dd',
    {
        noZero = false
    } = {}
) {
    var newTime = '';
    // 星期
    var weeks = ['\u661f\u671f\u65e5', '\u661f\u671f\u4e00', '\u661f\u671f\u4e8c', '\u661f\u671f\u4e09', '\u661f\u671f\u56db', '\u661f\u671f\u4e94', '\u661f\u671f\u516d'];
    if (!time || Object.is(NaN, time.getFullYear())) { 
        throw Error('time is Invalid date, 日期有误');
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
export default dateFormat;