import axios from 'axios'

function MapAction(timerSeconds, timerMinutes, distance, navigator) {
    var axiosPromise = axios({
        method: 'POST',
        url: 'http://localhost:3000/timer',
        data: {
            timerSeconds: timerSeconds,
            timerMinutes: timerMinutes,
            distance: distance
        }
    })
    // pass desired route as string
    .then((data) => {
        navigator.navigate('Results')
        console.log(data)
        return data

    })
    return {
        type: 'MAP',
        payload: axiosPromise
    };
};

export default MapAction