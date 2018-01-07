import axios from 'axios'

function login(name, email, password, navigator) {
    var axiosPromise = axios({
        method: 'POST',
        url: 'http://localhost:3000/login',
        data: {
            name: name,
            email: email,
            password: password
        }
    })
    // pass desired route as string
    .then((data) => {
        navigator.navigate('Map')
        return data
    })
    return {
        type: 'LOGIN',
        payload: axiosPromise
    };
};

export default login

// need return empty state/remove token
export const logout = () => {
    return {
        type: 'LOGOUT',
        payload: '[]'s
    };
};