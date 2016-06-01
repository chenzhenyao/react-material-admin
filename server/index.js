'use strict'
const express = require('express')
const path = require('path')
const favicon = require('serve-favicon')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const compress = require('compression')
const morgan = require('morgan')
const consolidate = require('consolidate')
const proxyMiddleware = require('http-proxy-middleware')
const config = require('./config/config')
const log4 = require('./tools/log4js')

let app = express()

if (process.env.NODE_ENV === 'development') {
	let webpack = require('webpack')
	let webpackConfig = require('../webpack/dev.config.js')
	let compiler = webpack(webpackConfig)
	app.use(require('webpack-dev-middleware')(compiler, {
		noInfo: true,
		publicPath: '/js/'
	}))
	app.use(require('webpack-hot-middleware')(compiler, {
		log: console.log,
		path: '/__webpack_hmr',
		heartbeat: 10 * 1000
	}))
}

// compress Should be placed before express.static
app.use(compress({
	filter: function(req, res) {
		return (/json|text|javascript|css/).test(res.getHeader('Content-Type'))
	},
	level: 9
}))

// proxy must be the first
log4.info('proxy: %s', config.servicePath)
app.use(proxyMiddleware('/XXX', {
	target: config.servicePath,
	changeOrigin: true,
	pathRewrite: {
		'^/XXX': ''
	}
}))

// Set swig as the template engine
app.engine('html', consolidate.swig)
app.set('view engine', 'html')
app.set('views', path.join(__dirname, 'views'))

// middleware
app.use(favicon(path.join(__dirname, 'views', 'favicon.ico')))
app.use(morgan(config.morganFormat))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
	extended: false
}))
app.use(cookieParser())
// public 
app.use(express.static(path.join(__dirname, '..', config.publicPath)))

// cors
// app.all('*', function(req, res, next) {  
// 	res.header("Access-Control-Allow-Origin", req.headers.origin)  
// 	res.header("Access-Control-Allow-Methods","POST,GET")  
// 	res.header("Access-Control-Allow-Headers", "accept, content-type")  
// 	if (req.method == 'OPTIONS') {
//     res.send(200)
//   } else {
// 		next()
//   }
// })

// router
require('./routes/api')(app)
require('./routes/serverPage')(app)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
	let err = new Error('Not Found')
	err.status = 404
	next(err)
})
app.use(function(err, req, res, next) {
	res.status(err.status || 500)
	log4.error(err)
	res.redirect('/')
})

// start
let server = app.listen(config.port, () => {
	console.log(`
------------------------------------------------------
    NODE: ${process.env.NODE_ENV}
    PORT: ${server.address().port}

    ************
    ************
    ***
    ***
    ************
    ************
    ***
    ***
    ***
    ***
    ***
------------------------------------------------------
	`)
})

module.exports = app