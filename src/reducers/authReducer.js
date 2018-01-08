function reducer(state = [], action){
	if(action.type === 'SIGNUP'){
		return action.payload.data
	} else if (action.type === 'LOGIN'){
		return action.payload
	} else if (action.type === 'LOGOUT'){
		return []
	// for action we don't care about
	}else{
		return state
	}	
}

export default reducer