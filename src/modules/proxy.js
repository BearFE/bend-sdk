
/**
 * @file proxy
 * @desc 异步代理api
 * @author bEnd
 * @use 如下
 * import {proxy} from xzsdk
 * ------get具体使用---------
 * http.get(url: 'http://www.fans.com/', data: {})
 *
 * -----post具体使用---------
 * http.post(url: 'http://www.fans.com/', data: {})
 */
import axios from 'axios';

class PROXY {
    constructor() {
        this.version = 1; // sdk需要考虑版本兼容的问题，暂时预留个缺口
        // 代理url，请填写代理服务url
        this.proxyApi = '/api/proxy';
        this.headers = {'X-Requested-With': 'XMLHttpRequest'};
    }

    /**
     * get请求
     *
     * @param {string} url 必传 用户url
     * @param {Object} options  用于配置get请求的键值对集合
     * @param {Object} options.data 发送请求的参数集合
     * @param {Object} options.headers 请求header
     *
     * @return {Function|string} 返回axios调用
     */
    async get(url, options = {}) {
        options.url = url;

        if (options.url && Object.prototype.toString.call(options.url) === '[object String]') {
            options.method = 'GET';
            options.headers = options.headers || this.headers;
            return this._axios(options);
        }
        return 'url 不合法';
    }

    /**
     * post请求
     *
     * @param {string} url 必传 用户url
     * @param {Object} options  用于配置post请求的键值对集合
     * @param {Object} options.data 发送请求的参数集合
     *
     * @return {Function|string} 返回axios调用
     */
    async post(url, options = {}) {
        options.url = url;

        if (options.url && Object.prototype.toString.call(options.url) === '[object String]') {
            options.method = 'POST';
            options.headers = options.headers || {
                'Content-Type': 'application/x-www-form-urlencoded'
            };
            return this._axios(options);
        }
        return 'url 不合法';
    }

    _axios(options = {}) {
        return new Promise((resolve, reject) => {
            let result = {
                status: 0,
                data: {},
                msg: ''
            };

            // 如果不是 ajax 模式（proxy），则根据要求修改字段
            let reqOptions = {
                method: 'POST',
                data: options,
                url: this.proxyApi
            };

            console.log(reqOptions);
            axios(reqOptions).then(res => {
                // 如果返回状态正常，返回数据
                result.status = res.status;
                result.data = res.data;
                resolve(result);
            }).catch(err => {
                result.status = err.status;
                result.msg = err.data && err.data.msg;
                reject(result);
            });
        });
    }
}

export const proxy = new PROXY();
