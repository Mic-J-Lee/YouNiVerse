import React, { Component } from 'react'
import { TouchableOpacity } from 'react-native'
import { setActiveColor } from '../../../realm/decrees/RainbowCard'

export default class Stripe extends Component {

  onPress = () => {
    const { color, realm } = this.props
    setActiveColor(realm, color)
  }

  render() {
    const { realm, color } = this.props
    const isActive = realm && realm.objects('RainbowCard')[0].activeColor == color
    const isPortrait = realm && realm.objects('App')[0].orientation == 'portrait'
    return (
      <TouchableOpacity
        onPress={this.onPress}
        style={{
          flex: 1,
          flexDirection: isPortrait ? 'row' : 'column', backgroundColor: color,
          width: !isPortrait && isActive ? '100%' : '80%',
          height: isPortrait && isActive ? '100%' : '80%'
        }}
      />
    )
  }
}
