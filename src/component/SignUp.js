import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Keyboard, CardSection, ScrollView, Text, TextInput, View, Button, StyleSheet, TouchableOpacity, TouchableHighlight } from 'react-native';
import SignUpAction from '../actions/AuthAction';
import t from 'tcomb-form-native'
import _ from 'lodash'
import { bindActionCreators } from 'redux'
import { TabNavigator } from 'react-navigation'

const stylesheet = _.cloneDeep(t.form.Form.stylesheet);

stylesheet.textbox.normal.borderWidth = 0;
stylesheet.textbox.error.borderWidth = 0;
stylesheet.textbox.normal.marginBottom = 0;
stylesheet.textbox.error.marginBottom = 0;
stylesheet.textboxView.normal.borderWidth = 0;
stylesheet.textboxView.error.borderWidth = 0;
stylesheet.textboxView.normal.borderRadius = 0;
stylesheet.textboxView.error.borderRadius = 0;
stylesheet.textboxView.normal.borderBottomWidth = 1;
stylesheet.textboxView.error.borderBottomWidth = 1;
stylesheet.textbox.normal.marginBottom = 5;
stylesheet.textbox.error.marginBottom = 5;
stylesheet.textbox.normal.fontSize = 20
stylesheet.textboxView.normal.marginBottom = 30
stylesheet.textboxView.error.marginBottom = 30
stylesheet.textbox.normal.color = 'white'
stylesheet.textbox.normal.placeholderTextColor

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

	componentWillMount(newProps){}

	render (props) {
		return (
			<ScrollView style={{padding: 20, backgroundColor:'#1d4a5f'}}>
				<Text style={styles.login}>{this.state.route}</Text>
					<Form style={styles.form} 
						ref="form"
						type={SignUpForm}
						options={options}
					/>
				<View style={{margin: 7}}/>                        
				<TouchableOpacity>
					<Text 
						style={styles.button} onPress={(e) => 
							this.userSignUp(e, this.props.navigation)} 
							title={this.state.route}
					>
						Sign Up
					</Text>
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
    flex: 0.9,
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
},
  login: {
    marginTop:50,
    marginBottom:30,
    fontSize: 40,
    textAlign:'center',
    color:'white',
    fontFamily: 'Hoefler Text'
},
  text:{
    marginTop:40,
    color: 'white'

},
  input:{
    marginBottom:30,
    borderWidth:2,
    borderColor: 'transparent',
    width:'60%',
    marginLeft:'5%',
    backgroundColor:'#0e2d3f',
    height:50,
    color:'white'
  },
  button:{
    fontSize:25,
    backgroundColor:'#50dcc1',
    height:50,
    textAlign:'center',
    color:'white',
    fontWeight:'bold',
    fontFamily: 'Bradley Hand'
  },
  placeholder:{
    color:'white'
  },
  form:{
    marginBottom:20,
  }
});