import React, { Component } from 'react'
import { View } from 'react-native'
import Clouds from './Clouds/Clouds'

export default class Background extends Component {
 
  render() {
  const { realm } = this.props
    return (
      <View>
       { realm && realm.objects('App')[0].background == 'clouds' && <Clouds realm={realm} /> }
      </View>
    )
  }
}
