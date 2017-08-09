// 当前月
export var currMounth = new Date().getMonth();
/**
 * 处理line chart 数据
 * @param {array} 包含目标值
 * @param {array} 实际值
 * @param {boolean} 是否截取到当前月
 * @return {array} series
 */
export var handleLineData = function (resData0, resData1, isCutMount) {
    var LineSeries = [
        {
            name: "目标值",
            type: "line",
            data: []
        },
        {
            name: "实际值",
            type: "line",
            label: {
                normal: {
                    show: true
                }
            },
            data: []
        }
    ];
    // 目标值都是一样，取target
    if (resData0[0] !== undefined) {
        var item = resData0[0];
        // 取公司目标值
        var targetValue = item.patacTargetValue;
        for (let i = 0; i < 12; i++) {
            LineSeries[0].data.push(targetValue)
        }
    }
    // 先把12个月填空
    for (let i = 0; i < 12; i++) {
        LineSeries[1].data.push('')
    }
    Array.isArray(resData1) && resData1.some(function (item, i) {
        // 跳出，截取到当前月份的数据
        if (isCutMount && i >= currMounth) {
            return true;
        }
        //把month可能只有一个
        LineSeries[1].data[item.MONTH - 1] = item.COUNT || '';
        return false;
    });
    return LineSeries;
}

/**
 * 数据格式化 "[0,1,2,2]" -> [{MONTH: 1, COUNT:0}, {MONTH: 2, COUNT:1}, {MONTH: 3, COUNT:2}]
 * @param {Array} arr 
 */
export var arrToArr = function (arr) {
    var res = [];
    if (Array.isArray(arr)) {
        arr.forEach(function (item, i) {
            res.push({
                MONTH: i + 1,
                COUNT: item
            });
        });
    }
    return res;
}

/**
 * 处理lineBar 混合图 暂时是LL
 * @param {array} 包含落实率
 * @param {array} 应该开启 listN
 * @param {array} 实际开启 listY
 * @param {boolean} 是否截取到当前月
 * @return {array} series
 */
export var handleLineBarData = function (lineData, barData1, barData2, isCutMount) {
    var LineBarSeries = [
        {
            name: '落实率',
            type: 'line',
            yAxisIndex: 1,
            data: []
        },
        {
            name: '应该开启',
            type: 'bar',
            itemStyle : { 
                normal: {
                    label : {
                        show: true, 
                        position: 'top',
                        textStyle:{
                            color:'#000'
                        }
                    }
                }
            },
            data: []
        },
        {
            name: '实际开启',
            type: 'bar',
            itemStyle : { 
                normal: {
                    label : {
                        show: true, 
                        position: 'top',
                        textStyle:{
                            color:'#000'
                        }
                    }
                }
            },
            data: []
        }
    ];
    //TODO 落实率，写死
    var count = 1;
    do {
        LineBarSeries[0].data.push(100);
        count++;
    } while (count <= currMounth)
    
    // 先把12个月填空
    for (let i = 0; i < 12; i++) {
        LineBarSeries[1].data.push('');
        LineBarSeries[2].data.push('');
    }
    Array.isArray(barData1) && barData1.some(function (item, i) {
        // 跳出，截取到当前月份的数据
        if (isCutMount && i >= currMounth) {
            return true;
        }
        //把month可能只有一个
        LineBarSeries[1].data[item.MONTH - 1] = item.COUNT || 0;
        return false;
    });
    Array.isArray(barData2) && barData2.some(function (item, i) {
        // 跳出，截取到当前月份的数据
        if (isCutMount && i >= currMounth) {
            return true;
        }
        //把month可能只有一个
        LineBarSeries[2].data[item.MONTH - 1] = item.COUNT || 0;
        return false;
    });
    return LineBarSeries;
}