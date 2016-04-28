import { combineReducers } from 'redux'
import { routeReducer as route } from 'react-router-redux'
import { reducer as form} from 'redux-form'

import auth, { LOGOUT } from './modules/auth'
import base from './modules/base'

const appReducer = combineReducers({
	auth,
	base,
	route,
	form,
})

export default (state, action) => {
	if (action.type === LOGOUT) state = void 0
	return appReducer(state, action)
}