import React, { Component } from 'react'
import { Dimensions, Image, StyleSheet, TouchableOpacity, View } from 'react-native'
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
      }
    )
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
          setTimeout(()=>{this.playSound()}, 100)
        }
      })
    } else {
      console.log('Sound object not found')
    }
  }

  onPress = () => {
    if (this.props.audioFilename) this.playSound()
    this.props.onPress && this.props.onPress()
  }

  render() {
    const dimensions = Dimensions.get('screen')
    const shortSide = dimensions.height > dimensions.width ? dimensions.width : dimensions.height
    const longSide = dimensions.height == shortSide ? dimensions.width : dimensions.height
    const wideAspect = longSide/shortSide > 1.7 ? true : false
    const styles = StyleSheet.create({
      bigSquare: {
        width: wideAspect ? shortSide/2 : shortSide/2.5,
        height: wideAspect ? shortSide/2 : shortSide/2.5,
        borderRadius: 25
      },
      bigCircle: {
        width: wideAspect ? shortSide/2 : shortSide/2.5,
        height: wideAspect ? shortSide/2 : shortSide/2.5,
        borderRadius: 100
      },
      smallSquare: {
        width: wideAspect ? shortSide/3.4 : shortSide/3.8,
        height: wideAspect ? shortSide/3.4 : shortSide/3.8,
        borderRadius: 25
      },
      smallCircle: {
        width: wideAspect ? shortSide/3.4 : shortSide/3.8,
        height: wideAspect ? shortSide/3.4 : shortSide/3.8,
        borderRadius: 100
      },
      redX: {
        width: wideAspect ? shortSide/3.4 : shortSide/3.8,
        height: wideAspect ? shortSide/3.4 : shortSide/3.8,
        position: 'absolute',
        opacity: .75
      }
    })
    const { audioFilename, disabled, image, style, wrong } = this.props
    if (audioFilename && (!this.sound || this.sound._filename != audioFilename)) this.loadSound()
    return (
      <View style={[styles[style],
        {overflow: 'hidden',
        justifyContent: 'center',
        alignItems: 'center'}]} >
        <TouchableOpacity
          style={styles[style]} //WHY DOESNT THIS WORK ARGHHHHHGHGHH
          onPress={this.onPress}
          disabled={disabled || wrong} >
          <Image
            source={{uri: image}}
            style={styles[style]}
          />
          {wrong && <Image
            source={require('./red_x.png')}
            style={styles.redX} />
          }
        </TouchableOpacity>
      </View>
    )
  }
}

