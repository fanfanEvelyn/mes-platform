import axios from 'axios';
import { Message } from 'element-ui';
import router from '../router';
import store from '../store'
import { removeToken, removeLocalToken } from '@/lib/auth'

// 默认请求域名
axios.defaults.baseURL = '';

// if (process.env.NODE_ENV === 'production'){
//     axios.defaults.baseURL = 'http://api.iot.test.esunfly.com:32001';
// }

// 请求超时时间
axios.defaults.timeout = 15000;
// 请求头
axios.defaults.headers.post['Content-Type'] = 'application/json';

// 请求拦截器
axios.interceptors.request.use(
    config => {
        /**
         * headers中加入token认证
         */
        // console.log(config)
        let token = store.getters.token
        if (token) {
            config.headers.common['token'] = token
        }

        let cancel = null;
        config.cancelToken = new axios.CancelToken(function executor (c) {
            // executor 函数接收一个 cancel 函数作为参数
            cancel = c;
        })
        if (config.method == 'post') {
            if (config.data && config.data.hasOwnProperty('communityId') && !config.data['communityId']) {
                cancel('请求取消')
            }
        }

        return config
    },
    error => {
        return Promise.error(error);
    }
)

// 响应拦截器
axios.interceptors.response.use(
    response => {
        if (response.status === 200) {
            // code为-10000时，token校验不通过
            // console.log(response.data.code)
            if (response.data.code === -10000) {
                // console.log("token过期")
                // 移除session里的token
                removeToken()
                // 移除本地缓存里的token
                removeLocalToken()
                // 刷新当前页面，触发导航守卫，跳转至登录页
                router.go(0);
                Message.error({
                    message: '登录状态过期，请重新登录',
                    duration: 3000
                })
                return Promise.reject(response);
            }
            return Promise.resolve(response.data);
        }
        else {
            return Promise.reject(response);
        }
    },
    error => {
        console.log(error)
        // 如果是接口取消
        if (error instanceof axios.Cancel) {
            console.log(new Date() + '：因无选中的小区，请求被终止')
        } else {
            if (error.code === 'ECONNABORTED' && error.message.indexOf('timeout') !== -1) {
                // 请求超时
                Message.error({
                    message: '请求超时，请重试！',
                    duration: 3000
                })
            } else {

                if (error.response.status === 401) {
                    /**
                     * http 401错误：认证失败，通常是token失效
                     * 跳转至登录页面
                     */
                    // 移除session里的token
                    removeToken()
                    // 移除本地缓存里的token
                    removeLocalToken()
                    router.replace({
                        path: '/login'
                    })
                }
                else {
                    /**
                     * 其它http错误，如500等
                     */
                    Message.error({
                        message: `系统异常（${error.response.status}），请重试`,
                        duration: 3000
                    })
                }
            }
        }

        return Promise.reject(error);
    }
)

export default axios