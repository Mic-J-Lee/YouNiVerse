import React, { Component } from 'react'
import { Animated, Easing, View } from 'react-native'
import Sound from 'react-native-sound'
import MediaButton from './MediaButton'
import { guess } from '../../../realm/revolutions/rainbowCardRevolutions'

export default class Choice extends Component {

  componentWillMount() {
    this.XY = new Animated.ValueXY()
  }

  componentDidUpdate() {
    const { name, realm } = this.props
    realm.objects('RainbowCard')[0].status === 'wrong choices dropping away' &&
      realm.objects('RainbowCard')[0].correctCard.name !== name &&
      setTimeout(()=>this.dropOutOfScreen(), Math.random() * 300)
    realm.objects('RainbowCard')[0].status === 'right choice and answer exiting together' &&
      realm.objects('RainbowCard')[0].correctCard.name == name &&
      this.exitLeft()
    realm.objects('RainbowCard')[0].status === 'ready' && this.XY.setValue({ x: 0, y: 0})
  }

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
          setTimeout(()=>{this.playSound()}, 100)
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

  dropOutOfScreen() {
    this.XY.setValue({ x: 0, y: 0})
    Animated.timing(
      this.XY,
      {
       toValue: {x: 0, y: 800},
       useNativeDriver: true,
       duration: 500,
       easing: Easing.poly(5)
      }
    ).start()
  }

  exitLeft() {
    this.XY.setValue({ x: 0, y: 0})
    Animated.timing(
      this.XY,
      {
       toValue: {x: -1000, y: 0},
       useNativeDriver: true,
       duration: 500,
       easing: Easing.cubic
      }
    ).start()
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
        setTimeout(()=>{this.playSound()}, 100)
      }
      if (RainbowCard[activeColor + 'Mode'].split(' -> ')[1] != 'audio') {
        return (
          <Animated.View style={{transform: this.XY.getTranslateTransform()}} >
            <MediaButton
              disabled={realm.objects('RainbowCard')[0].status != 'ready'}
              image={image}
              onPress={this.submit}
              style='smallSquare'
              wrong={wrong}
            />
          </Animated.View>
        )
      } else {
        return (
          <Animated.View style={{transform: this.XY.getTranslateTransform()}} >
            <View style={!realm.objects('App')[0].animations && playList[0] == name && {backgroundColor: 'black'}}>
              <MediaButton
                disabled={realm.objects('RainbowCard')[0].status != 'ready'}
                image='hong_kong_flag'
                onPress={this.submit}
                style='smallCircle'
                wrong={wrong}
              />
            </View>
          </Animated.View>
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
