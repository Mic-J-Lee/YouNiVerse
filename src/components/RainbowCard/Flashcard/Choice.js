import React, { Component } from 'react'
import { View } from 'react-native'
import MediaButton from './MediaButton'
import { guess } from '../../../realm/revolutions/rainbowCardRevolutions'

export default class Choice extends Component {

  submit = () => {
    const { name, realm } = this.props
    guess(name, realm)
  }

  render() {
    const { audioFilename, image, name, realm } = this.props
    const choice = () => {
      if (!realm) return
      const RainbowCard = realm.objects('RainbowCard')[0]
      const activeColor = RainbowCard.activeColor
      const wrong = (RainbowCard.wrongGuesses.indexOf(name) != -1)
      if (RainbowCard[activeColor + 'Mode'].split(' -> ')[1] != 'audio') {
        return (
          <MediaButton
            disabled={realm.objects('App')[0].status != 'ready'}
            image={image}
            onPress={this.submit}
            style='smallSquare'
            wrong={wrong}
          />
        )
      } else {
        return (
          <MediaButton
            audioFilename={audioFilename}
            disabled={realm.objects('App')[0].status != 'ready'}
            image='hong_kong_flag'
            onPress={this.submit}
            style='smallCircle'
            wrong={wrong}
          />
        )
      }
    }
    return (
      <View style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'}} >
        {choice()}
      </View>
    )
  }
}
