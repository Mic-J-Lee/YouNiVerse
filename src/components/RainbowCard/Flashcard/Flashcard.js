import React, { Component } from 'react'
import { View } from 'react-native'
import Question from './Question'
// import Choice from './Choice'

export default class FlashCard extends Component {

  render() {
    const { realm } = this.props
    const orientation = realm && realm.objects('App')[0].orientation
    const isPortrait = orientation == 'portrait'
    // const choices = () => {
    //   if (!realm) return
    //   let output = []
    //   const cards = realm.objects('RainbowCard')[0].cards
    //   for (card of cards) {
    //     output.push(
    //       <Choice
    //         key={card.name + card.audio}
    //       />
    //     )
    //   }
    //   return output
    // }
    return (
      <View style={{flex: 1, flexDirection: isPortrait ? 'column' : 'row'}}>
        <View style={{flex: 4}}>
          <Question realm={realm}/>
        </View>
        <View style={{flex: 5}}>

        </View>
      </View>
    )
  }
}
