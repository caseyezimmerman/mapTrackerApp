import React, { Component } from 'react'
import { ScrollView, Image, Text, View, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import FadeImage from 'react-native-fade-image'



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
  	if(this.props.results.data.distance != undefined){


  	var distance = (this.props.results.data.distance).toFixed(2)
  	console.log(distance)
  	}
  	var calories = ((this.props.results.data.distance)*100).toFixed(2)
    return (
    <ScrollView style={{backgroundColor: 'lightgrey'}}>
    	<FadeImage
    		style={styles.image}
  			source={require('../../images/success.png')}
  			duration={4000}
		/> 
    	<Text style={styles.time}>{this.props.results.data.minutes}:{this.props.results.data.seconds}</Text>
    	<Text style={styles.time}>{distance} miles</Text>
    	<Text style={styles.time}>{calories} calories</Text>
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
	time:{
		// flex:1,
		textAlign:'center',
		fontSize:40,
		marginTop:50
	},
	image:{
		marginLeft:85,

	}
})


export default connect(mapStateToProps)(Results);

// export default Results


