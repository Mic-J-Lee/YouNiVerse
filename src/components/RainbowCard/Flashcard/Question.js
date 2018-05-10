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
    const audio = realm && realm.objects('RainbowCard')[0].correctCard.audio
    const fileName = language + '_' + audio + '.mp3'
    if (this.sound) this.sound.release()
    this.sound = new Sound(
      fileName,
      Sound.MAIN_BUNDLE,
      (error) => {
        if (error) {
          console.log('failed to load ' + fileName, error)
          return
        }
        console.log('loaded ' + fileName + ', seconds: ' + this.sound.getDuration() + ', channels:' + this.sound.getNumberOfChannels())
      }
    )
    // setTimeout(()=>{this.playSound()}, 1000)  //this is interesting cause it loops in iOS but not Android, why?
  }

  playSound = () => {
    const { realm } = this.props
    if (!realm) return
    const audio = realm.objects('RainbowCard')[0].correctCard.audio
    if (this.sound) {
      if (Platform.OS == 'android' && this.sound._filename.split('_')[this.sound._filename.split('_').length - 1] != audio) {
        console.log(this.sound._filename.split('_')[this.sound._filename.split('_').length - 1] + ' != ' + audio)
        Alert.alert('Something is wrong with the audio file.')
      } else if (Platform.OS == 'ios' && this.sound._filename.split('_')[this.sound._filename.split('_').length - 1 - '.mp3'] != audio) {
        console.log(this.sound._filename.split('_')[this.sound._filename.split('_').length - 1] + ' != ' + audio)
        Alert.alert('Something is wrong with the audio file.')
      } else {
        this.setState({playing: this.sound.getDuration()})
      }
      this.sound.play((success) => {
        if (success) {
          this.setState({playing: false})
        } else {
          this.sound.reset()
          console.log('couldnt play ' + this.sound._filename)
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
        const audio = realm.objects('RainbowCard')[0].correctCard.audio
        if (!this.sound || this.sound._filename.split('_')[this.sound._filename.split('_').length - 1] != audio) this.loadSound()
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
