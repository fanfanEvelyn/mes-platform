let toolFn = {
    // 转换时间格式方法
    timeFormat: (time) => {
        var dateee = new Date(time).toJSON();
        var newTime = new Date(+new Date(dateee) + 8 * 3600 * 1000).toISOString().replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '');
        return newTime;
    },
    // ==================sessionsTorage设置缓存================
    // 设置缓存
    sessionSet: function (name, data) {
        sessionStorage.removeItem(name)
        sessionStorage.setItem(name, JSON.stringify(data))
    },
    // 获取缓存
    sessionGet: function (name) {
        try {
            // 缓存不存在时，parse方法无法顺利执行，会抛出异常
            return JSON.parse(sessionStorage.getItem(name))
        } catch (err) {
            console.log(`读取缓存"${name}"内容失败`)
        }
    },
    // 清除缓存
    sessionRemove: function (name) {
        sessionStorage.removeItem(name)
    },
    // ==================localStorage设置缓存==================
    // 设置缓存
    localSet: function (name, data) {
        localStorage.removeItem(name)
        localStorage.setItem(name, JSON.stringify(data))
    },
    // 获取缓存
    localGet: function (name) {
        try {
            // 缓存不存在时，parse方法无法顺利执行，会抛出异常
            return JSON.parse(localStorage.getItem(name))
        } catch (err) {
            console.log(`读取缓存"${name}"内容失败`)
        }
    },
    // 清除缓存
    localRemove: function (name) {
        localStorage.removeItem(name)
    },
    // ==================cookie设置缓存==================
    cookieSet: function (name, data, time = 24 * 3600 * 1000) {
        var str = name + '=' + encodeURI(data)
        if (time > 0) {
            var date = new Date()
            var ms = time * 3600 * 1000
            date.setTime(date.getTime() + ms)
            str += '; expires=' + date.toGMTString()
        }
        document.cookie = str
    },
    cookieGet: function (name) {
        //获取当前所有cookie
        var strCookies = document.cookie
        if (strCookies) {
            //截取变成cookie数组
            var array = strCookies.split('; ')
            //循环每个cookie
            for (var i = 0; i < array.length; i++) {
                //将cookie截取成两部分
                var item = array[i].split('=')
                //判断cookie的name 是否相等
                if (item[0] == name) {
                    return item[1]
                }
            }
        }
        return null
    },
    cookieRemove: function (name) {
        var exp = new Date();
        exp.setTime(exp.getTime() - 1);
        //获取cookie是否存在
        var value = this.cookieGet(name)
        if (value != null) {
            document.cookie = name + '=' + value + '; expires=' + exp.toUTCString()
        }
    },
    // ==================== 节流函数 ====================
    delay: (function () {
        let timer = 0
        return function (callback, ms) {
            clearTimeout(timer)
            timer = setTimeout(callback, ms)
        }
    })()
}

export default {
    install: function (vm) {
        vm.prototype.$toolFn = toolFn;
    },
    toolFn
}