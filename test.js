const re = require('./modules/re');
const fs = require('fs');

var html = fs.readFileSync('./static/template/tem.html').toString();

var replacement = "<a href='fdsfd.html'>";
//var hh = html.replace(re.formExp('replace'),replacement);

html = re.replace(html,'replace',replacement);
console.log(html);
