 const fs = require("fs");

// 写入配置文件

// 配置解析模块
exports.analysis_config = function(config){
    let out_config = {};

    // 路径信息
    let css_path = 'css/';
    let code_style_path = 'css/code_styles/';

    //theme解析
    out_config.theme = css_path + config.theme + '.css';

    // code_style解析
    out_config.code_theme = code_style_path + config.code_theme + '.css';

    return out_config;
}
