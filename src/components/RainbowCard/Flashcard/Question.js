import React, { Component } from 'react'
import { Alert, Platform, View } from 'react-native'
import MediaButton from './MediaButton'
import Sound from 'react-native-sound'

export default class Question extends Component {

  state = {playing: false}

  constructor() {
    super()
  }

  loadSound(language = 'cantonese') {
    const { realm } = this.props
    if (!realm) return
    const sound = realm && realm.objects('RainbowCard')[0].correctCard.audio
    const fileName = language + '_' + sound + '.mp3'
    if (this.whoosh) this.whoosh.release()
    this.whoosh = new Sound(
      fileName,
      Sound.MAIN_BUNDLE,
      (error) => {
        if (error) {
          console.log('failed to load ' + fileName, error)
          return
        }
        console.log('loaded ' + fileName + ', seconds: ' + this.whoosh.getDuration() + ', channels:' + this.whoosh.getNumberOfChannels())
      }
    )
    // setTimeout(()=>{this.playSound()}, 1000)  //this is interesting cause it loops in iOS but not Android, why?
  }

  playSound = () => {
    const { realm } = this.props
    if (!realm) return
    const sound = realm.objects('RainbowCard')[0].correctCard.audio
    if (this.whoosh) {
      if (Platform.OS == 'android' && this.whoosh._filename.split('_')[this.whoosh._filename.split('_').length - 1] != sound) {
        console.log(this.whoosh._filename.split('_')[this.whoosh._filename.split('_').length - 1] + ' != ' + sound)
        Alert.alert('Something is wrong with the sound file.')
      } else if (Platform.OS == 'ios' && this.whoosh._filename.split('_')[this.whoosh._filename.split('_').length - 1 - '.mp3'] != sound) {
        console.log(this.whoosh._filename.split('_')[this.whoosh._filename.split('_').length - 1] + ' != ' + sound)
        Alert.alert('Something is wrong with the sound file.')
      } else {
        this.setState({playing: this.whoosh.getDuration()})
      }
      this.whoosh.play((success) => {
        if (success) {
          this.setState({playing: false})
        } else {
          this.whoosh.reset()
          console.log('couldnt play ' + this.whoosh._filename)
        }
      })
    } else {
      console.log('Sound object not found')
    }
  }

  myOnPress = () => {
    this.playSound()
  }

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
            styling='bigSquare'
          />
        )
      } else {
        const sound = realm.objects('RainbowCard')[0].correctCard.audio
        if (!this.whoosh || this.whoosh._filename.split('_')[this.whoosh._filename.split('_').length - 1] != sound) this.loadSound()
        return (
          <View style={{backgroundColor: this.state.playing ? 'black' : null}}>
            <MediaButton
              disabled={realm.objects('App')[0].status != 'ready'}
              onPress={this.myOnPress}
              picture={'hong_kong_flag'}
              styling='bigCircle'
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
