import { combineReducers } from 'redux';
import authReducer from './authReducer';
import MapReducer from './MapReducer'
import PhotoReducer from './PhotoReducer';
 
const rootReducer = combineReducers({
	auth: authReducer,
	map: MapReducer,
	photo: PhotoReducer
});

export default rootReducer;