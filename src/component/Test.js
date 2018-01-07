import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';

class Test extends Component{
    render(){
        return(
            <View>
                <Text>Test Component</Text>
            </View>
        )
    }
}

// export default Test;
export default connect()(Test);