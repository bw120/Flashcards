import React, { Component } from 'react'
import { View, StatusBar } from 'react-native';
import { Constants } from 'expo'

export default class FlashCardStatusBar extends Component {
    render() {
        return (
            <View style={{ backgroundColor: "#ff5104", height: Constants.statusBarHeight }}>
		  <StatusBar 
			  translucent 
			  backgroundColor="#ff5104"
			  barStyle="light-content"
		   />
	    </View>
        )
    }
};