/**
 * excel文件转csv （UTF-8）
 **/
var xlsx = require('node-xlsx');
var fs = require('fs');
const util = require('../util/util.js');
const chalk = require('chalk');
const YAML = require('yamljs');

let config = YAML.load('./_config.yml');
// console.dir(config)

var obj = xlsx.parse(config.xlsx_to_csv_utf8.xlsx_file_path); // parses a file
var rows = [];
var writeStr = "";

//looping through all sheets
for (var i = 0; i < obj.length; i++) {
    var sheet = obj[i];
    //loop through all rows in the sheet
    for (var j = 0; j < sheet['data'].length; j++) {
        // add the row to the rows array
        for(var k = 0; k<sheet['data'][j].length; k++){
            sheet['data'][j][k] ="\""+ sheet['data'][j][k].replace(/\"/g, '""')+"\"";
        }
        rows.push(sheet['data'][j]);
    }
}

//creates the csv string to write it to a file
for (var i = 0; i < rows.length; i++) {
    writeStr += rows[i].join(",") + "\n";
}
util.checkAndNewDir(config.xlsx_to_csv_utf8.csv_file_path);
//writes to a file, but you will presumably send the csv as a      
//response instead
fs.writeFile(config.xlsx_to_csv_utf8.csv_file_path, writeStr, {
    encoding: 'utf8'
}, function(err) {
    if (err) {
        return console.log(err);
    }
    console.log(chalk.green("csv build success: " + config.xlsx_to_csv_utf8.csv_file_path));
});