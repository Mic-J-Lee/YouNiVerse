import React, { Component } from 'react'
import { Animated, Easing, Dimensions, PanResponder, View } from 'react-native'
import Images from '../../../assets/dynamicRequire'

export default class Cloud extends Component {

  state = {
    travelTime: Math.random() * (90000) + 10000
  }

  componentWillMount() {
    const { realm } = this.props
    if (!realm.objects('App')[0].animations) {
      this.cloudStartingPosition = {x: Dimensions.get('screen').width * Math.random() - 100, y: Dimensions.get('screen').height * Math.random() - 100}
      this.setState({travelTime: 0})
    } else if (realm.objects('App')[0].animations) {
      this.cloudStartingPosition = {x: Dimensions.get('screen').width, y: Dimensions.get('screen').height * Math.random() - 100}
    }
    this.XY = new Animated.ValueXY(this.cloudStartingPosition);
    this.XY.addListener((value) => this._XY = value);
    this.panResponder = PanResponder.create({
      onStartShouldSetPanResponder: (evt, gestureState) => true,
      onMoveShouldSetPanResponder: (evt, gestureState) => true,
      onPanResponderGrant: (e, gestureState) => {
        this.setState({travelTime: Math.abs(this.state.travelTime / 2)})
        this.XY.setOffset({
          x: this._XY.x,
          y: this._XY.y,
        })
        this.XY.setValue({x: 0, y: 0})
      },
      onPanResponderMove: Animated.event([
        null, { dx: this.XY.x, dy: this.XY.y}
      ]),
      onPanResponderRelease: (e, gestureState) => {
        this.XY.flattenOffset();
        Animated.decay(this.XY, {
          useNativeDriver: true,
          deceleration: 0.997,
          velocity: { x: gestureState.vx, y: gestureState.vy }
        }).start(() => this.float(this.state.travelTime));
      },
    })
    this.float()
  }

  componentDidUpdate() {
    const { realm } = this.props
    if (!realm.objects('App')[0].animations && this.state.travelTime != 0) {
      this.XY.setValue({x: Dimensions.get('screen').width * Math.random() - 100, y: Dimensions.get('screen').height * Math.random() - 100})
      this.setState({travelTime: 0})
    } else if (realm.objects('App')[0].animations && this.state.travelTime == 0) {
      this.float()
    }
  }

  float(duration) {
    const { realm } = this.props
    if (!realm.objects('App')[0].animations) return
    Animated.timing(
      this.XY['x'],
      {
        toValue: -Dimensions.get('screen').width,
        useNativeDriver: true,
        duration: duration || this.state.travelTime,
        easing: Easing.linear,
      }
    ).start((o) => {
      if (o.finished) {
        this.setState({travelTime: Math.random() * (100000 - 10000) + 10000})
        this.XY.setValue(this.cloudStartingPosition)
        this.float()
      }
    })
  }


  render() {
    const { image, size } = this.props
    return (
      <Animated.Image {...this.panResponder.panHandlers}
        source={Images[image]}
        style={{
          height: size,
          width: 260,
          position: 'absolute', 
          transform: this.XY.getTranslateTransform()
        }} 
        resizeMode='contain' />
    )
  }
}


