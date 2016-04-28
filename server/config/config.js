'use strict'

let envConfig = require('./env/' + (process.env.NODE_ENV || 'production')) || {}
let baseConfig = {}

module.exports = Object.assign(baseConfig, envConfig)