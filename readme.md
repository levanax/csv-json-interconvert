###  config:
json_convert_json  
-  json_file_path ->json文件夹路径 
-  csv_name  ->生成csv文件名

### 使用:

1) 将json文件 放置 json-file 文件夹下
2) 执行以下命令：
```
$npm run build-csv  
```
3) csv文件在build 文件夹下

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