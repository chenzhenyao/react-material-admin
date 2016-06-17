import { combineReducers } from 'redux'

import auth from './auth'
import info from './info'
import profile from './profile'

export default combineReducers({
	auth,
	info,
	profile
})