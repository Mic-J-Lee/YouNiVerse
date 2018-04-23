import React, { Component } from 'react'
import { View } from 'react-native'
import PictureButton from './PictureButton'

export default class Question extends Component {

  onPress = () => {
    console.log('poop!')
  }

  render() {
    const { realm } = this.props
    const style = (realm) => {
      if (!realm) return
      const RainbowCard = realm.objects('RainbowCard')[0]
      // if RainbowCard.
    }
    return (
      <PictureButton
        disabled={true}
        onPress={this.onPress}
        picture={realm && realm.objects('RainbowCard')[0].correctCard.image}
        style='question'
      />
    )
  }
}
