import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Image, Keyboard, CardSection, ScrollView, Text, TextInput, View, Button, StyleSheet, TouchableOpacity, TouchableHighlight } from 'react-native';
import SignUpAction from '../actions/AuthAction';
import t from 'tcomb-form-native'
import _ from 'lodash'
import { bindActionCreators } from 'redux'
import { TabNavigator } from 'react-navigation'

const stylesheet = _.cloneDeep(t.form.Form.stylesheet);

// stylesheet.textbox.normal.borderWidth = 0;
// stylesheet.textbox.error.borderWidth = 0;
// stylesheet.textbox.normal.marginBottom = 0;
// stylesheet.textbox.error.marginBottom = 0;
// stylesheet.textboxView.normal.borderWidth = 0;
// stylesheet.textboxView.error.borderWidth = 0;
// stylesheet.textboxView.normal.borderRadius = 0;
// stylesheet.textboxView.error.borderRadius = 0;
// stylesheet.textboxView.normal.borderBottomWidth = 1;
// stylesheet.textboxView.error.borderBottomWidth = 1;
// stylesheet.textboxView.normal.borderBottomColor= 'black'
// stylesheet.textbox.normal.marginBottom = 5;
// stylesheet.textbox.error.marginBottom = 5;
// stylesheet.textbox.normal.fontSize = 20
// stylesheet.textboxView.normal.marginBottom = 30
// stylesheet.textboxView.error.marginBottom = 30
// stylesheet.textbox.normal.color = 'black'
// stylesheet.textbox.normal.placeholderTextColor
stylesheet.textbox.normal.width = '80%'
stylesheet.textbox.normal.textAlign = 'center'
stylesheet.textbox.normal.marginLeft = 35
stylesheet.textbox.normal.borderRadius = 30
stylesheet.textbox.normal.height = 45
stylesheet.textbox.normal.marginBottom = 5;
stylesheet.textbox.normal.backgroundColor = 'white'
stylesheet.textbox.normal.borderColor = 'transparent'

// tcomb
var Form = t.form.Form 
// var options = {
// 	auto: 'placeholders',
// 	stylesheet: stylesheet,
// 	password: true,
// 	secureTextEntry: true
// };

var options = {
  auto: 'placeholders',
  stylesheet: stylesheet,
  fields: {
    password: {
      password: true,
      secureTextEntry: true
    }
  }
};

var SignUpForm = t.struct({
  name: t.String,
  email: t.String,
  password: t.String,
});
 
class SignUp extends Component {
	constructor (props) {
		super(props);
		this.state = {
				route: 'SignUp',
				username: '',
				password: ''
		};
		this.onPress = this.onPress.bind(this)
	}

	userSignUp (e, navigator) {
		e.preventDefault();
		var name = (this.refs.form.getComponent('name').props.value) 
		var email = (this.refs.form.getComponent('email').props.value)
		var password = (this.refs.form.getComponent('password').props.value)  
		this.props.onSignUp(name,email,password,navigator);    
	}

	onPress (e) { e.preventDefault() }

	render (props) {
		if (this.props.navigation.state.params !== undefined) {
			var userMsg = this.props.navigation.state.params.msg
		}
		return (
			<ScrollView style={{backgroundColor:'#337ab2'}}>
				      
				<Image
					style={styles.image}
          			source={require('../../images/shoe2.png')}
        		/>
				
					<Form style={styles.form} 
						ref="form"
						type={SignUpForm}
						options={options}
					/>
				                        
					<Text style={styles.error}>{userMsg}</Text>
					<TouchableOpacity 
						style={styles.button} onPress={(e) => 
							this.userSignUp(e, this.props.navigation)} 							
					>
						<Text style={styles.signup}>Sign Up</Text>
					</TouchableOpacity>
				
				<Text 
					style={styles.text} onPress={() => 
						this.props.navigation.navigate('Login')}
				>
					Already have an account? Login
				</Text>
				
			</ScrollView>
		);
	}
}

// state.auth ?
const mapStateToProps = (state, ownProps) => {
	return {
		isLoggedIn: state.auth.isLoggedIn
	};
}

function mapDispatchToProps(dispatch){
	return bindActionCreators({
		onSignUp: SignUpAction
	},dispatch)
}

 
export default connect(mapStateToProps, mapDispatchToProps)(SignUp);


const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
},
  login: {
    // marginTop:20,
    // marginBottom:30,
    fontSize: 40,
    textAlign:'center',
    color:'white',
    fontFamily: 'Hoefler Text'
},
  text:{
    marginTop:20,
    color: 'white'

},
  input:{
    // marginBottom:10,
    borderWidth:2,
    borderColor: 'transparent',
    width:'60%',
    marginLeft:'5%',
    backgroundColor:'#0e2d3f',
    height:50,
    color:'black'
  },
  button:{
    // backgroundColor:'#50dcc1',
    // height:50,
    
    // fontWeight:'bold',
    // fontFamily: 'Bradley Hand'
    height:45,
    width:'80%',
    borderWidth:6,
    borderColor: 'transparent',
    borderRadius: 30,
    backgroundColor:'#71afd6',
    marginLeft: 35,
    marginTop:10
  },
  signup:{
  	fontSize:20,
  	textAlign:'center',
    color:'slategrey',
    backgroundColor: 'transparent',


  },
  placeholder:{
    color:'white'
  },
  form:{
  	marginLeft:50,
    marginBottom:100,
    width:'80%'
  },
  image:{
  	marginTop: 40,
  	marginLeft:70,
  	marginBottom: 40
  },
  error:{
  	color:'red'
  }
});



// <Image
//     style={{
//       // backgroundColor: '#ccc',
//       flex: 1,
//       position: 'absolute',
//       width: '100%',
//       height: '150%',
//       justifyContent: 'center',
//     }}
//     source={require('../../images/bg.jpg')}
//   />

