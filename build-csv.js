const util = require('./util/util.js');
const fs = require('fs');
const jsonfile = require('jsonfile');
const YAML = require('yamljs');

let path = './json-file/';
let csvFile = './build/result-csv.csv';

let config = YAML.load('./_config.yml');

path = config.json_convert_json.json_file_path;
csvFile = './build/'+ config.json_convert_json.csv_name;

let jsonDir = fs.readdirSync(path);

let contentArray = [];
let languageObjects = [];
let colTitle = [];
for(let i = 0, length = jsonDir.length; i < length; i++){
	if(!util.isEmpty(jsonDir[i]) 
		&& new RegExp(/.json$/).test(jsonDir[i])){
		languageObjects.push(jsonfile.readFileSync(path+ jsonDir[i]));
		colTitle.push(jsonDir[i].match(/[-_a-zA-Z0-9]+/)[0]);
	}
}
contentArray[0] = 'key, '+ colTitle.join(',');
contentArray = contentArray.concat(util.processMultipleLanguage(languageObjects));
try{
	fs.unlinkSync(csvFile);
}catch(e){
	console.log('file is not exist.');
}

fs.open(csvFile, 'w', (err, fd) => {
	let contentBuffer = Buffer.concat([
			new Buffer('\xEF\xBB\xBF', 'binary'),
	    	new Buffer(contentArray.join('\n'))
		]);
	fs.writeFile(csvFile, contentBuffer ,{
		encoding : 'utf8'
	}, function(err){
		if(err){
			console.log(err);
		}else{
			console.log('build complete. please go : ' + csvFile);
		}
	});
})