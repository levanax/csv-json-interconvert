const {spawn, exec, execSync} = require('child_process');

execSync("node bin/clean-file.js", {stdio:[0,1,2]});
execSync("node bin/copy-file.js", {stdio:[0,1,2]});
execSync("node bin/build-csv.js",  {stdio:[0,1,2]});