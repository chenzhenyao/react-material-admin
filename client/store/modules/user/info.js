import Immutable from 'immutable'
import { createReducer } from 'redux-immutablejs'
import apiClient from 'helper/apiClient'

const P = '@user/info/'
const GET_USER_INFO = P + 'GET_USER_INFO'
const GET_USER_INFO_SUCCESS = P + 'GET_USER_INFO_SUCCESS'
const GET_USER_INFO_FAIL = P + 'GET_USER_INFO_FAIL'

const initialState = Immutable.fromJS({})

export default createReducer(initialState, {
	[GET_USER_INFO_SUCCESS]: (state, action) => Immutable.Map(action.data)
})

export function getUserInfo() {
	return (dispatch, getState) => {
		apiClient({
			url: 'getUserInfo'
		})
		.then(({ data = {} }) => {
			dispatch({
				type: GET_USER_INFO_SUCCESS,
				data: data
			})
		})
	}
}