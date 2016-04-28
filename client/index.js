import './css/index.css'
import 'babel-polyfill'

import React from 'react'
import ReactDOM from 'react-dom'
import injectTapEventPlugin from 'react-tap-event-plugin'
import { Router, Route } from 'react-router'
import createHistory from 'history/lib/createHashHistory'

import { syncHistory } from 'react-router-redux'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import thunkMiddleware from './redux/middleware/thunkMiddleware' 
import loggerMiddleware from './redux/middleware/loggerMiddleware'
import reducers from './redux/index'

import Global from './containers/base/Global'
import Yard from './containers/base/Yard'
import Login from './containers/auth/Login'
import Home from './containers/home/Home'

import List from './containers/example/List'

injectTapEventPlugin()

const history = createHistory({queryKey: false})
const createStoreWithMiddleware = applyMiddleware(syncHistory(history), thunkMiddleware, loggerMiddleware)(createStore)
const store = createStoreWithMiddleware(reducers)

function requestAuth(location, replaceWith) {
	console.log('auth...')
}

let rooEl = document.createElement('div')
document.body.appendChild(rooEl)

ReactDOM.render((
	<Provider store={store}>
		<Router history={history}>
			<Route component={Global}>
				<Route component={Yard} onEnter={requestAuth}>
					<Route path="/" component={Home} />
					<Route path="/list" component={List} />
				</Route>
				<Route path="/login" component={Login} />
			</Route>
		</Router>
	</Provider>
), rooEl)