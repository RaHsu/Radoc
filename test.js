const fs = require('fs');
const md = require("markdown-it")();
const file = require("./modules/write-file");
const re = require("./modules/re");

file.writeMd("前端问题总结.md");
