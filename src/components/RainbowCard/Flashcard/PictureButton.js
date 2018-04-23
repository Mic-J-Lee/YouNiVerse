import React, { Component } from 'react'
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native'
import Images from '../../../assets/dynamicRequire'

export default class PictureButton extends Component {

  render() {
    const { disabled, onPress, picture, style, wrong } = this.props
    return (
      <TouchableOpacity
        style={styles[style]}
        onPress={onPress}
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
  question: {
    width: 200,
    height: 200,
    borderRadius: 25,
  },
  choice: {
    width: 110,
    height: 110,
    borderRadius: 25,
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
