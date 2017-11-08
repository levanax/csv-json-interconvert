please try : npm install csv-json-interconvert

使用命令:
> npm run build-csv

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