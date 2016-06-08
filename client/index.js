import './css/index.css'
import 'babel-polyfill'

import React from 'react'
import ReactDOM from 'react-dom'
import injectTapEventPlugin from 'react-tap-event-plugin'
import { Router, Route } from 'react-router'
import { browserHistory } from 'react-router'

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

import BarChart from './containers/example/BarChart'
import CropBox from './containers/example/CropBox'
import LineChart from './containers/example/LineChart'
import List from './containers/example/List'
import Tabs from './containers/example/Tabs'
import TodoList from './containers/example/TodoList'
import X from './containers/example/X'

injectTapEventPlugin()

const createStoreWithMiddleware = applyMiddleware(syncHistory(browserHistory), thunkMiddleware, loggerMiddleware)(createStore)
const store = createStoreWithMiddleware(reducers)

function requestAuth(location, replaceWith) {
	console.log('auth...')
	const { auth } = store.getState()
	if (!auth.get('token')) replaceWith(null, '/login')
}

let rooEl = document.createElement('div')
document.body.appendChild(rooEl)

ReactDOM.render((
	<Provider store={store}>
		<Router history={browserHistory}>
			<Route component={Global}>
				<Route component={Yard} onEnter={requestAuth}>
					<Route path="/" component={Home} />
					<Route path="/example">
						<Route path="bar-chart" component={BarChart} />
						<Route path="crop-box" component={CropBox} />
						<Route path="line-chart" component={LineChart} />
						<Route path="list" component={List} />
						<Route path="tabs" component={Tabs} />
						<Route path="todo-list" component={TodoList} />
						<Route path="x" component={X} />
					</Route>
				</Route>
				<Route path="/login" component={Login} />
			</Route>
		</Router>
	</Provider>
), rooEl)