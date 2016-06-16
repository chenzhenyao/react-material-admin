import Immutable from 'immutable'
import { createReducer } from 'redux-immutablejs'

const P = '@example/todo/'
const ADD = P + 'ADD'
const TOGGLE = P + 'TOGGLE'
const DELETE = P + 'DELETE'

const initialState = Immutable.fromJS([{
	id: 1,
	checked: false,
	label: 'Utility library delivering modularity, performance, & extras.'
}, {
	id: 2,
	checked: false,
	label: 'Unlike Git, which is strictly a command-line tool.'
}, {
	id: 3,
	checked: true,
	label: 'Did he who made the Lamb make thee?'
}, {
	id: 4,
	checked: true,
	label: 'Avoid loud and aggressive persons,they are vexations to the spirit.'
}, {
	id: 5,
	checked: false,
	label: 'A starter boilerplate for a universal webapp using express, react, redux, webpack, and react-transform'
}, {
	id: 6,
	checked: false,
	label: 'It doesn\'t interest me who you know or how you came to be here.'
}])

export default createReducer(initialState, {
	[ADD]: (state, action) => state.push(Immutable.Map({
		id: (new Date()).getTime(),
		checked: false,
		label: action.label
	})),
	[TOGGLE]: (state, action) => state.update(
		state.findIndex(item => item.get('id') === action.id), 
		item => item.set('checked', !item.get('checked'))
	),
	[DELETE]: (state, action) => state.delete(
		state.findIndex(item => item.get('id') === action.id)
	)
})

export function addTodo(label) {
	return {
		type: ADD,
		label: label
	}
}

export function toggleTodo(id) {
	return {
		type: TOGGLE,
		id: id
	}
}

export function deleteTodo(id) {
	return {
		type: DELETE,
		id: id
	}
}