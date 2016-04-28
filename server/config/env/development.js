'use strict'

let port = 7777
let webPath = 'http://127.0.0.1:' + port

module.exports = {
  // 监听端口号
  port: port,
  // 静态目录
  publicPath: 'public',
  // 日志级别
  logLevel: 'info',
  // 日志目录
  logPath: 'logs/',
  // morganFormat
  morganFormat: 'dev',
  // 服务地址
  servicePath: 'http://192.168.235.209:7080',
}