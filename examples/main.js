/**
 * @file main.js
 * @author bEnd
 */
'use strict';

import 'babel-polyfill';
// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
import iView from 'iview';
import 'iview/dist/styles/iview.css';

Vue.use(iView);
new Vue({
    el: '#app',
    router,
    template: '<App/>',
    components: {
        App
    }
});
