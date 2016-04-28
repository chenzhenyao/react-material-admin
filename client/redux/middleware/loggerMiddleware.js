export default function loggerMiddleware({dispatch, getState}) {	
	return next => action => {
		console.group(action.type)
	  console.info('dispatching', action)

	  let result = next(action)
	  
	  console.log('next state', getState())
	  console.groupEnd(action.type)
	  
	  return result		
	}
}