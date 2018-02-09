
---
#### Excel 转 json 使用说明
##### 1. 安装依赖
```
cnpm i 
```
以下命令可忽略，如报错提示该模块未安装时使用，注意 csv version
```
$cnpm i node-xlsx --save
$cnpm install csv@0.3.7 --save
```
##### 2. 配置文件
需要用到以下配置，如需要请更改，config.yml 内同样附有说明
```
#excel文件转 csv文件 配置
xlsx_to_csv_utf8:
  xlsx_file_path: ./translate.xlsx #excel文件路径
  csv_file_path: ./.cache/csv-to-json/csv-dir/temp.csv #生成csv文件路径

#csv文件 转 json文件
csv_to_json:
  csv_file_path: ./.cache/csv-to-json/csv-dir #csv文件目录
  build_file_path: ./build/jsonFile #生成csv文件目录

```
1. xlsx_to_csv_utf8.xlsx_file_path 为需转换的excel文件位置路径  
2. xlsx_to_csv_utf8.csv_file_path 相等于 csv_to_json.csv_file_path 由于Excel文件不可以直接转json，需先转为csv文件后，再转json, 所以此配置为过渡文件，如有需要再更改  
3. csv_to_json.build_file_path 生成json文件夹位置


##### 3. 执行命令
执行以下命令，生成json文件，如遇模块未安装，请参考安装依赖
```
npm run to-json
```

---

## 生成csv 文件  
###  config:
json_convert_csv    
-  json_path ->json文件夹路径 ./json-file/
-  csv_path  ->生成csv文件路徑 ./result.csv  

### 使用:

1) 将json文件 放置 {json_path} 文件夹下
2) 如果有个性化语言文件，请放置 {json_path}/individuation/ 文件夹下，注意：同类语言文件名必需相同  
3) 执行以下命令：
```
$npm run build-csv  
```
3) csv文件在 {csv_path}

---

//异步删除文件 *hello不能是文件夹
```
fs.unlink('./hello', (err) => {
  if (err) throw err;
  console.log('successfully deleted /tmp/hello');
});
```

> npm install --save jsonfile

```
fs.readFile('./_config.yml', (err, data)=> {
    if(err) throw err;
    var nativeObject = YAML.parse(data.toString());
    console.log(nativeObject)
})
```

https://stackoverflow.com/questions/10384340/new-line-in-node-js



### 参考链接：
https://stackoverflow.com/questions/34342425/convert-xls-to-csv-on-the-server-in-node
