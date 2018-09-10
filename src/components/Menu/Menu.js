import React, { Component } from 'react'
import { Dimensions, ScrollView, Text, View } from 'react-native'
import Animations from './Animations'

export default class Menu extends Component {
  render() {
    const dimensions = Dimensions.get('screen')
    const { realm } = this.props
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
          height: dimensions.height * .95,
          opacity: .93,
          padding: 10,
          width: dimensions.width * .95 }}>
          <Text style={{color: 'white', fontSize: 30, fontWeight: 'bold'}}> Menu </Text>
          <ScrollView>
            <Animations realm={realm}/>
          </ScrollView>
        </View>
      </View>
    )
  }
}
