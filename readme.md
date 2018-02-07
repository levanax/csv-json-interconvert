
## 使用说明
### 描述
excel 文件 可直接转 json文件，配置请参考 config.yml 说明
```
npm run to-json
```

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