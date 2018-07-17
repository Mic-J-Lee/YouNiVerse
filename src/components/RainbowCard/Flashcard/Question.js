import React, { Component } from 'react'
import { Alert, Platform, View } from 'react-native'
import MediaButton from './MediaButton'

export default class Question extends Component {

  render() {
    const { realm } = this.props
    const question = () => {
      if (!realm) return
      const RainbowCard = realm.objects('RainbowCard')[0]
      const activeColor = RainbowCard.activeColor
      if (RainbowCard[activeColor + 'Mode'].split(' -> ')[0] != 'audio') {
        return (
          <MediaButton
            disabled={true}
            picture={realm && realm.objects('RainbowCard')[0].correctCard[RainbowCard[activeColor + 'Mode'].split(' -> ')[0]]}
            style='bigSquare'
          />
        )
      } else {
        return (
          <View style={{backgroundColor: this.state.playing ? 'black' : null}}>
            <MediaButton
              audioFilename={realm.objects('App')[0].language + '_' + realm.objects('RainbowCard')[0].correctCard.audio + '.mp3'}
              disabled={realm.objects('App')[0].status != 'ready'}
              picture={'hong_kong_flag'}
              style='bigCircle'
            />
          </View>
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
