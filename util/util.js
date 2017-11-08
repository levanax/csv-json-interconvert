let isObject = function(data){
	return typeof data === 'object';
}
let isEmpty = function(str){
	return typeof str === 'undefined' || str === null || str.trim() === '';
}

let isArray = function(data){
	return toString.call(data) === '[object Array]';
}

let processVal = function(str){
	let result = str;
	if(str.indexOf('"') !== -1 ){
		result = ('"'+ str.replace(/["]/g, '""')+'"');
	}else if(str.indexOf(',') !== -1 ){
		result = ('"'+ str+'"');
	}
	return result;
}

/**
 * key not allow contain "."
 * @param array {Array}
 */
let processMultipleLanguage = function(array){
	if(!isArray(array) && array.length === 0){
		throw new Error("array is not an array or array is null.");
	}

	let result = [];

	let objToString = function(obj, rootkey, array){
		for(let key in obj){
			let val = obj[key];
			if(util.isObject(val)){
				debugger;
				if(util.isEmpty(rootkey)){
					objToString(val, key, array);
				}else{
					objToString(val, rootkey+'.'+key, array);
				}
				continue;
			}else{
				if(!util.isEmpty(rootkey)){
					key = rootkey+'.'+ key;
				}
				let otherVal = '';
				if(array.length>0){
					let tempValList = [];
					for(let i = 0, length = array.length; i<length; i++){
						tempValList.push(util.processVal(getValByMultiplekey(array[i], key)));
					}
					otherVal = ',' + tempValList.join(',');
				}
				result.push(key +',' + util.processVal(val)  + otherVal);
				continue;
			}
		}

		return result;
	}

	let refObj = array.shift(1);

	objToString(refObj, '', array);
	return result;
}
/**
 * @param keysStr {string} e.g  a.b.c
 */
let getValByMultiplekey= function(obj, keysStr){
	let keys = keysStr.split('.');
	let val = obj;
	for(let i=0, length = keys.length; i <length; i++){
		val = val[keys[i]];
	}
	return val;
}


let util = {
	isObject: isObject,
	isEmpty: isEmpty,
	processVal:processVal,
	processMultipleLanguage:processMultipleLanguage
}

module.exports = util;