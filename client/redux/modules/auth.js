import Md5 from 'blueimp-md5'
import storage from 'simplestorage.js'
import { handleActions } from 'redux-actions'
import { routeActions } from 'react-router-redux'
import apiClient from '../../helper/apiClient'

const LOGIN = '@@auth/LOGIN'
const LOGIN_SUCCESS = '@@auth/LOGIN_SUCCESS'
const LOGIN_FAIL = '@@auth/LOGIN_FAIL'
export const LOGOUT = '@@auth/LOGOUT'

export default handleActions({
	[LOGIN_SUCCESS]: (state, action) => {
		return action.data
	},
	[LOGOUT]: (state, action) => {
		return {}
	}
}, storage.get('@@auth') || {})

export function login({userName, password}) {
	return (dispatch, getState) => {
		apiClient({
				url: 'login',
				data: {
					userName: userName,
					password: Md5(password)
				}
			})
			.then(({ data = {} }) => {
				storage.set('@@auth', data)
				dispatch({
					type: LOGIN_SUCCESS,
					data: data
				})
				dispatch(routeActions.push('/'))
			})
			.catch(() => {})
	}
}

export function logout() {
	return (dispatch, getState) => {
		dispatch({
			type: LOGOUT
		})
		dispatch(routeActions.push('/login'))
	}
}