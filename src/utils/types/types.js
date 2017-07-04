
var regExp = /\s\w+/;
var type = function (valued) {
    var res = Object.prototype.toString.call(value);
    res = regExp.exec(res);
    if (res === null) {
        return false
    }
    return res[0];
}