### install :
> npm install csv-json-interconvert
or 
> npm install https://github.com/levanax/csv-json-interconvert.git

###  config:


### 使用:
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