/**
 * @file proxy.js
 * @author bEnd
 */

module.exports = {
    hosts: {
        test: {
            proxy: 'http://examples.com/',
            receiver: 'http://examples.com/',
            path: '/home/data'
        }
    },
    use: 'test'
};
