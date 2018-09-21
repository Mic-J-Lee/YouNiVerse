import React, { Component } from "react"
import { StyleSheet, Text, TouchableOpacity, View } from "react-native"

export default class OnOffSwitch extends Component {
  render() {
  	const style = this.props.status ? "on" : "off"
    return (
    	<TouchableOpacity style={styles[style]} onPress={this.props.onPress}>
    		<Text style={{fontSize: 25, color: "white"}}>{this.props.status ? "On" : "Off"}</Text>
    	</TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  on: {
  	flex: 1,
    backgroundColor: "blue",
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center"
  },
  off: {
  	flex: 1,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center"
  }
})
