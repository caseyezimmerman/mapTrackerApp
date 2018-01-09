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
		console.log(data.data.name)
		const theData = data.data;
		if (theData.msg === "emailTaken") {
			navigator.navigate('SignUp', 
				{msg: "This account already exists"})
		} else {
			// empty name field
			if (name == undefined){
				navigator.navigate('SignUp',
					{msg: "Please enter a valid name."})
			} else if (email == undefined){
				navigator.navigate('SignUp',
					{msg: "Please enter a valid email."})
			} else if (password == undefined){
				navigator.navigate('SignUp',{
					msg: "Please enter a valid password."})
			// valid input
			} else {	
				navigator.navigate('Map',
					{msg: "Have a great run!"})
				}
		}
		return data
	})
    return {
        type: 'SIGNUP',
		payload: axiosPromise,
		navigator: navigator
    };
};

export default SignUpAction;

export const logout = () => {
    return {
		type: 'LOGOUT'
    };
};