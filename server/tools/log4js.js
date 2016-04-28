'use strict';
var log4js = require('log4js');
var config = require('../config/config');

log4js.configure({
  appenders: [{
    type: 'dateFile', // 日志文件类型，可以使用日期作为文件名的占位符
    filename: config.logPath || 'logs/', // 日志文件名，可以设置相对路径或绝对路径
    pattern: 'yyyy-MM-dd.log', // 占位符，紧跟在filename后面
    alwaysIncludePattern: true // 文件名是否始终包含占位符
  }]
});
var logger = log4js.getLogger();
logger.setLevel(config.logLevel || 'error'); // 设置日志级别: trace、debug、info、warn、error、fatal

module.exports = logger;