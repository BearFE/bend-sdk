/**
 * @file dev-server.js
 * @author bEnd
 */

'use strict';
require('./check-versions')();

const config = require('../config');
if (!process.env.NODE_ENV) {
    process.env.NODE_ENV = JSON.parse(config.dev.env.NODE_ENV);
}

const opn = require('opn');
const path = require('path');
const express = require('express');
const webpack = require('webpack');
const proxyMiddleware = require('http-proxy-middleware');
const webpackConfig = require('./webpack.dev.conf');

// default port where dev server listens for incoming traffic
const port = process.env.PORT || config.dev.port;
// automatically open browser, if not set will be false
const autoOpenBrowser = !!config.dev.autoOpenBrowser;
// Define HTTP proxies to your custom API backend
// https://github.com/chimurai/http-proxy-middleware
const proxyTable = config.dev.proxyTable;

const app = express();
const compiler = webpack(webpackConfig);

const devMiddleware = require('webpack-dev-middleware')(compiler, {
    publicPath: webpackConfig.output.publicPath,
    quiet: true
});

const hotMiddleware = require('webpack-hot-middleware')(compiler, {
    log: false,
    heartbeat: 2000
});
// force page reload when html-webpack-plugin template changes
// currently disabled until this is resolved:
// https://github.com/jantimon/html-webpack-plugin/issues/680
// compiler.plugin('compilation', function (compilation) {
//   compilation.plugin('html-webpack-plugin-after-emit', function (data, cb) {
//     hotMiddleware.publish({ action: 'reload' })
//     cb()
//   })
// })


app.use((req, res, next) => {
    // if (!(req.query.ajax || /json/i.test(req.headers.accept))) {
    //     next();
    // }
    const moduleName = req.path.replace(/\/$/i, '');
    const mockPATH = path.resolve(__dirname + '/../mock');
    try {
        const proxy = require.resolve(mockPATH + moduleName);
        try {
            const api = require(proxy);
            delete require.cache[proxy];
            console.log(`Mock API: ${req.path}`);
            if (api instanceof Function) {
                Promise.resolve(api(req, res, next)).then(data => {
                    response(data);
                }).catch(error => {
                    console.warn(`APP: ${req.path} error ${error}`);
                    next();
                });
            }
            else {
                response(api);
            }
        }
        catch (error) {
            console.warn(`APP: ${req.path} error ${error.message}`);
        }
    }
    catch (err) {
        next();
    }

    function response(data) {
        if (data.fallback) {
            return next();
        }
        return res.json({
            from: 'mock',
            ts: +new Date(),
            ...data
        });
    }
});

// enable hot-reload and state-preserving
// compilation error display
app.use(hotMiddleware);


// proxy api requests
Object.keys(proxyTable).forEach(context => {
    let options = proxyTable[context];
    if (typeof options === 'string') {
        options = {
            target: options
        };
    }
    app.use(proxyMiddleware(options.filter || context, options));
});

// handle fallback for HTML5 history API
app.use(require('connect-history-api-fallback')());

// serve webpack bundle output
app.use(devMiddleware);


// serve pure static assets
const staticPath = path.posix.join(config.dev.assetsPublicPath, config.dev.assetsSubDirectory);
app.use(staticPath, express.static('./static'));

const uri = 'http://localhost:' + port;

var resolves;
var rejects;
var readyPromise = new Promise((resolve, reject) => {
    resolves = resolve;
    rejects = reject;
});

var server;
var portfinder = require('portfinder');
portfinder.basePort = port;

console.log('> Starting dev server...');
devMiddleware.waitUntilValid(() => {
    portfinder.getPort((err, port) => {
        if (err) {
            rejects(err);
        }
        process.env.PORT = port;
        let uri = 'http://localhost:' + port;
        console.log('> Listening at ' + uri + '\n');
        // when env is testing, don't need open it
        if (autoOpenBrowser && process.env.NODE_ENV !== 'testing') {
            opn(uri);
        }
        server = app.listen(port);
        resolves();
    });
});

module.exports = {
    ready: readyPromise,
    close: () => {
        server.close();
    }
};
