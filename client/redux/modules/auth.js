import Md5 from 'blueimp-md5'
import Immutable from 'immutable'
import storage from 'simplestorage.js'
import { createReducer } from 'redux-immutablejs'
import { routeActions } from 'react-router-redux'
import apiClient from '../../helper/apiClient'

const LOGIN = '@@auth/LOGIN'
const LOGIN_SUCCESS = '@@auth/LOGIN_SUCCESS'
const LOGIN_FAIL = '@@auth/LOGIN_FAIL'
export const LOGOUT = '@@auth/LOGOUT'

const initialState = Immutable.fromJS(storage.get('@@auth') || {})

export default createReducer(initialState, {
	[LOGIN_SUCCESS]: (state, action) => Immutable.Map(action.data),
	[LOGOUT]: (state, action) => Immutable.fromJS({})
})

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
				console.log('123')
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