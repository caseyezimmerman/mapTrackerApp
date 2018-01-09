import React, { Component } from 'react';
import {ScrollView, Image, View, Text, TextInput, StyleSheet} from 'react-native';
import { connect } from 'react-redux';
import Ionicons from 'react-native-vector-icons/Ionicons';
import PhotoAction from '../actions/PhotoAction';
import ToggleSwitch from 'toggle-switch-react-native'

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
    return(
      <ScrollView>
        <View style={styles.header}>
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
          <Text style={styles.profile2}>Phone: 404-867-5309</Text>
          </Ionicons>
          <Ionicons
            name={'ios-notifications'}
            size={35}
            style={styles.icon}>
            <Text>  </Text>
          <Text style={styles.profile2}>Notifications:</Text>
          </Ionicons>
          <View style={styles.toggle}>
            <ToggleSwitch
              isOn={false}
              onColor='#478543'
              offColor='#9a2d2d'
              label=''
              labelStyle={{color: 'black', fontWeight: '900'}}
              size='medium'
              onToggle={ (isOn) => console.log('changed to : ', isOn) }
            />
          </View>
          <Text style={styles.profile2}>Local Weather</Text>
          <Text>  </Text>
          <Ionicons
            name={'ios-partly-sunny'}
            size={100}
            style={styles.icon2}>
          </Ionicons>
        </View>
      </ScrollView>
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
  toggle: {
    left:200,
    bottom: 30
  },
  profile:{
    textAlign:'center',
    fontSize:20,
    color:'black',
    marginTop:200,
    marginLeft:20
  },
  container:{
    backgroundColor:'white',
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
    color:'black',
    marginTop:20,
    left:10
  },
  header: {
    backgroundColor: '#a5a5a5',
  },
  image:{
    
    marginLeft:90,
  },
  on:{
    left:40
  },
  icon2:{
    color:'black',
    marginTop:20,
    left:160
  },
})







