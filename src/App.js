import React, { Component } from "react"
import { View } from "react-native"
import Background from "./components/Background/Background"
import Ivan from "./components/Ivan/Ivan"
import RainbowCard from "./components/RainbowCard/RainbowCard"
import { establish, loadSchema } from "./realm/decrees/App"
const Realm = require("realm")

// type Props = {}
export default class App extends Component<Props> {

  state = {realm: null}
  
  constructor() {
    super()
    loadSchema(Realm).then(realm => {
      establish(realm)
      realm.addListener("change", () => {
        this.setState({ realm })
      })
      this.setState({ realm })
    })
  }

  render() {
    const { realm } = this.state
    const orientation = realm && realm.objects("App")[0].orientation
    return (
      <View style={{flex: 1, flexDirection: orientation == "landscape" ? "row" : "column"}}>
        <View style={{
            flex: 12,
            flexDirection: orientation == "landscape" ? "row" : "column",
            backgroundColor: "powderblue"}}>
          <Background realm={realm} />
          <RainbowCard realm={realm} />
        </View>
        <View style={{flex: 1, backgroundColor: "pink"}} />
        <Ivan realm={realm} />
      </View>
    )
  }
}
