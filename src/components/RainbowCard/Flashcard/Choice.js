import React, { Component } from 'react'
import { Alert, View } from 'react-native'
import MediaButton from './MediaButton'

export default class Choice extends Component {

  render() {
    const { audioFilename, image, realm } = this.props
    const choice = () => {
      if (!realm) return
      const RainbowCard = realm.objects('RainbowCard')[0]
      const activeColor = RainbowCard.activeColor
      if (RainbowCard[activeColor + 'Mode'].split(' -> ')[1] != 'audio') {
        return (
          <MediaButton
            disabled={true}
            image={image}
            style='smallSquare'
          />
        )
      } else {
        return (
          <View>
            <MediaButton
              audioFilename={audioFilename}
              disabled={realm.objects('App')[0].status != 'ready'}
              image={'hong_kong_flag'}
              style='smallCircle'
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
        {choice()}
      </View>
    )
  }
}
