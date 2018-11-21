/**
 * @file interfacejs
 * @author bEnd
 * @desc 插件接口规范
 */
'use strict';
export default class Plugin {
    constructor(application) {
        this.$app = application;
    }
    // 开放store
    store() {

    }
    // 插 -> 导航
    beforeInstall() {
        // 通知业务组件做数据准备工作
    }
    onInstall() {
        // 插入过程中等待
    }
    afterInstall() {
        // 插入完后通知
    }

    // 拔 -> 导航
    beforeUnInstall() {
        // 通知业务组件做拔前准备工作
    }
    onUnstall() {
        // 拔出过程中等待
    }
    afterUnInstall() {
        // 拔出完后通知
    }
}
