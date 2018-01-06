function reducer (state=[], action){
	if(action.type === 'SIGNUP'){
		// im going to update
		return action.payload.data
	}else if (action.type === 'LOGOUT'){
		return []
	}else{
		// i dont care about this action. just return state
		return state
	}
	
	
}

export default reducer