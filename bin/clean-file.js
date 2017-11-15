const util = require('../util/util.js');
const fs = require('fs');
const {
	COPYFILE_EXCL
} = fs.constants;
const YAML = require('yamljs');

let config = YAML.load('./_config.yml');

let delete_file_list = [];
let target_files = fs.readdirSync(config.copy_file.target_folder_path);
for(let i=0, length = target_files.length; i<length; i++){
	if (new RegExp(/.json$/).test(target_files[i])) {
		delete_file_list.push(config.copy_file.target_folder_path + target_files[i]);
	}
}

let target_files_individuation = fs.readdirSync(config.copy_file.target_folder_path+'individuation/');
for(let i=0, length = target_files_individuation.length; i<length; i++){
	if (new RegExp(/.json$/).test(target_files_individuation[i])) {
		delete_file_list.push(config.copy_file.target_folder_path+'individuation/' + target_files_individuation[i]);
	}
}

for (let i = 0, length = delete_file_list.length; i < length; i++) {
	let file =  delete_file_list[i];
	console.log(file)
	if (new RegExp(/.json$/).test(file)) {
		fs.unlinkSync(file);
	}
}


console.log('clone file completed.');