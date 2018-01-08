import React, { Component } from 'react';
import {Image, View, Text, TextInput, StyleSheet} from 'react-native'
import { connect } from 'react-redux'
import Ionicons from 'react-native-vector-icons/Ionicons';

class Profile extends Component{
  render(){
    console.log(this.props.auth)
    return(
      <View>
        <View>
          <Image 
            style={styles.image}           
            source={require('../../images/account.png')}
              />
        </View>
        <View style={styles.container}>
          <Ionicons
            name={'ios-contact'}
            size={35}
            style={styles.icon}>
            <Text>  </Text>
            <Text style={styles.profile}>Name: {this.props.auth.name}</Text>
          </Ionicons>
          <Ionicons
            name={'ios-mail'}
            size={35}
            style={styles.icon}> 
            <Text>  </Text> 
          <Text style={styles.profile2}>Email: {this.props.auth.email}</Text>
          </Ionicons>
        </View>
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
    // justifyContent:'space-between',
    fontSize:20,
    color:'black',
    marginTop:200,
    marginLeft:20
  },
  container:{
    backgroundColor:'lightgrey',
     height:'100%',
     width:'100%'
  
  },
  profile2:{
    textAlign:'center',
    fontSize:20,
    color:'black',
    marginLeft:20
  },
  icon:{
    color:'#949494',
    marginTop:20
  },
  image:{
    marginLeft:90
  }
})

export default connect(mapStateToProps)(Profile)





