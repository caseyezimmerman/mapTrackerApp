function MapReducer (state=[], action){
	if(action.type === 'MAP'){
		return action.payload
	}else{
		// i dont care about this action. just return state
		return state
	}
	
	
}

export default MapReducer