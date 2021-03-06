import React, { Component } from 'react'
import { Animated, Dimensions, View } from 'react-native'
import Question from './Question'
import { choices } from './choices'

export default class FlashCard extends Component {

  componentWillMount() {
    this.XY = new Animated.ValueXY()
  }

  componentDidUpdate() {
    const { realm } = this.props
    realm.objects('RainbowCard')[0].status == 'flashcard entering from top' && this.enterScreen()
  }

  enterScreen() {
    const { realm } = this.props
    realm.write(()=>{
      realm.objects('RainbowCard')[0].status = 'done entering'
    })
    const dimensions = Dimensions.get('screen')
    this.XY.setValue({ x: 0, y: -dimensions.height})
    Animated.spring(
      this.XY,
      {
        toValue: {x: 0, y: 0},
        useNativeDriver: true,
        speed: 20,
      }
    ).start(()=>{this.XY.setValue({ x: 0, y: 0})})
  }

  render() {
    const { realm } = this.props
    const orientation = realm && realm.objects('App')[0].orientation
    const isPortrait = orientation == 'portrait'
    return (
      <Animated.View pointerEvents='box-none' style={{
        flex: 1,
        flexDirection: isPortrait ? 'column' : 'row',
        transform: this.XY.getTranslateTransform()}}>
        <View pointerEvents='box-none' style={{flex: 4}}>
          <Question realm={realm}/>
        </View>
        <View pointerEvents='box-none' style={{flex: 5}}>
          {choices(realm)}
        </View>
      </Animated.View>
    )
  }
}
