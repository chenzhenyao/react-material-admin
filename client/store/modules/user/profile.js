import Immutable from 'immutable'
import { createReducer } from 'redux-immutablejs'
import apiClient from 'helper/apiClient'
import { getUserInfo } from './info'

const P = '@user/profile/'
const OPEN_DIALOG = P + 'OPEN_DIALOG'
const CLOSE_DIALOG = P + 'CLOSE_DIALOG'
const SET_SCALE = P + 'SET_SCALE'
const SET_PICTURE =  P + 'SET_PICTURE'
const UPLOAD_PROFIEL = P + 'UPLOAD_PROFIEL'
const UPLOAD_PROFIEL_SUCCESS = P + 'UPLOAD_PROFIEL_SUCCESS'
const UPLOAD_PROFIEL_FAIL = P + 'UPLOAD_PROFIEL_FAIL'

const initialState = Immutable.fromJS({
	open: false,
	scale: 1,
	picture: ''
})

export default createReducer(initialState, {
	[OPEN_DIALOG]: (state, action) => state.set('open', true),
	[CLOSE_DIALOG]: (state, action) => state.set('open', false),
	[SET_SCALE]: (state, action) => state.set('scale', action.data),
	[SET_PICTURE]: (state, action) => state.set('picture', action.data),
})

export function openDialog() {
	return {
		type: OPEN_DIALOG
	}
}
export function closeDialog() {
	return {
		type: CLOSE_DIALOG
	}
}
export function setScale(scale) {
	return {
		type: SET_SCALE,
		data: scale
	}
}
export function setPicture(dataUrl) {
	return {
		type: SET_PICTURE,
		data: dataUrl
	}
}
export function uploadProfile(blob) {
	return (dispatch, getState) => {
		let data = new FormData()
		data.append('picture', blob)
		dispatch({
			type: UPLOAD_PROFIEL
		})
		apiClient({
			url: 'uploadProfile',
			data: data
		})
		.then(() => {
			dispatch({
				type: UPLOAD_PROFIEL_SUCCESS
			})
			dispatch(getUserInfo())
		})
	}
}

