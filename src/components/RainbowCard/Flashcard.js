import React, { Component } from 'react'
import { View, Text } from 'react-native'
import Rainbow from './Rainbow'

export default class RainbowCard extends Component {

  render() {
    const { realm } = this.props
    const orientation = realm && realm.objects('App')[0].orientation
    const isPortrait = orientation == 'portrait'
    return (
      <View style={{flex: 1, flexDirection: isPortrait ? 'column' : 'row'}}>
       
        <View style={{flex: 4}} >
        </View>
        <View style={{flex: 5}} >
          <Text>{realm && realm.objects('RainbowCard')[0].correctCard.audio}</Text>
        </View>

      </View>
    )
  }
}
