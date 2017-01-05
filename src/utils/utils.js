Date.prototype.Formate = function(fmt) { //author: meizz 
    let o = {
        "M+": this.getMonth() + 1, //月份 
        "d+": this.getDate(), //日 
        "h+": this.getHours(), //小时 
        "m+": this.getMinutes(), //分 
        "s+": this.getSeconds(), //秒 
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
        "S": this.getMilliseconds() //毫秒 
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (let k in o)
        if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
};
const utils = {
    /**
     * [DateFormate 格式化时间格式]
     * @param {[type]} 时间 [description]
     * @param {String} 格式化 [description]
     */
    DateFormate(change, format = "yyyy-MM-dd hh:mm:ss") {
        if (change) {
            return new Date(change).Formate(format);
        }
        return new Date().Formate(format);
    },
    /**
     * [Extend 对象深度拷贝]
     * @param {[type]} t [description]
     */
    Extend(t) {
        let a = arguments;
        for (let i = 1, length = a.length; i < a.length; i++) {
            let x = a[i];
            for (let k in x) {
                if (!t.hasOwnProperty(k)) { // 如果对象属性不存在直接存入
                    t[k] = x[k];
                } else {
                    if (Object.prototype.toString.call(x[k]) === "[object Object]") { // 如果是个对象执行回调 
                        arguments.callee.call(null, t[k], x[k]);
                    } else {
                        t[k] = x[k];
                    }
                }
            }
        }
        return t;
    },
    /**
     * [isEmptyObject 检测对象是否为空]
     * @param  {[type]}  e [description]
     * @return {Boolean}   [description]
     */
    isEmptyObject(e) {
        let t;
        for (t in e)
            return !1;
        return !0
    },
    /**
     * [reGroupJson json数据结构重组]
     * {code:"test",value:"hellp"} to { "test": hellp}
     * @param {[type]} json [description]
     */
    reGroupJson(json) {
        let Regroup = {}
        for (let node in json) {
            if (json.hasOwnProperty(node)) {
                let [object, arrParams] = [{}, json[node]];
                for (let i = 0, length = arrParams.length; i < length; i++) {
                    object[arrParams[i]["code"]] = arrParams[i]["value"];
                }
                Regroup[node] = object;
            };
        }
        return Regroup;
    }
};
module.exports = utils;