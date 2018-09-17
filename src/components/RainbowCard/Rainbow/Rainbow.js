import React, { Component } from "react"
import { View } from "react-native"
import Stripe from "./Stripe"

export default class Rainbow extends Component {

  render() {
    const { realm } = this.props
    const orientation = realm && realm.objects("App")[0].orientation
    const isPortrait = orientation == "portrait"
    let colors = ["red", "orange", "yellow", "green", "blue", "purple"]
    let fadedColors = ["#ff9999", "#ffdb99", "#ffff99", "#99ffa2", "#adadff", "#ffa3ff"]
    if (!isPortrait) {
      colors = colors.reverse()
      fadedColors = fadedColors.reverse()
    }
    let allStripes = []
    for (let i = 0; i < colors.length; i++) {
      let color = colors[i]
      let fadedColor = fadedColors[i]
      let isEnabled = realm && realm.objects("RainbowCard")[0][color]
      allStripes.push(
        <Stripe
          key={color}
          realm={realm}
          color={color}
          displayedColor={isEnabled == true ? color : fadedColor}
          isActive={realm && realm.objects("RainbowCard")[0].activeColor == color}
          isEnabled={isEnabled}
        />
      )
    }
    return (
      <View style={{
        flex: 6,
        flexDirection: isPortrait ? "row" : "column"}}>
        {allStripes}
      </View>
    )
  }
}
