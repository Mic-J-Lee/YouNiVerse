import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View
} from 'react-native';
import GrandChild from './GrandChild'

export default class Child extends Component {
  render() {
    const { color } = this.props
    return (
      <View style={{backgroundColor: color, flex: 1}}>
        <GrandChild color={color} />
      </View>
    );
  }
}
