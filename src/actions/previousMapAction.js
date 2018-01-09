import axios from 'axios'
import Geocoder from 'react-native-geocoding';

Geocoder.setApiKey('AIzaSyCOaoP7KuO0wOQ9fiejMot0D57UsaIQqCI')

function MapAction(currentLocation,distance,navigator){
	var promiseArray = []
	var axiosPromise = axios({
	method: 'POST',
	url: 'http://localhost:3000/map',
	data: {
		currentLocation: currentLocation,
		distance: distance
		}
	})
	var geoPromise = Geocoder.getFromLocation(currentLocation).then(
	    json => {
	      var geolocation = json.results[0].geometry.location;
	      console.log(geolocation.lat)
	      console.log(geolocation.lng)
	      
		  return geolocation
	    },
		    error => {
		      alert(error);
		    }

		);
	promiseArray.push(axiosPromise)
	promiseArray.push(geoPromise)

	var fullPayloadPromise = new Promise((resolve, reject) => {
		Promise.all(promiseArray).then((results)=>{
				navigator.navigate('RunningMap')
				resolve(results)
			}).catch((reason)=>{
				console.log(reason)
				reject(reason);
			})
	});

    return {
        type: 'MAPMAKER',
        payload: fullPayloadPromise
    };
};

export default MapAction