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
  StatusBarIOS,
  Button
} from 'react-native'
import MapView from 'react-native-maps'

import haversine from 'haversine'
import pick from 'lodash/pick'

const { width, height } = Dimensions.get('window')

export default class MapTracker extends Component {
  constructor(props) {
    super(props)

    this.state = {
      routeCoordinates: [],
      distanceTravelled: 0,
      prevLatLng: {},
      currentLatLng: {},
      timer: null,
      minutes: '00',
      counter: '00',
      miliseconds: '00',
      startDisabled: true,
      stopDisabled: false
    }
    this.startWatch = this.startWatch.bind(this)
    this.onButtonStart = this.onButtonStart.bind(this);
    this.onButtonStop = this.onButtonStop.bind(this);
    this.onButtonClear = this.onButtonClear.bind(this);
    this.start = this.start.bind(this);
  }

  componentDidMount() {
    // StatusBarIOS.setStyle('light-content')
    navigator.geolocation.getCurrentPosition(
      (position) => {
        console.log(position)
        const { routeCoordinates } = this.state
        // const newLatLngs = {latitude: position.coords.latitude, longitude: position.coords.longitude }
        const positionLatLngs = pick(position.coords, ['latitude', 'longitude'])
        this.setState({
          // routeCoordinates: routeCoordinates.concat(positionLatLngs),
          // distanceTravelled: distanceTravelled + this.calcDistance(newLatLngs),
          // prevLatLng: newLatLngs,
          currentLatLng: position.coords
        })
      },
      (error) => alert(error.message),
      // {enableHighAccuracy: true, timeout: 1000, maximumAge: 10000000000000}
    )
  //   // this.watchID = navigator.geolocation.watchPosition((position) => {

    // });

    //   componentWillUnmount() {
    //     clearInterval(this.state.timer);
    }
 
 
 
    start() {
        var self = this;
        let timer = setInterval(() => {
            var num = (Number(this.state.miliseconds) + 1).toString(),
                count = this.state.counter;
            console.log(num)
            if( Number(this.state.miliseconds) == 40 ) {
                count = (Number(this.state.counter) + 1).toString();
                num = '00';
            }
            var min = this.state.minutes;
            if( Number(this.state.counter) == 60 ) {
                min = (Number(this.state.minutes) + 1).toString();
                num = '00';
                count = '00';
            }
            console.log(min)
            self.setState({
                minutes: min.length == 1 ? '0'+min : min,
                counter: count.length == 1 ? '0'+count : count,
                miliseconds: num.length == 1 ? '0'+num : num
            });
        }, 0);
        this.setState({timer});
    }
 
 
 
 
 
    onButtonStart() {
 
        this.start();
        this.setState({startDisabled: true, stopDisabled: false});
    }
 
 
    onButtonStop() {
        clearInterval(this.state.timer);
        this.setState({startDisabled: false, stopDisabled: true});
    }
 
 
    onButtonClear() {
        this.setState({
            timer: null,
            minutes:'00',
            counter: '00',
            miliseconds: '00'
        });
    }

  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.watchID);
    clearInterval(this.state.timer);
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
          overlays={[{
            coordinates: this.state.routeCoordinates,
            strokeColor: '#19B5FE',
            lineWidth: 10,
          }]}
          />
        
        <View style={styles.navBar}><Text style={styles.navBarText}>Run Rabbit Run</Text></View>
        <View style={styles.bottomBar}>
          <View style={styles.bottomBarGroup}>
    
            <Text onPress = {this.startWatch}>START</Text>
            <Text style={styles.bottomBarContent}></Text>
          </View>
          <Text style={styles.counter}>{this.state.minutes}:</Text>
          <Text style={styles.counter}>{this.state.counter}</Text>
                
                <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                    <Button onPress={this.start}
                        disabled={this.state.stopDisabled}
                        onPress={this.onButtonStart}
                        title="Start"
                        color="#11a029"
                        accessibilityLabel="Start"
                    />
                    <Button
                        disabled={this.state.stopDisabled}
                        onPress={this.onButtonStop}
                        title="Stop"
                        color="#ff0000"
                        accessibilityLabel="Stop"
                    />
                    <Button
                        disabled={this.state.startDisabled}
                        onPress={this.onButtonClear}
                        title="Clear"
                        color="#ff0000"
                        accessibilityLabel="Clear"
                    />
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
  counter: {
      fontSize: 30,
      textAlign: 'center',
      height: 40,
      margin: 10,
  },
  miniCounter: {
      fontSize:20,
      position: 'relative',
      bottom:-27,
      left: -10
  }
})

// <Text style={styles.miniCounter}>{this.state.miliseconds}</Text>
