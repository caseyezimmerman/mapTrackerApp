import React, { Component } from 'react'
import { Text, View, StyleSheet } from 'react-native'
import { connect } from 'react-redux'



class Results extends Component{
  render(){
  	if( this.props.results.data === undefined){
  		this.props.results.data = ""
  	}
  	// }else if(this.props.results.data.seconds === undefined){
  	// 	this.props.results.data.seconds = ""
  	// }
  	
    return (
    <View>
      <Text style={styles.time}>{this.props.results.data.minutes}:{this.props.results.data.seconds}</Text>
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
	time:{
		// flex:1,
		textAlign:'center',
		fontSize:40,
		marginTop:200
	}
})


export default connect(mapStateToProps)(Results);

// export default Results


