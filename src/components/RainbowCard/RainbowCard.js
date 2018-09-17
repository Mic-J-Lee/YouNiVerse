import React, { Component } from "react"
import { View, Text } from "react-native"
import Rainbow from "./Rainbow/Rainbow"
import Flashcard from "./Flashcard/Flashcard"

export default class RainbowCard extends Component {

  render() {
    const { realm } = this.props
    const orientation = realm && realm.objects("App")[0].orientation
    const isPortrait = orientation == "portrait"
    return (
      <View style={{flex: 1, flexDirection: isPortrait ? "column" : "row"}}>
        <View style={{flex: 2, flexDirection: isPortrait ? "row" : "column"}}>
          <View style={{flex: 1}} />
          <View style={{flex: 6}}>
            <Rainbow realm={realm} />
          </View>
          <View style={{flex: 1}} />
        </View>
        <View style={{flex: 16, flexDirection: isPortrait ? "column" : "row"}}>
          <Flashcard realm={realm} />
        </View>
      </View>
    )
  }
}
