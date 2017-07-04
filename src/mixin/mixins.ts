export default function mixins(list: any[]) {
    return function (target: Function) {
        list.forEach(function (fn) {
            console.log(target)
            if (target.prototype[fn.name] === undefined) {
                target.prototype[fn.name] = fn
            }
        })
    };
}