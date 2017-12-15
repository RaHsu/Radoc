const fs = require('fs');
const md = require("markdown-it")();
let mark = `
    \`\`\`js
    function(){
        var a = 0
        return a;
    }
    \`\`\`
`;


var out = md.render(mark);
console.log(mark);
console.log(out);
