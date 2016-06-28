import Immutable from 'immutable'

export default function loggerMiddleware({dispatch, getState}) {
	return next => action => {
		if (__LOG__) {
			console.group(action.type)
	  	console.info('dispatching', action)
		}

	  let result = next(action)
	  
	  if (__LOG__) {
	  	console.log('next state', Immutable.fromJS(getState()).toJS())
	  	console.groupEnd(action.type)
	  }
	  
	  return result		
	}
}