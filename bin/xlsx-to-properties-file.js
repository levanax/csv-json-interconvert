/**
* excel 转 properties文件
 */
var xlsx = require('node-xlsx');
var fs = require('fs');
const util = require('../util/util.js');
const chalk = require('chalk');
const YAML = require('yamljs');
let config = YAML.load('./_config.yml');
// console.dir(config)
var obj = xlsx.parse(config.xlsx_to_properties_file.xlsx_file_path); // parses a file
var rows = [];
//looping through all sheets
for (var i = 0; i < obj.length; i++) {
    var sheet = obj[i];
    //loop through all rows in the sheet
    for (var j = 0; j < sheet['data'].length; j++) {
        // add the row to the rows array
        for (var k = 0; k < sheet['data'][j].length; k++) {
            sheet['data'][j][k] = util.encodeUnicode(sheet['data'][j][k].replace(/\"/g, '""'));
        }
        rows.push(sheet['data'][j]);
    }
}
var outFilesName = rows.splice(0, 1)[0]
for (var i = 1; i < outFilesName.length; i++) {
    outFilesName[i] = (util.decodeUnicode(outFilesName[i])).trim()+'.properties'

    var writeStr = '';
    var tempPath = config.xlsx_to_properties_file.properties_path + outFilesName[i]
    
    for (var j = 0; j < rows.length; j++) {
        writeStr += (rows[j][0] + '=' +rows[j][i] + '\n');
    }
    util.checkAndNewDir(tempPath);
    
    (function(tempPath, writeStr){
      fs.writeFile(tempPath, writeStr, {
        encoding: 'utf8'
      }, function(err) {
          if (err) {
              return console.log(err);
          }
          console.log(chalk.green('build success: ' + tempPath));
      });
    })(tempPath, writeStr)
}