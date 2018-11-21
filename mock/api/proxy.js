/**
 * @file mock用户信息返回数据
 * @desc  test info api
 * @author bEnd
 */

module.exports = function () {
    return {
        code: 0,
        msg: '',
        data: {
            headers: {
                'Date': ' Tue, 15 May 2018 09:26:11 GMT',
                'Content-Type': ' application/json;charset=utf-8',
                'Content-Length': ' 234',
                'Connection': ' close',
                'X-Powered-By': ' HHVM',
                'Server': ' Apache'
            },
            // 请求结果
            data: '{"code":0, "msg": "", "data": {"type": 1, "status": 0}}',
            // 请求返回码
            statusCode: 200
        }
    };
};