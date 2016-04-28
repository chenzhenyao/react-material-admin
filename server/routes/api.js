'use strict'

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
					headPortrait: '/img/head-portrait.jpg'
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
}