export default function mixins(list: any[]) {
    return function (target: Function) {
        list.forEach(function (fn) {
            console.log(target)
            if (target[fn.name] === undefined) {
                console.log(target[fn.name], fn)
                target[fn.name] = fn
            }
        })
    };
}