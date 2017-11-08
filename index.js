const util = require('./util/util.js');
const fs = require('fs');
const jsonfile = require('jsonfile');

const file = './eg.json';
const csvFile = './result.csv';

let jsonObj = jsonfile.readFileSync(file);

let result = [];

let objToString = function(obj, rootkey){
	for(let key in obj){
		let val = obj[key];
		if(util.isObject(val)){
			debugger;
			if(util.isEmpty(rootkey)){
				objToString(val, key);
			}else{
				objToString(val, rootkey+'.'+key);
			}
			continue;
		}else{
			if(util.isEmpty(rootkey)){
				result.push(key +',' + util.processVal(val));
			}else{
				result.push(rootkey+'.'+ key +',' + util.processVal(val));
			}
			continue;
		}
	}
}
objToString(jsonObj);
try{
	fs.unlinkSync(csvFile);
}catch(e){
	console.log('file is not exist.');
}

fs.open(csvFile, 'w', (err, fd) => {
	console.log(result.join('\n'));
	let contentBuffer = Buffer.concat([
			new Buffer('\xEF\xBB\xBF', 'binary'),
	    	new Buffer(result.join('\n'))
		]);
	fs.writeFile(csvFile, contentBuffer ,{
		encoding : 'utf8'
	}, function(err){
		if(err){
			console.log(err);
		}else{
			console.log(' write complete.')
		}
	});
})

console.log();
