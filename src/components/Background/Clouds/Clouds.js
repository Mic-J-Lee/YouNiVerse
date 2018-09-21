import React, { Component } from "react"
import { View } from "react-native"
import Cloud from "./Cloud"

export default class Clouds extends Component {
 
  render() {
  	const { realm } = this.props
    return (
      <View>
        <Cloud image={"cloud1"} size={120} realm={realm} />
        <Cloud image={"cloud2"} size={130} realm={realm} />
        <Cloud image={"cloud3"} size={230} realm={realm} />
      </View>
    )
  }
}


