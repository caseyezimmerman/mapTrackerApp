import axios from 'axios'

function PhotoAction(email, password, navigator) {
    var axiosPromise = axios({
        method: 'POST',
        url: 'http://localhost:3000/photoUpload',
        data: {
            email: email,
            password: password
        }
    }).then((data) => {
        return data;
    })
    return {
        type: 'UPLOADPHOTO',
        payload: axiosPromise,
    }
};

export default PhotoAction;
