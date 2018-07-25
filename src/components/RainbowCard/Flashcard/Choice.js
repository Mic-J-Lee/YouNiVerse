import React, { Component } from 'react'
import { View } from 'react-native'
import Sound from 'react-native-sound'
import MediaButton from './MediaButton'
import { guess } from '../../../realm/revolutions/rainbowCardRevolutions'

export default class Choice extends Component {

  loadSound() {
    const { audioFilename } = this.props
    if (this.sound) this.sound.release()
    this.sound = new Sound(
      audioFilename,
      Sound.MAIN_BUNDLE,
      (error) => {
        if (error) {
          console.log('failed to load ' + audioFilename, error)
          return
        }
        console.log('loaded ' + audioFilename + ', seconds: ' + this.sound.getDuration() + ', channels:' + this.sound.getNumberOfChannels())
      }
    )
  }

  playSound = () => {
    const { name, realm } = this.props
    if (!realm) return
    if (this.sound) {
      this.sound.play((success) => {
        if (success) {
          realm.write(()=>{
            realm.objects('RainbowCard')[0].playList.shift()
          })
        } else {
          this.sound.reset()
          console.log('couldnt play ' + this.sound._filename)
        }
      })
    } else {
      console.log('Sound object not found')
    }
  }

  submit = () => {
    const { name, realm } = this.props
    guess(name, realm)
  }

  render() {
    const { audioFilename, image, name, realm } = this.props
    if (audioFilename && (!this.sound || this.sound._filename != audioFilename)) this.loadSound()
    const choice = () => {
      if (!realm) return
      const RainbowCard = realm.objects('RainbowCard')[0]
      const activeColor = RainbowCard.activeColor
      const playList = RainbowCard.playList
      const wrong = (RainbowCard.wrongGuesses.indexOf(name) != -1)
      if (playList.length > 0 && playList[0] == name) {
        setTimeout(()=>{this.playSound()},100)
      }
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
          <View style={playList[0] == name && {backgroundColor: 'black'}}>
            <MediaButton
              disabled={realm.objects('App')[0].status != 'ready'}
              image='hong_kong_flag'
              onPress={this.submit}
              style='smallCircle'
              wrong={wrong}
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
