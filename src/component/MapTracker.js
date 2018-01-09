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
  Image,
  Button,
  TouchableOpacity
} from 'react-native'
import MapView from 'react-native-maps'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import haversine from 'haversine'
import pick from 'lodash/pick'
import MapAction from '../actions/MapAction'

const { width, height } = Dimensions.get('window')

class MapTracker extends Component {
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
    this.timerStop = this.timerStop.bind(this)
  }

  componentDidMount() {
      navigator.geolocation.getCurrentPosition(
      (position) => {},
      (error) => alert(error.message),
      {enableHighAccuracy: true, timeout: 100, maximumAge: 0}
    )
    this.watchID = navigator.geolocation.watchPosition((position) => {
      // console.log(position)
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
  //   // StatusBarIOS.setStyle('light-content')
  //   navigator.geolocation.getCurrentPosition(
  //     (position) => {
  //       console.log(position)
  //       const { routeCoordinates } = this.state
  //       const newLatLngs = {latitude: position.coords.latitude, longitude: position.coords.longitude }
  //       const positionLatLngs = pick(position.coords, ['latitude', 'longitude'])
  //       this.setState({
  //         routeCoordinates: routeCoordinates.concat(positionLatLngs),
  //         distanceTravelled: distanceTravelled + this.calcDistance(newLatLngs),
  //         prevLatLng: newLatLngs,
  //         currentLatLng: position.coords
  //       })
  //     },
  //     (error) => alert(error.message),
  //     {enableHighAccuracy: true, timeout: 1000, maximumAge: 10000000000000}
  //   )
  // //   // this.watchID = navigator.geolocation.watchPosition((position) => {

  //   // });

  //   //   componentWillUnmount() {
  //   //     clearInterval(this.state.timer);
  //   }
 
 
 
    start() {
        var self = this;
        let timer = setInterval(() => {
            var num = (Number(this.state.miliseconds) + 1).toString(),
                count = this.state.counter;
            // console.log(num)
            if( Number(this.state.miliseconds) == 50 ) {
                count = (Number(this.state.counter) + 1).toString();
                num = '00';
            }
            var min = this.state.minutes;
            if( Number(this.state.counter) == 60 ) {
                min = (Number(this.state.minutes) + 1).toString();
                num = '00';
                count = '00';
            }
            // console.log(min)
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
        console.log(this.state.counter)
        console.log(this.state.minutes)
        
    }

    timerStop(e, navigator){
      e.preventDefault()
      clearInterval(this.state.timer);
      this.setState({startDisabled: false, stopDisabled: true});
      var timerSeconds = this.state.counter
      var timerMinutes = this.state.minutes
      var distance = this.state.distanceTravelled
      this.props.onMap(timerSeconds,timerMinutes,distance, navigator)

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
      // console.log(position)
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
    // console.log(this.state.currentLatLng)
    if (this.state.currentLatLng.latitude === undefined){
      this.state.currentLatLng.latitude = 0;
    }
    if (this.state.currentLatLng.longitude === undefined){
      this.state.currentLatLng.longitude = 0;
    }
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
          mapType='standard'
          showsUserLocation={true}
          followUserLocation={false}
          overlays={[{
            coordinates: this.state.routeCoordinates,
            strokeColor: '#19B5FE',
            lineWidth: 10,
          }]}
          />
        
        <View style={styles.navBar}><Image style={styles.image} source={require('../../images/shoe3.png')} /></View>
        <View style={styles.bottomBar}>
          <View style={styles.bottomBarGroup}>
    
            
            <Text style={styles.bottomBarContent}></Text>
          </View>
          <Text style={styles.counter}>{this.state.minutes}:{this.state.counter}</Text>
          
                
                <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <TouchableOpacity
                        style={styles.button2}
                        onPress={this.start}
                        disabled={this.state.stopDisabled}
                        onPress={this.onButtonStart}
                        title="Start"
                        color="white"
                        accessibilityLabel="Start"
                        
                    ><Text style={styles.start}>Start</Text>
                </TouchableOpacity>
                <TouchableOpacity
                        style={styles.button}   
                        disabled={this.state.stopDisabled}
                        onPress={(e) => 
                          this.timerStop(e, this.props.navigation)}
                        title="Stop"
                        color="white"
                        accessibilityLabel="Stop"
                        
                    ><Text style={styles.stop}>Stop</Text>
                </TouchableOpacity>
                </View>
        </View>
      </View>
    );
  }
}

function mapStateToProps(){
  return{
    map: state.map
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    onMap: MapAction
  }, dispatch)
}

export default connect(null,mapDispatchToProps)(MapTracker)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  navBar: {
    backgroundColor: '#337ab2',
    height: 100,
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
    backgroundColor: '#337ab2',
    // backgroundColor:'#71afd6',
    width: width,
    padding: 20,
    flexWrap: 'wrap',
    flexDirection: 'row',
    // borderTopWidth:3,
    // borderTopColor:'grey'
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
      position:'absolute',
      fontSize: 45,
      // textAlign: 'center',
      height: 60,
      left:125,
      bottom:18
      // bottom:60
  },
  miniCounter: {
      fontSize:20,
      position: 'relative',
      bottom:-27,
      left: -10
  },
  image: {
    top:-10,
    left: 116
  },
  start:{
    // position:'absolute',
    fontSize:22,
    // left:-290,
    backgroundColor:'#71afd6',
    height:30,
    // marginRight:100
    // backgroundColor:'black'
    textAlign:'center',
    backgroundColor:'transparent',
    color:'white',
    marginTop:15

  },
  stop:{
    fontSize:22,
    // position:'absolute',
    // left:-80,
    backgroundColor:'transparent',
    // height:30,
    textAlign:'center',
    color:'white',
    marginTop:15

  },
  button:{
    height:70,
    width:70,
    borderWidth:6,
    borderColor: 'transparent',
    borderRadius: 50,
    // backgroundColor:'#71afd6',
    // backgroundColor:'#bdd0f5',
    backgroundColor:'#a94c4c',
    position:'absolute',
    left:-80,
    bottom:-5,
    shadowOffset:{  width: 5,  height: 5,  },
    shadowColor: 'black',
    shadowOpacity: 0.5,
  },
  button2:{
    height:70,
    width:70,
    borderWidth:6,
    borderColor: 'transparent',
    borderRadius: 50,
    backgroundColor:'lightgreen',
    position:'absolute',
    left:-330,
    bottom:-5,
    // backgroundColor:'#ed8224',
    shadowOffset:{  width: 5,  height: 5,  },
    shadowColor: 'black',
    shadowOpacity: 0.5,
  }

})

// <Text style={styles.miniCounter}>{this.state.miliseconds}</Text>
