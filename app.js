const md = require("markdown-it")();
const fs = require("fs");
const re = require("./modules/re");
const wf = require("./modules/write-file");
const pa = require("./modules/parse");
const homeRender = require("./modules/home-render");
const catalogRender = require("./modules/catalog-render");


// 读取配置文件，解析站点配置
const prime_config = require('./site-config.json');
const site_config = pa.analysis_config(prime_config);


// 将预处理css与js输出到static文件夹
// css预处理：less输出到static中
// 读取theme_color并成css
wf.generateThemeColor('./src/less/theme-color.less',site_config.theme_color);

// 将home-theme.less编译为css
wf.less('./src/less/home-theme.less','./static/css/home-theme.css');
// 将guide-theme.less编译成css
wf.less('./src/less/guide-theme.less','./static/css/guide-theme.css');
wf.less('./src/less/apollo.less','./static/css/apollo.css');

// todo less编译必须在文件复制之前

//将static静态文件复制到publish中(包括css,js,font和img)
wf.copyDir('./static/css','./publish/css');
wf.copyDir('./static/font','./publish/font');
wf.copyDir('./static/js','./publish/js');
wf.copyDir('./static/img','./publish/img');

//将post_source中的img和html原样复制
wf.copyDir('./post_source/post_img','./publish/post_img');
wf.copyHtml('./post_source','./publish');

// 将post_sourse中的md文件转换为html文件
wf.writeAllMd();

// 生成首页
homeRender.renderHome();

// 生成文档页
catalogRender.renderCatalog();


 