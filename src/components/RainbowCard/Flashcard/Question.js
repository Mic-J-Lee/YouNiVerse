import React, { Component } from 'react'
import { View } from 'react-native'
import PictureButton from './PictureButton'
import AudioButton from './AudioButton'

export default class Question extends Component {

  onPress = () => {
    console.log('poop!')
  }

  render() {
    const { realm } = this.props

    const question = () => {
      if (!realm) return
      const RainbowCard = realm.objects('RainbowCard')[0]
      const activeColor = RainbowCard.activeColor
      if (RainbowCard[activeColor + 'Mode'].split(' -> ')[0] != 'audio') {
        return (
          <PictureButton
            disabled={true}
            onPress={this.onPress}
            picture={realm && realm.objects('RainbowCard')[0].correctCard.image}
            style='question'
          />
        )
      } else {
        return (
          <AudioButton
            disabled={realm.objects('App')[0].status != 'ready'}
            onPress={this.onPress}
            sound={realm && realm.objects('RainbowCard')[0].correctCard.audio}
            style='question'
          />
        )
      }
    }
    return (
      <View style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'}} >
        {question()}
      </View>
    )
  }
}
