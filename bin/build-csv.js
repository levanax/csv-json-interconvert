const util = require('../util/util.js');
const fs = require('fs');
const jsonfile = require('jsonfile');
const YAML = require('yamljs');
const chalk = require('chalk');

let config = YAML.load('./_config.yml');

let jsonFilePath = config.json_convert_csv.json_path;
let csvFilePath = config.json_convert_csv.csv_path;
if (util.isEmpty(jsonFilePath) || util.isEmpty(csvFilePath)) {
	throw new Error('Please check config ');
}

let jsonDir = fs.readdirSync(jsonFilePath);

let contentArray = [];
let languageObjects = [];
let colTitle = [];
for (let i = 0, length = jsonDir.length; i < length; i++) {
	if (!util.isEmpty(jsonDir[i]) && new RegExp(/.json$/).test(jsonDir[i])) {
		let languageObj = jsonfile.readFileSync(jsonFilePath + jsonDir[i]);

		let individuationJsonPath = jsonFilePath+'individuation/' + jsonDir[i];
		if(fs.existsSync(individuationJsonPath)){
			let indevLanguageObj = jsonfile.readFileSync(individuationJsonPath);
			languageObj = Object.assign(languageObj, indevLanguageObj);
		}

		languageObjects.push(languageObj);

		colTitle.push(jsonDir[i].match(/[-_a-zA-Z0-9]+/)[0]);
	}
}

contentArray[0] = 'key, ' + colTitle.join(',');
contentArray = contentArray.concat(util.processMultipleLanguage(languageObjects));

try {
	fs.unlinkSync(csvFilePath);
} catch (e) {
	console.log(chalk.red('file is not exist.'));
}

fs.open(csvFilePath, 'w', (err, fd) => {
	let contentBuffer = Buffer.concat([
		new Buffer('\xEF\xBB\xBF', 'binary'),
		new Buffer(contentArray.join('\n'))
	]);
	fs.writeFile(csvFilePath, contentBuffer, {
		encoding: 'utf8'
	}, function(err) {
		if (err) {
			console.log(err);
		} else {
			console.log(chalk.green('build complete. please go : ' + csvFilePath));
		}
	});
})