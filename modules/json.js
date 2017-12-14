 const fs = require("fs");

// 读取配置文件配置并将其转换为js对象
exports.readConfig = function (filename) {
    let data = fs.readFileSync(filename);
    return JSON.parse(data);
}


// 写入配置文件
