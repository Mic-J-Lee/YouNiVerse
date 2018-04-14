import React, { Component } from 'react'
import { View } from 'react-native'
import Rainbow from './Rainbow'

export default class RainbowCard extends Component {

  render() {
    const { realm } = this.props
    const orientation = realm && realm.objects('App')[0].orientation
    const isPortrait = orientation == 'portrait'
    return (
      <View style={{flex: 1, flexDirection: isPortrait ? 'column' : 'row'}}>
        <View style={{flex: 2, flexDirection: isPortrait ? 'row' : 'column'}}>
          <View style={{flex: 1}} />
          <Rainbow realm={realm} style={{flex: 6}} />
          <View style={{flex: 1}} />
        </View>
        <View style={{flex: 16, backgroundColor: 'black'}}>

        </View>
      </View>
    )
  }
}
