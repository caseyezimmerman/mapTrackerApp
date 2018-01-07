/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  View,
  Text,
  Dimensions,
  StatusBarIOS
} from 'react-native'
import MapView from 'react-native-maps'

import haversine from 'haversine'
import pick from 'lodash/pick'

const { width, height } = Dimensions.get('window')

export default class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      routeCoordinates: [],
      distanceTravelled: 0,
      prevLatLng: {},
      currentLatLng: {}
    }
    this.startWatch = this.startWatch.bind(this)
  }

  // componentDidMount() {
  //   // StatusBarIOS.setStyle('light-content')
  //   navigator.geolocation.getCurrentPosition(
  //     (position) => {
  //       console.log(position)
  //       const { routeCoordinates } = this.state
  //       // const newLatLngs = {latitude: position.coords.latitude, longitude: position.coords.longitude }
  //       const positionLatLngs = pick(position.coords, ['latitude', 'longitude'])
  //       this.setState({
  //         // routeCoordinates: routeCoordinates.concat(positionLatLngs),
  //         // distanceTravelled: distanceTravelled + this.calcDistance(newLatLngs),
  //         // prevLatLng: newLatLngs,
  //         currentLatLng: position.coords
  //       })
  //     },
  //     (error) => alert(error.message),
  //     // {enableHighAccuracy: true, timeout: 1000, maximumAge: 10000000000000}
  //   )
  //   // this.watchID = navigator.geolocation.watchPosition((position) => {

  //   // });
  // }

  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.watchID);
  }

  calcDistance(newLatLng) {
    const { prevLatLng } = this.state
    return (haversine(prevLatLng, newLatLng) || 0)
  }

  startWatch(){
    navigator.geolocation.getCurrentPosition(
      (position) => {},
      (error) => alert(error.message),
      {enableHighAccuracy: true, timeout: 100, maximumAge: 0}
    )
    this.watchID = navigator.geolocation.watchPosition((position) => {
      console.log(position)
      const { routeCoordinates, distanceTravelled } = this.state
      const newLatLngs = {latitude: position.coords.latitude, longitude: position.coords.longitude }
      const positionLatLngs = pick(position.coords, ['latitude', 'longitude'])
      this.setState({
        routeCoordinates: routeCoordinates.concat(positionLatLngs),
        distanceTravelled: distanceTravelled + this.calcDistance(newLatLngs),
        prevLatLng: newLatLngs,
        currentLatLng: position.coords
      })
    });
  }


  render() {
    console.log(this.state.currentLatLng)
    return (
      <View style={styles.container}>
        <MapView
          style={styles.map}
          region= {{
            latitude: this.state.currentLatLng.latitude,
            longitude: this.state.currentLatLng.longitude,
            latitudeDelta: .007,
            longitudeDelta: .007,
          }}
          mapType='satellite'
          showsUserLocation={true}
          followUserLocation={false}
          />
        
        <View style={styles.navBar}><Text style={styles.navBarText}>Run Rabbit Run</Text></View>
        <View style={styles.bottomBar}>
          <View style={styles.bottomBarGroup}>
            <Text style={styles.bottomBarHeader}>DISTANCE</Text>
            <Text onPress = {this.startWatch}>START</Text>
            <Text style={styles.bottomBarContent}>{parseFloat(this.state.distanceTravelled).toFixed(2)} km</Text>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  navBar: {
    backgroundColor: 'rgba(0,0,0,0.7)',
    height: 64,
    width: width,
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0
  },
  navBarText: {
    color: '#19B5FE',
    fontSize: 16,
    fontWeight: "700",
    textAlign: 'center',
    paddingTop: 30
  },
  map: {
    flex: 0.7,
    width: width,
    height: height
  },
  bottomBar: {
    position: 'absolute',
    height: 100,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.7)',
    width: width,
    padding: 20,
    flexWrap: 'wrap',
    flexDirection: 'row'
  },
  bottomBarGroup: {
    flex: 1
  },
  bottomBarHeader: {
    color: '#fff',
    fontWeight: "400",
    textAlign: 'center'
  },
  bottomBarContent: {
    color: '#fff',
    fontWeight: "700",
    fontSize: 18,
    marginTop: 10,
    color: '#19B5FE',
    textAlign: 'center'
  },
})