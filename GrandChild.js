import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View
} from 'react-native';

export default class GrandChild extends Component {
  render() {
    const { color } = this.props
    return (
      <View style={{backgroundColor: color ? 'blue' : 'red', flex: 1}}>

      </View>
    );
  }
}
