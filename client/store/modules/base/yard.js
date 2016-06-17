import Immutable from 'immutable'
import { createReducer } from 'redux-immutablejs'

const P = '@base/yard/'
const RESIZE = P + 'RESIZE'
const CLOSE_NAV = P + 'CLOSE_NAV'
const TOGGLE_NAV_OPEN = P + 'TOGGLE_NAV_OPEN'

const initialState = Immutable.fromJS({
	screenWidth: document.body.offsetWidth || window.innerWidth || 0,
	navOpen: false,
})

export default createReducer(initialState, {
	[RESIZE]: (state, action) => state.set('screenWidth', action.size),
	[TOGGLE_NAV_OPEN]: (state) => state.set('navOpen', !state.get('navOpen')),
	[CLOSE_NAV]: (state) => state.set('navOpen', false)
})

export function resize(size) {
	return {
		type: RESIZE,
		size: size
	}
}

export function toggleNavOpen() {
	return {
		type: TOGGLE_NAV_OPEN
	}
}

export function closeNav() {
	return {
		type: CLOSE_NAV
	}
}