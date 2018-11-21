/**
 * @file index.js
 * @author bEnd
 * @desc bEnd-sdk入口文件
 */

'use strict';
import 'babel-polyfill';
import {addStat} from './modules/stat';
import {proxy} from './modules/proxy';
import plugin from './modules/interface';

export default {addStat, proxy, plugin};
