const fs = require('fs');
const cheerio = require('cheerio');

// 将模板加载为dom树
let $ = cheerio.load(fs.readFileSync('./../static/template/home.html'));

console.log($.html());
