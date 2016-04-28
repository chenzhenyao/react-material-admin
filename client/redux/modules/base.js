import { handleActions } from 'redux-actions'

const RESIZE = '@@base/RESIZE'
const CLOSE_NAV = '@@/base/CLOSE_NAV'
const TOGGLE_NAV_OPEN = '@@base/TOGGLE_NAV_OPEN'

export default handleActions({
	[RESIZE]: (state, action) => {
		return {
			...state,
			screenWidth: action.size
		}
	},
	[TOGGLE_NAV_OPEN]: (state) => {
		return {
			...state,
			navOpen: !state.navOpen
		}
	},
	[CLOSE_NAV]: (state) => {
		return {
			...state,
			navOpen: false
		}
	}
}, {
	screenWidth: document.body.offsetWidth || window.innerWidth || 0,
	navOpen: false,
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