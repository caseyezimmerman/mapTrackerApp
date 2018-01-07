import axios from 'axios'

function SignUpAction(name,email,password,navigator){
	var axiosPromise = axios({
	method: 'POST',
	url: 'http://localhost:3000/signup',
	data: {
		name: name,
		email: email,
		password: password
		}
	})
	// pass desired route as string
	.then((data)=>{
		navigator.navigate('Map')
		return data
	})
    return {
        type: 'SIGNUP',
        payload: axiosPromise
    };
};

export default SignUpAction;

export const logout = () => {
    return {
		type: 'LOGOUT'
    };
};