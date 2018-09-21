import React, { Component } from "react"
import { Animated, Easing, View } from "react-native"
import MediaButton from "./MediaButton"

export default class Question extends Component {

  componentWillMount() {
    this.XY = new Animated.ValueXY()
  }

  componentDidUpdate() {
    const { realm } = this.props
    realm.objects("RainbowCard")[0].status === "right choice and answer exiting together" && this.exitLeft()
    realm.objects("RainbowCard")[0].status === "ready" && this.XY.setValue({ x: 0, y: 0})
  }

  exitLeft() {
    this.XY.setValue({ x: 0, y: 0})
    Animated.timing(
      this.XY,
      {
       toValue: {x: -1000, y: 0},
       useNativeDriver: true,
       duration: 500,
       easing: Easing.cubic
      }
    ).start()
  }

  render() {
    const { realm } = this.props
    const question = () => {
      if (!realm) return
      const RainbowCard = realm.objects("RainbowCard")[0]
      const activeColor = RainbowCard.activeColor
      if (RainbowCard[activeColor + "Mode"].split(" -> ")[0] != "audio") {
        return (
          <Animated.View style={{transform: this.XY.getTranslateTransform()}} >
            <MediaButton
              disabled={true}
              image={realm && realm.objects("RainbowCard")[0].correctCard[RainbowCard[activeColor + "Mode"].split(" -> ")[0]]}
              style="bigSquare"
            />
          </Animated.View>
        )
      } else {
        return (
          <Animated.View style={{transform: this.XY.getTranslateTransform()}} >
            <MediaButton
              audioFilename={realm.objects("User")[0].language + "_" + realm.objects("RainbowCard")[0].correctCard.audio + ".mp3"}
              disabled={realm.objects("RainbowCard")[0].status != "ready"}
              image={"hong_kong_flag"}
              style="bigCircle"
            />
          </Animated.View>
        )
      }
    }
    return (
      <View pointerEvents="box-none" style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center"}} >
        {question()}
      </View>
    )
  }
}
