const util = require('../util/util.js');
const fs = require('fs');
const chalk = require('chalk');
const {
	COPYFILE_EXCL
} = fs.constants;
const YAML = require('yamljs');

let config = YAML.load('./_config.yml');

let langDir = fs.readdirSync(config.copy_file.source_folder_path);

for (let i = 0, length = langDir.length; i < length; i++) {
	if (!['dev', 'zh'].includes(langDir[i])) {
		let source_file = config.copy_file.source_folder_path + langDir[i] + '/translation.json';
		let target_file = config.copy_file.target_folder_path + langDir[i] + '.json';
		if (fs.existsSync(target_file)) {
			fs.unlinkSync(target_file);
		}
		fs.copyFileSync(source_file, target_file, COPYFILE_EXCL);

		if (!util.isEmpty(config.copy_file.module)) {
			let source_i_file = config.copy_file.source_folder_path + langDir[i] + '/' + config.copy_file.module + '.json';
			let target_i_file = config.copy_file.target_folder_path + 'individuation/' + langDir[i] + '.json';
			if (fs.existsSync(source_i_file)) {
				if (fs.existsSync(target_i_file)) {
					fs.unlinkSync(target_i_file);
				}
				fs.copyFileSync(source_i_file, target_i_file, COPYFILE_EXCL);
			}
		}
	}
}

console.log(chalk.green('copy file completed.'));