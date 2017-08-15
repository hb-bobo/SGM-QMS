
/**
 * 把方法混合到组件上
 * @param {Array<Function>}
 */
export default function mixins(...list: Function[]) {
    return function (target: Function) {
        list.forEach(function (fn: Function) {
            if (target.prototype[fn.name] === undefined) {
                target.prototype[fn.name] = fn
            }
        })
    };
}