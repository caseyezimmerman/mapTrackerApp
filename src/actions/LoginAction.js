import axios from 'axios'

function LoginAction(email,password,navigator) {
    var axiosPromise = axios({
        method: 'POST',
        url: 'http://localhost:3000/login',
        data: {
            email: email,
            password: password
        }
    }).then((data) => {
        console.log(data)
        // error handling
        if (data.data.msg === "userDoesNotExist") {
            // tell user need to make an account
            navigator.navigate('SignUp')
        } else if (data.data.msg === "wrongPassword") {
            // tell user wrong password
        } else {
            navigator.navigate('Map')
        }
        return data
    })
    // pass desired route as string
    return {
        type: 'LOGIN',
        payload: axiosPromise,
        navigator: navigator
    }
};

export default LoginAction

export const logout = () => {
    return {
        type: 'LOGOUT'
    };
};