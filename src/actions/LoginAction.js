import axios from 'axios'

function LoginAction(email,password,error,navigator) {
    var axiosPromise = axios({
        method: 'POST',
        url: 'http://localhost:3000/login',
        data: {
            email: email,
            password: password
        }
    }).then((data) => {
        // error handling
        const theData = data.data;
        if (theData.msg === "userDoesNotExist") {
            // tell user email not found
            navigator.navigate('SignUp', 
                { msg: "This account was not found"})
        } else if (theData.msg === "wrongPassword") {
            // tell user wrong password
            navigator.navigate('Login', 
                { msg: "Password does not match" })
        } else {
            navigator.navigate('Map', 
                { msg: "Have a great run!" })
        }
        return data
    });

    return {
        type: 'LOGIN',
        payload: axiosPromise,
        navigator: navigator,
    }
};

export default LoginAction

export const logout = () => {
    return {
        type: 'LOGOUT'
    };
};