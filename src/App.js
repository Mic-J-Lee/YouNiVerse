import React, { Component } from 'react'
import { Dimensions, Platform, StyleSheet, Text, View } from 'react-native'
import { GameSchema, UserSchema } from './realm/Schema'
import RainbowCard from './components/RainbowCard/RainbowCard'
import { nextColor, //delete
setOrientation } from './realm/Revolutions'
const Realm = require('realm')

type Props = {}
export default class App extends Component<Props> {

  state = {realm: null}
  
  constructor() {
    super()
    Realm.open({
deleteRealmIfMigrationNeeded: true, /////////////MUST REMOVE THIS LINE IN PRODUCTION!!!!!!!!!
      schema: [ UserSchema, GameSchema ]
    }).then(realm => {
      realm.write(() => {
        !realm.objects('Game')[0] && realm.create('Game', {})
        // users = realm.objects('User')
        // for (let user of users) realm.delete(user)
      })
      this.setState({ realm })
      realm.addListener('change', () => {
        this.setState({ realm })
      })
      setOrientation(realm)
      nextColor(realm) //delete
    })
    Dimensions.addEventListener('change', () => {
      let realm = this.state.realm
      setOrientation(realm)
    })
  }

  render() {
    const { realm } = this.state
    const orientation = realm && realm.objects('Game')[0].orientation
    return (
      <View style={{flex: 1, flexDirection: orientation == 'landscape' ? 'row' : 'column'}}>
        <View style={{
            flex: 13,
            flexDirection: orientation == 'landscape' ? 'row' : 'column',
            backgroundColor: 'powderblue'
          }}>
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
