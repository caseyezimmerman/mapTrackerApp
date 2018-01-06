function MapReducer (state=[], action){
	if(action.type === 'MAPMAKER'){
		// im going to update
		console.log(action.payload)
		var mapStuff = {
			userInput: action.payload[0].data,
			userLatLng: action.payload[1]
		}
		return mapStuff
	}else if (action.type === 'LOGOUT'){
		return []
	}else{
		// i dont care about this action. just return state
		return state
	}
	
	
}

export default MapReducer