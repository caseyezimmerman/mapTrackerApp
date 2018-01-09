import React, { Component } from 'react';
import {Image, View, Text, TextInput, StyleSheet} from 'react-native';
import { connect } from 'react-redux';
import Ionicons from 'react-native-vector-icons/Ionicons';
import PhotoAction from '../actions/PhotoAction';

class Profile extends Component{
  render(){
    var name = ""
    if(this.props.auth.userInfo != undefined){
      name = this.props.auth.userInfo.name
    }else{
      name = this.props.auth.name
    }
    var email = ""
    if(this.props.auth.userInfo != undefined){
      email = this.props.auth.userInfo.email
    }else{
      email = this.props.auth.email
    }
    console.log(this.props.auth)
    console.log(this.props.auth.userInfo)
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
            <Text style={styles.profile}>Name: {name}</Text>
          </Ionicons>
          <Ionicons
            name={'ios-mail'}
            size={35}
            style={styles.icon}> 
            <Text>  </Text> 
          <Text style={styles.profile2}>Email: {email}</Text>
          </Ionicons>
          <Ionicons
            name={'ios-phone-portrait'}
            size={35}
            style={styles.icon}> 
            <Text>  </Text> 
          <Text style={styles.profile2}>Phone: 404-867-5309{email}</Text>
          </Ionicons>
        </View>
      </View>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    auth: state.auth,
    photo: state.photo
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    uploadPhoto: PhotoAction
  }, dispatch)
}

export default connect(mapStateToProps)(Profile)

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
    backgroundColor:'#337ab2',
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
    marginTop:20,
    left:10
  },
  image:{
    marginLeft:90
  }
})







