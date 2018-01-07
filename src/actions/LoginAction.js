import axios from 'axios'

function LoginAction(email, password, navigator) {
    var axiosPromise = axios({
        method: 'POST',
        url: 'http://localhost:3000/login',
        data: {
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

export default LoginAction

export const logout = () => {
    return {
        type: 'LOGOUT'
    };
};