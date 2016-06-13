'use strict'
const path = require('path')
const fs = require('fs')
const formidable = require('formidable')

module.exports = function(app) {
	app.route('/api/login').post((req, res) => {
		let body = req.body
		if (body.userName === 'admin' && body.password === 'e10adc3949ba59abbe56e057f20f883e') {
			res.send({
				code: 0,
				msg: '',
				data: {
					token: 'e10adc3949ba59abbe56e057f20f883e',
					name: 'fikman',
					profilePicture: '/img/profile.png',
					headPortrait: '/img/profile.png'
				}
			})
		} else {
			res.send({
				code: 1,
				msg: '账号或密码错误',
				data: {}
			})
		}
	})
	app.route('/api/uploadProfile').post((req, res) => {
		let form = new formidable.IncomingForm()
		form.on('file', (name, file) => {
			let read = fs.createReadStream(file.path)
			let write = fs.createWriteStream(path.join(__dirname, '../../public/img/profile.png'))
			read.pipe(write)
			res.send({
				code: 0,
				msg: ''
			})
		})
		form.parse(req)
	})
}