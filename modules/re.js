// 构造出一个插值{{}}的正则表达式

exports.formExp = function (name) {
    let replace_name = '{{' + name + '}}';
    let pattern = new RegExp(replace_name,'gi');
    return pattern;
}

// 将一个字符串中匹配到的差值替换
exports.replace = function (string,replace_pattern,value){
    let out_string = string.replace(exports.formExp(replace_pattern),value);
    return out_string;
}
