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

// 将一个数组中的配置项全部替换掉
exports.replaceAll = function(string,config_array){
    let replaced_string = string;
    for(let i in config_array){
        replaced_string = exports.replace(replaced_string,config_array[i].replace_pattern,config_array[i].value);
    }

    return replaced_string;
}
