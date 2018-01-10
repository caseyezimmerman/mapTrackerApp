import React, { Component } from 'react'
import { ScrollView, Image, Text, View, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import FadeImage from 'react-native-fade-image'
import Ionicons from 'react-native-vector-icons/Ionicons';



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
    return (
    <View>
    	<Image
    		style={styles.image}
  			source={require('../../images/progress.png')}
  			duration={4000}
		/> 
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
    	<Text style={styles.miles}>{distance} miles</Text>
    	<Text style={styles.cal}>{calories}</Text>
    </View>
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
		marginTop:70,
	},
	miles:{
		fontSize:40,
		position:'absolute',
		left:100,
		top:170
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


