import React, { Component } from 'react'
import { ScrollView, Image, Text, View, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import FadeImage from 'react-native-fade-image'
import Ionicons from 'react-native-vector-icons/Ionicons';
import ProgressCircle from 'react-native-progress-circle'

class Results extends Component{
  render(){
  	if( this.props.results.data === undefined){
  		this.props.results.data = ""
  	}
  	// var distance = (this.props.results.data.distance).toFixed(2)
  	// console.log(distance)
  	// }else if(this.props.results.data.seconds === undefined){
  	// 	this.props.results.data.seconds = ""
  	// }
  	if(this.props.results.data.minutes === undefined){
  		var minutes = '00'
  	}else {
  		minutes = this.props.results.data.minutes
  	}
  	
  	if(this.props.results.data.seconds === undefined){
  		var seconds = '00'
  	}else{
  		seconds = this.props.results.data.seconds
  	}

  	if(this.props.results.data.distance != undefined){
  	var distance = (this.props.results.data.distance).toFixed(2)
  	console.log(distance)
  	}
  	var calories = ((this.props.results.data.distance)*100).toFixed(2)
  	var percent = (distance)*100
  	console.log(percent)
    return (
    <ScrollView style={{backgroundColor:'#337ab2'}}>
    	<View>
	    	<ProgressCircle
	            percent={percent}
	            radius={120}
	            borderWidth={10}
	            color="#eb8124"
	            shadowColor="lightgrey"
	            bgColor="white"
	            // containerStyle={{backgroundColor:'red', position:'absolute', left:30}}
	        /> 
        </View>
        <Text style={styles.miles}>{distance} miles</Text>
		<Ionicons
            name={'md-alarm'}
            size={45}
            style={styles.timeIcon}
        ></Ionicons>
        <Ionicons
            name={'ios-flame'}
            size={45}
            style={styles.calIcon}
        ></Ionicons>
    	<Text style={styles.time}>{minutes}:{seconds}</Text>
    	<Text style={styles.cal}>{calories}</Text>
    </ScrollView>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
	return {
		results: state.map
	};
}

const styles = StyleSheet.create({
	cal:{
		// flex:1,
		textAlign:'center',
		fontSize:30,
		marginTop:50,
		position:'absolute',
		top:450,
		right:70
	},
	image:{
		marginLeft:45,
		marginTop:200,
	},
	progress:{
		flex:1,
		backgroundColor:'red',
		height:0
		// justifyContent:'center'
	},
	miles:{
		fontSize:35,
		position:'absolute',
		left:100,
		top:300,
		backgroundColor:'transparent'
	},
	timeIcon:{
		position:'absolute',
		top:440,
		left:90
	},
	time:{
		textAlign:'center',
		fontSize:30,
		marginTop:50,
		position:'absolute',
		top:450,
		left:70
	},
	calIcon:{
		position:'absolute',
		top:440,
		right:100
	}

})


export default connect(mapStateToProps)(Results);

// export default Results


