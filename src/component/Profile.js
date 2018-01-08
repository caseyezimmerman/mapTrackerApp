import React, { Component } from 'react';
import {View, Text, TextInput, StyleSheet} from 'react-native'
import { connect } from 'react-redux'
import Ionicons from 'react-native-vector-icons/Ionicons';

class Profile extends Component{
  render(){
    console.log(this.props.auth)
    return(
      <View style={styles.container}>
      
        <Ionicons
          name={'ios-contact'}
          size={35}
          style={styles.icon}>
          <Text style={styles.profile}>Name: {this.props.auth.name}</Text>
        </Ionicons>
        <Ionicons
          name={'ios-mail'}
          size={35}
          style={styles.icon}>  
        <Text style={styles.profile2}>Email: {this.props.auth.email}</Text>
        </Ionicons>
      </View>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    auth: state.auth
  };
}

const styles = StyleSheet.create({
  profile:{
    // flex:1,
    textAlign:'center',
    justifyContent:'space-between',
    fontSize:30,
    color:'white',
    marginTop:200,
    marginLeft:20
  },
  container:{
    backgroundColor:'teal',
     height:'100%',
     width:'100%'
  
  },
  profile2:{
    textAlign:'center',
    fontSize:30,
    color:'white',
    marginLeft:20
  },
  icon:{
    color:'#949494',
    marginTop:80
  }
})

export default connect(mapStateToProps)(Profile)





