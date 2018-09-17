import React, { Component } from "react"
import { View, Text } from "react-native"

export default class SpeechBubble extends Component {

  render() {
    const { ivanSays, width } = this.props
    return (
      <View style = {{          
          borderColor: "white",
          backgroundColor: "black",
          borderWidth: 1,
          borderRadius: 15 }} >
        <Text style={{
          color: "white",
          alignSelf: "flex-start",
          padding: 5,
          maxWidth: width/2 - 10,
          fontSize: 20
          }} >{ivanSays}</Text>
      </View>
    )
  }
}
