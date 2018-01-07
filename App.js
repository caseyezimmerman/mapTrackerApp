import React, { Component } from 'react';
import SignUp from './src/component/SignUp';
import Login from './src/component/Login';
import MapTracker from './src/component/MapTracker';
import { TabNavigator } from 'react-navigation';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { View } from 'react-native';
import StopWatch from './src/component/Results'

const SignUpScreen = () => <SignUp />
const LoginScreen = () => <Login />
const MapStartScreen = () => <MapTracker />
const StopWatchScreen = () => <StopWatch />

// adjust this for navbar
const NavBarConfig = {
  SignUp: { 
    screen: SignUp,
    navigationOptions:{
      tabBarLabel: 'SignUp',
      tabBarIcon: ({ focused }) => (
        <Ionicons
          name={focused ? 'ios-people' : 'ios-people-outline'}
          size={26}
          style={{ color: focused ? '#33A3F4' : '#949494' }}
        />
      ),
    }
  },
  Login:{
    screen: Login,
    navigationOptions: {
      tabBarLabel: 'Login',
      tabBarIcon: ({ focused }) => (
        <Ionicons
          name={focused ? 'ios-people' : 'ios-people-outline'}
          size={26}
          style={{ color: focused ? '#33A3F4' : '#949494' }}
        />
      ),
    }
  },
  Map: { 
    screen: MapTracker,
    navigationOptions:{
      tabBarOptions: 'Map',
      tabBarIcon: ({ focused }) => (
        <Ionicons
          name={focused ? 'ios-walk' : 'ios-walk'}
          size={26}
          style={{ color: focused ? '#33A3F4' : '#949494' }}
        />
      ),
    }
  },
    Watch: { 
    screen: StopWatch,
    navigationOptions:{
      tabBarOptions: 'Map',
      tabBarIcon: ({ focused }) => (
        <Ionicons
          name={focused ? 'ios-clock' : 'ios-clock'}
          size={26}
          style={{ color: focused ? '#33A3F4' : '#949494' }}
        />
      ),
    }
  },
}



// adjust this for styles
const styleNavConfig = {
  animationEnabled: true,
  tabBarOptions: {
    activeTintColor: '#e91e63',
  }
}


const AppWithNavigation = TabNavigator(NavBarConfig, styleNavConfig)

class App extends Component {
    render() {
      console.log(this.props)
       return(
        <View style={{ paddingTop: 40, flex: 1}}>
          <AppWithNavigation />
        </View>  
      )
    }
}

export default App