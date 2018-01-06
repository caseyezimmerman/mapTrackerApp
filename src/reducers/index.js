import { combineReducers } from 'redux';
import authReducer from './authReducer';
import MapReducer from './MapReducer'
// import WaypointsReducer from './WaypointsReducer'
 
const rootReducer = combineReducers({
    auth: authReducer,
    map: MapReducer,
});
 
export default rootReducer;