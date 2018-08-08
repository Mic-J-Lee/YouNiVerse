import React, { Component } from 'react'
import { Dimensions, Text, View } from 'react-native'

export default class Menu extends Component {
  render() {
    let dimensions = Dimensions.get('screen')
    return (
      <View style={{
        alignItems: 'center',
        justifyContent: 'center',
        height: dimensions.height,
        position: 'absolute',
        width: dimensions.width
      }} >
        <View style={{
          alignItems: 'center',
          backgroundColor: 'black',
          borderRadius: 18,
          height: dimensions.height - 30,
          opacity: .93,
          width: dimensions.width - 10 }}>
          <Text style={{color: 'white', fontSize: 30}} >Menu</Text>
        </View>
      </View>
    )
  }
}
