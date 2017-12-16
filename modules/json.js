 const fs = require("fs");

// 读取配置文件配置并将其转换为js对象
exports.readConfig = function (filename) {
    let data = fs.readFileSync(filename);
    return JSON.parse(data);
}


// 写入配置文件

// 配置解析模块
exports.analysis_config = function(config){
    let out_config = {};

    // 路径信息
    let css_path = './css/';
    let code_style_path = './css/code_style/';

    //主题解析
    out_config.theme = css_path + config.theme + '.css';

    // code_style解析
    out_config.code_theme = code_style_path + config.code_theme + '.css';

    return out_config;
}
