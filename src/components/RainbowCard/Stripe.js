import React, { Component } from 'react'
import { Alert, Animated, PanResponder, View } from 'react-native'
import { getRainbow, toggleStripe, setActiveColor } from '../../realm/revolutions/rainbowCardRevolutions'

export default class Stripe extends Component {

  state = {
    touched: false
  }

  componentWillMount() {
    this.panResponder = PanResponder.create({
      onMoveShouldSetPanResponder:(evt, gestureState) => true,
      onPanResponderMove: (evt, gestureState) => {
        this.setState({touched:true})
        //should set some sort of visual feedback
      },
      onPanResponderRelease: (evt, gestureState) => {
        const { color, isActive, isEnabled, realm } = this.props
        const orientation = realm && realm.objects('App')[0].orientation
        const dyOrDx = orientation == 'portrait' ? 'dy' : 'dx'
        const sideToSide = dyOrDx == 'dx' ? 'dy' : 'dx'
        if (gestureState[dyOrDx] > 30 && isEnabled) {
          setActiveColor(realm, color)
        } else if (gestureState[sideToSide] < 30 && gestureState[sideToSide] > -30 && !isActive) toggleStripe(realm, color)
        this.setState({touched:false})
      }
    })
  }

  render() {
    const { realm, displayedColor, isActive, isEnabled } = this.props
    const orientation = realm && realm.objects('App')[0].orientation
    const isPortrait = orientation == 'portrait'
    const shrunkSize = isEnabled ? '80%' : '70%'
    return (
      <View style={{
        flex: 1,
        flexDirection: isPortrait ? 'row' : 'column', backgroundColor: displayedColor,
        width: !isPortrait && isActive ? '100%' : shrunkSize,
        height: isPortrait && isActive ? '100%' : shrunkSize
        }} {...this.panResponder.panHandlers}>
      </View>
    )
  }
}
