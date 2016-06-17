import { combineReducers } from 'redux'
import { routeReducer as route } from 'react-router-redux'
import { reducer as form} from 'redux-form'

import base from './modules/base/index'
import example from './modules/example'
import user from './modules/user'

const appReducer = combineReducers({
	route,
	form,
	base,
	example,
	user,
})

export default (state, action) => {
	if (action.type === 'user/auth/LOGOUT') state = void 0
	return appReducer(state, action)
}