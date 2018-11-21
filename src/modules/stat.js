/**
 * @file 打点日志文件
 * @author bEnd
 * @date 2018-03-28
 *
 * @use 如下
 * import {addStat} from bend-sdk
 *
 * ------发送参数，根据业务需要增删---------
 * page: 'home' // 页面名称，默认是插件名称 比如'home'首页
 * source: 'bend-sdk' // 来源
 * action // 触发时间，比如"click"
 * now // 时间戳
 *
 * ------代理发送---------
 * 代理在document上，如果元素有data-log自定义属性，触发点击事件时发送日志
 * 不需要用户自己调用，只需要写dom结构中加上data-log属性
 * <div @click="xxx" data-log="{page: xxx}"></div>
 * 自定义属性值可通过ext:{id: xxx}字段发送
 *
 * ------主动调用发送---------
 * addStat({
 *     page: 'yzs',
 *     action: 'click'
 * })
 *
 */
'use strict';

// 传输中的状态值
let sending = false;
// 初始化请求队列
let reqQueue = [];

// 请填写日志服务api
const prefix = 'https://www.bend.com/stat';

// 默认参数
const defaultState = {
    verion: 1, // sdk需要考虑版本兼容的问题，暂时预留个缺口
    // 产品id等
    pid: 66,
    // 子模块名称
    mod: ''
};


// json to query
function jsonToUrl(json) {
    if (!json) {
        return '';
    }
    let arr = [];
    for (let key in json) {
        if (json.hasOwnProperty(key)) {
            arr.push(key + '=' + encodeURIComponent(json[key]));
        }
    }
    return arr.join('&');
}

const getURL = params => {
    // 业务参数
    let obj = {};
    Object.assign(obj, defaultState, params);
    return prefix + '?' + jsonToUrl(obj);
};

// 发送队列中下一个统计请求
function reqNext() {
    const nextQueue = reqQueue.shift();
    nextQueue && sendStat(nextQueue);
}

// 发送
function sendStat(src) {
    sending = true;
    setTimeout(function () {
        sending = false;
        const img = new Image();
        const dfd = new Promise((resolve, reject) => {
            img.onload = resolve;
            img.onerror = resolve;
        });
        img.src = src;
        reqNext();
        return dfd;
    }, 10);
}

/**
 * 绑定点击事件
 */
const bindEvent = () => {
    document.addEventListener('click', function (e) {
        const dom = e.target;
        let log = dom.getAttribute('data-log');
        if (log && Object.prototype.toString.call(log) === '[object String]') {
            try {
                addStat({ext: log});
            }
            catch (error) {
                return '发送日志失败';
            }
        }
    });
};


/**
 * 发送打点
 *
 * @param {Object} params 打点参数
 * @param {string} params.plugin 插件名称
 * @param {string} params.type 插件名称
 */
export function addStat(params) {
    const str = getURL(params);
    if (sending) {
        reqQueue.push(str);
    }
    else {
        // 直接发送请求
        sendStat(str);
    }
}

// 初始化打点，绑定元素
(function initStat() {
    bindEvent();
})();




