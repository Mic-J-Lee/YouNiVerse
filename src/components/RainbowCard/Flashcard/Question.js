import React, { Component } from 'react'
import { Alert, View } from 'react-native'
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
            image={realm && realm.objects('RainbowCard')[0].correctCard[RainbowCard[activeColor + 'Mode'].split(' -> ')[0]]}
            style='bigSquare'
          />
        )
      } else {
        return (
          <View>
            <MediaButton
              audioFilename={realm.objects('User')[0].language + '_' + realm.objects('RainbowCard')[0].correctCard.audio + '.mp3'}
              disabled={realm.objects('RainbowCard')[0].status != 'ready'}
              image={'hong_kong_flag'}
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
