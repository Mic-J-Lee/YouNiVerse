import React, { Component } from 'react'
import { View } from 'react-native'
import Question from './Question'
import Choice from './Choice'

export default class FlashCard extends Component {

  render() {
    const { realm } = this.props
    const orientation = realm && realm.objects('App')[0].orientation
    const isPortrait = orientation == 'portrait'
    const choices = () => {
      if (!realm) return
      let output = []
      const cards = realm.objects('RainbowCard')[0].cards
      for (let i = 0; i < cards.length; i++) {
        let audioFilename = realm.objects('App')[0].language + '_' + cards[i].audio + '.mp3'
        output.push(
          <Choice
            audioFilename={audioFilename}
            image={cards[i].image}
            key={cards[i].name + cards[i].audio}
            realm={realm}
          />
        )
      }
      for (let i = output.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [output[i], output[j]] = [output[j], output[i]];
      }
      return output
    }
    return (
      <View style={{flex: 1, flexDirection: isPortrait ? 'column' : 'row'}}>
        <View style={{flex: 4}}>
          <Question realm={realm}/>
        </View>
        <View style={{flex: 5}}>
          {choices()}
        </View>
      </View>
    )
  }
}
