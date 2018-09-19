import React, { Component } from "react"
import { View } from "react-native"
import Stripe from "./Stripe"

export default class Rainbow extends Component {

  render() {
    const { realm } = this.props
    const isPortrait = realm && realm.objects("App")[0].orientation == "portrait"
    let colors = ["red", "orange", "yellow", "green", "blue", "purple"]
    if (!isPortrait) colors = colors.reverse()
    let allStripes = []
    for (let i = 0; i < colors.length; i++) {
      let color = colors[i]
      allStripes.push(
        <Stripe
          key={color}
          realm={realm}
          color={color}
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
