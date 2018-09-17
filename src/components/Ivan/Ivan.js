import React, { Component } from "react"
import { Animated, Dimensions, PanResponder, TouchableWithoutFeedback, View } from "react-native"
import Images from "../../assets/dynamicRequire"
import SpeechBubble from "./SpeechBubble"
import { toggleMenu, togglePause } from "../../realm/revolutions/appRevolutions"


export default class Ivan extends Component {

  state = {
    flyingAround: false,
    menuActive: false,
    ivanSays: false
  }

  componentWillMount() {
    this.ivanPosition = new Animated.ValueXY({x: 20, y : 80})
    this.ivanPositionValue = {x: 20, y: 80}
    this.ivanPositionBeforeMenu = {x: 20, y: 80}
    this.ivanPosition.addListener((value) => this.ivanPositionValue = value)
    this.ivanStartingPosition = {x: 20, y : 80}
    this.panResponder = PanResponder.create({
      onMoveShouldSetPanResponder: (evt, gestureState) => gestureState.dx != 0 && gestureState.dy != 0 && !this.state.menuActive,
      onPanResponderGrant: (e, gestureState) => {
        this.ivanPosition.setOffset({
          x: this.ivanPositionValue.x,
          y: this.ivanPositionValue.y,
        })
        this.ivanPosition.setValue({ x: 0, y: 0})
        this.setState({flyingAround: true})
      },
      onPanResponderMove: Animated.event([
        null, { dx: this.ivanPosition.x, dy: this.ivanPosition.y}
      ]),
      onPanResponderRelease: (e, gestureState) => {
        this.getBackHere = setInterval(()=>this.stayOnScreen(), 1)
        this.ivanPosition.flattenOffset()
        Animated.decay(this.ivanPosition, {
          useNativeDriver: true,
          deceleration: 0.996,
          velocity: { x: gestureState.vx, y: gestureState.vy }
        }).start(()=>{
          this.setState({flyingAround: false})
          clearInterval(this.getBackHere)
        })
      },
    })
  }

  componentDidUpdate() {
    const { realm } = this.props
    realm.objects("App")[0].menu ? this.ivanPosition.setValue({x: 0, y: 0}) : this.stayOnScreen()
  }

  ivanPress = () => {
    const { realm } = this.props
    if (!realm) return
    toggleMenu(realm)
    if (realm.objects("App")[0].menu) {
      this.ivanPositionBeforeMenu = this.ivanPositionValue
      this.ivanPosition.setValue({x: 0, y: 0})
      this.setState({menuActive: true})
    } else {
      this.ivanPosition.setValue(this.ivanPositionBeforeMenu)
      this.setState({menuActive: false})
    }
  }

  stayOnScreen = () => {
    const dimensions = Dimensions.get("screen")
    if (this.ivanPositionValue.x < -20) this.ivanPosition.x.setValue(-20)
    if (this.ivanPositionValue.y < -20) this.ivanPosition.y.setValue(-20)
    if (this.ivanPositionValue.x > dimensions.width - 50) this.ivanPosition.x.setValue(dimensions.width - 50)
    if (this.ivanPositionValue.y > dimensions.height - 70) this.ivanPosition.y.setValue(dimensions.height - 70)
  }

  render() {
    const { realm } = this.props
    const dimensions = Dimensions.get("screen")
    const shortSide = dimensions.height > dimensions.width ? dimensions.width : dimensions.height
    const longSide = dimensions.height == shortSide ? dimensions.width : dimensions.height
    const wideAspect = longSide/shortSide > 1.7 ? true : false
    return (
      <View 
        pointerEvents="box-none"
        style={{
          height: dimensions.height,
          width: dimensions.width,
          position: "absolute"}} >
        <Animated.View style={{
          height: wideAspect ? shortSide/5 : shortSide/7,
          width: wideAspect ? shortSide/5 : shortSide/7,
          transform: this.ivanPosition.getTranslateTransform(),
        }} {...this.panResponder.panHandlers} >  
          <TouchableWithoutFeedback onPress={this.ivanPress}>
            <Animated.Image
              source={Images.menu_burger}
              style={{
                height: wideAspect ? shortSide/5 : shortSide/7,
                width: wideAspect ? shortSide/5 : shortSide/7,
                position:"absolute"
              }}
              resizeMode="contain" />
          </TouchableWithoutFeedback>
        </Animated.View>
      </View>
    )
  }
}
