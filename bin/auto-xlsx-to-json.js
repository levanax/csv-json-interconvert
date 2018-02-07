const {spawn, exec, execSync} = require('child_process');

execSync("node bin/xlsx-to-csv-utf8.js", {stdio:[0,1,2]});
execSync("node bin/csv-to-json.js", {stdio:[0,1,2]});