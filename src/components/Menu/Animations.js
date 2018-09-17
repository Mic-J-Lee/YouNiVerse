import React, { Component } from "react"
import { Dimensions, Text, View } from "react-native"
import OnOffSwitch from "./OnOffSwitch"
import { toggleAnimations } from "../../realm/revolutions/appRevolutions"

export default class Animations extends Component {

  onPress = () => {
    const { realm } = this.props
    toggleAnimations(realm)
  }

  render() {
    const { realm } = this.props
    const dimensions = Dimensions.get("screen")

    return (
    	<View style={{
        width: dimensions.width * .85,
        height: dimensions.height * .08,
        marginBottom: 15,
        flexDirection: "row"}}>
        <Text style={{
          flex: 3,
          color: "white",
          fontSize: 25,
          alignSelf: "center"}}> Animations: </Text>
        <OnOffSwitch
          onPress={this.onPress}
          status={realm.objects("App")[0].animations} />
    	</View>
    )
  }
}
