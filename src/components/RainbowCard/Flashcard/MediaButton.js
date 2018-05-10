import React, { Component } from 'react'
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native'
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions'
import Images from '../../../assets/dynamicRequire'

export default class MediaButton extends Component {

  render() {
    const { disabled, onPress, picture, styling, wrong } = this.props
    return (
      <TouchableOpacity
        style={styles[styling]}
        onPress={onPress}
        disabled={disabled == true} >
        <View style={{
          justifyContent: 'center',
          alignItems: 'center'}} >
          <Image
            source={Images[picture]}
            style={[styles[styling]]} />
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
