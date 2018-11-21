/**
 * @file build.js
 * @author bEnd
 */

'use strict';
require('./check-versions')();

process.env.NODE_ENV = 'production';
const ora = require('ora');
const rm = require('rimraf');
const path = require('path');
const chalk = require('chalk');
const webpack = require('webpack');
const config = require('../config');
const webpackConfig = require('./webpack.prod.conf');

const httpPush = require('node-http-push');

const spinner = ora('building for production...');
spinner.start();


rm(path.join(config.build.assetsRoot, config.build.assetsSubDirectory), err => {
    if (err) {
        throw err;
    }
    const compiler = webpack(webpackConfig, (err, stats) => {
        spinner.stop();
        if (err) {
            throw err;
        }

        process.stdout.write(stats.toString({
            colors: true,
            modules: false,
            children: false,
            chunks: false,
            chunkModules: false
        }) + '\n\n');

        if (stats.hasErrors()) {
            console.log(chalk.red('  Build failed with errors.\n'));
            process.exit(1);
        }

        console.log(chalk.cyan('  Build complete.\n'));
        console.log(chalk.yellow([
            '  Tip: built files are meant to be served over an HTTP server.\n',
            '  Opening index.html over file:// won\'t work.\n'
        ].join('')));
    });
    // add watch while run dev
    if (process.argv[2] === 'deploy') {
        const watching = compiler.watch({
            ignored: /node_modules/,
            poll: 300
        }, (err, stats) => {
            const proxyInfo = require('../config/proxy');
            const defaultHost = process.argv[3] || proxyInfo.use;
            let deployServer = proxyInfo.hosts[defaultHost];
            if (!deployServer) {
                console.warn(chalk.red(`deploy server ${defaultHost} not found,use ${proxyInfo.use} instead.\n`));
                deployServer = proxyInfo.hosts[proxyInfo.use];
            }
            httpPush({
                api: deployServer.receiver,
                remote: deployServer.path
            }).upload('dist');
            console.log('\x1b[31m Rebuild \x1b[0m');
        });
    }
});
