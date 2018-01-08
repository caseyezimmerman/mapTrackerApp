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
      <Text>{this.props.results.data.minutes}</Text>
      <Text>{this.props.results.data.seconds}</Text>
    </View>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
	return {
		results: state.map
	};
}



export default connect(mapStateToProps)(Results);

// export default Results


