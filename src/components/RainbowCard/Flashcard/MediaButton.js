import React, { Component } from 'react'
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native'
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions'
import Images from '../../../assets/dynamicRequire'
import Sound from 'react-native-sound'

export default class MediaButton extends Component {

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
    // setTimeout(()=>this.playSound(), 1000)  //this is interesting cause it loops in iOS but not Android, why?
  }

  playSound = () => {
    if (this.sound) {
      this.sound.play((success) => {
        // setPlaying(true)
        if (success) {
          // setPlaying(false)
        } else {
          this.sound.reset()
          console.log('couldnt play ' + this.sound._filename)
        }
      })
    } else {
      console.log('Sound object not found')
    }
  }

  onPress = () => {
    if (this.props.audioFilename) this.playSound()
    this.props.onPress
  }

  render() {
    const { audioFilename, disabled, picture, style, wrong } = this.props
    if (audioFilename && (!this.sound || this.sound._filename != audioFilename)) this.loadSound()
    return (
      <TouchableOpacity
        style={styles[style]}
        onPress={this.onPress}
        disabled={disabled == true} >
        <View style={{
          justifyContent: 'center',
          alignItems: 'center'}} >
          <Image
            source={Images[picture]}
            style={[styles[style]]} />
          {wrong && <Image
            source={require('../../../assets/images/red_x.png')}
            style={styles.redX} />
          }
        </View>
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  bigSquare: {
    width: responsiveWidth(50) > responsiveHeight(50) ? responsiveWidth(30) : responsiveHeight(30),
    height: responsiveWidth(50) > responsiveHeight(50) ? responsiveWidth(30) : responsiveHeight(30),
    borderRadius: 25,
  },
  bigCircle: {
    width: responsiveWidth(50) > responsiveHeight(50) ? responsiveWidth(30) : responsiveHeight(30),
    height: responsiveWidth(50) > responsiveHeight(50) ? responsiveWidth(30) : responsiveHeight(30),
    borderRadius: 100,
  },
  wrongChoice: {
    width: 110,
    height: 110,
    borderRadius: 25,
    opacity: .75,
  },
  redX: {
    width: 120,
    height: 120,
    position: 'absolute',
    opacity: .75,
  }
})
