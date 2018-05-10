import React, { Component } from 'react'
import { Platform, Text, View } from 'react-native'
import RainbowCard from './components/RainbowCard/RainbowCard'
import { nextColor } from './realm/revolutions/rainbowCardRevolutions' //delete
import { establish, loadSchema, setOrientation } from './realm/revolutions/appRevolutions'
const Realm = require('realm')

type Props = {}
export default class App extends Component<Props> {

  state = {realm: null}
  
  constructor() {
    super()
    loadSchema(Realm).then(realm => {
      establish(realm)
      realm.addListener('change', () => {
        this.setState({ realm })
      })
      this.setState({ realm })
      // nextColor(realm) //delete
    })
  }

  render() {
    const { realm } = this.state
    const orientation = realm && realm.objects('App')[0].orientation
    return (
      <View style={{flex: 1, flexDirection: orientation == 'landscape' ? 'row' : 'column'}}>
        <View style={{
            flex: 12,
            flexDirection: orientation == 'landscape' ? 'row' : 'column',
            backgroundColor: 'powderblue'}}>
          {/* <Clouds /> */}
          <RainbowCard realm={realm} />
          {/* {this.state.menu && menu} */}
          {/* {ivan} */}
        </View>
        <View style={{flex: 1, backgroundColor: 'pink'}} />
      </View>
    )
  }
}
