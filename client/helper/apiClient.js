import storage from 'simplestorage.js'
import superagent from 'superagent'
import nprogress from 'nprogress'
import { alert } from 'components/alarm'

nprogress.configure({
	minimum: 0.618,
	speed: 618
})
const xhrSet = new Set()

export default function apiClient({ url, type = 'post', params = {}, data = {}}) {
	return new Promise((resolve, reject) => {
		if (xhrSet.has(url)) reject();
		xhrSet.add(url)
		nprogress.start()

		const auth = storage.get('@auth') || {}
		const request = superagent[type]('/api/' + url)
		params.token = auth.token
		request.query(params)
		request.send(data)
		request.accept('application/json')
		request.end((err, response) => {
			xhrSet.delete(url)
			nprogress.done()

			if (err) {
				window.location.href = '#/login'
				alert(err.message)
				return reject({code: 1, msg: err.message})
			}
			
			const body = response.body || response.text || {}
			const { code = 1, msg = '未知错误' } = body;

			switch (+code) {
				case 0:
					resolve(body)
					break
				default:
					alert(msg)
					reject(body)
			}
		})
	})
}