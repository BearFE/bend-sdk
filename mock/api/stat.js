/**
 * @file test.js 信息修改
 * @desc api test
 * @author bEnd
 */

module.exports = function () {
    return {
        fallback: false,
        code: 0,
        msg: '这是一个示例',
        list: [{
            name: 'mock示例名称',
            desc: 'mock示例描述',
            id: 123
        }]
    };
};
