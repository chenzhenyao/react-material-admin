export default function loggerMiddleware({dispatch, getState}) {	
	return next => action => {
		if (__LOG__) {
			console.group(action.type)
	  	console.info('dispatching', action)
		}

	  let result = next(action)
	  
	  if (__LOG__) {
	  	console.log('next state', getState())
	  	console.groupEnd(action.type)
	  }
	  
	  return result		
	}
}