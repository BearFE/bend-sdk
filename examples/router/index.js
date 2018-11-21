/**
 * @file router
 * @desc jssdk router
 * @author bEnd
 */

import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

const mode = window.historyDisable ? undefined : 'history';

let routerInstance = {
    mode: mode,
    base: '/',
    routes: [
        {
            path: '/',
            name: 'proxy',
            component: () => import('../src/proxy')
        },
        {
            path: '/stat',
            name: 'stat',
            component: () => import('../src/stat')
        },
        {
            path: '*',
            redirect: '/'
        }
    ]
};
export default new Router(routerInstance);
