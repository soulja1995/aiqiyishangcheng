class Func_group {
    constructor() {

    }
    //获取元素
    $(ele, all) {
        if (all == "all") {
            return document.querySelectorAll(ele);
        } else {
            return document.querySelector(ele);
        }
    }
    //ajax
    ajax(obj) {
        function objToString(obj) {
            if (Object.prototype.toString.call(obj).slice(8, -1) === 'Object') {
                let objarr = [];
                for (let i in obj) {
                    objarr.push(i + '=' + obj[i]);
                }
                return objarr.join('&')
            }
        }
        let promise = new Promise((resolve, reject) => {
            let ajax = new XMLHttpRequest();
            //1.默认get,此参数可以省略。
            obj.type = obj.type || 'get';
            //2.接口地址不能为空
            if (!obj.url) {
                throw new error('地址不能为空');
            }
            //3.传输的数据如果存在(对象转字符串，字符串直接使用)
            if (obj.data) {
                if (Object.prototype.toString.call(obj.data).slice(8, -1) === 'Object') {
                    obj.data = objToString(obj.data);
                } else {
                    obj.data = obj.data;
                }
            }
            //4.数组存在，同时get请求，将数据拼接到地址栏的后面
            if (obj.data && obj.type == 'get') {
                obj.url += '?' + obj.data;
            }
            //6.是否异步,如果同步无需onreadystatechange进行监听
            if (obj.async === 'false' || obj.async === false) {
                obj.async = false;
            } else {
                obj.async = true;
            }

            ajax.open(obj.type, obj.url, obj.async)
            //5.数据存在和post,通过send和请求头传输数据
            if (obj.data && obj.type == 'post') {
                ajax.setRequestHeader('content-type', 'application/x-www-form-urlencoded');
                ajax.send(obj.data);
            } else {
                ajax.send()
            }
            //7.同步异步获取数据(利用回调函数将数据传输出来)
            if (obj.async) {
                ajax.onreadystatechange = function () {
                    if (ajax.readyState === 4) {
                        if (ajax.status === 200) {
                            let objdata = null;
                            if (obj.dataType === 'json') {
                                objdata = JSON.parse(ajax.responseText);
                            } else {
                                objdata = ajax.responseText;
                            }
                            resolve(objdata);
                        } else {
                            reject('接口地址有误');
                        }
                    }
                }
            } else {
                if (ajax.status === 200) {
                    let objdata = null;
                    if (obj.dataType === 'json') {
                        objdata = JSON.parse(ajax.responseText);
                    } else {
                        objdata = ajax.responseText;
                    }
                    resolve(objdata);
                } else {
                    reject('接口地址有误');
                }
            }
        })
        return promise
    }
    //cookie
    jstool = {
        addcookie: function (key, value, days) {
            let d = new Date();
            d.setDate(d.getDate() + days);
            document.cookie = `${key}=${encodeURIComponent(value)};expires=${d}`;
        },
        getcookie: function (key) {
            let arr = decodeURIComponent(document.cookie).split('; ');
            for (let value of arr) {
                let newarr = value.split('=');
                if (key === newarr[0]) {
                    return newarr[1];
                }
            }
        },
        delcookie: function (key) {
            this.addcookie(key, '', -1);
        }
    }
    //
}
export {
    Func_group
}