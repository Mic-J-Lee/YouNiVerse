import React from 'react'
import Choice from './Choice'
import { StyleSheet, View } from 'react-native'


export const choices = (realm) => {
  if (!realm) return
  const isPortrait = realm.objects('App')[0].orientation == 'portrait'
  let choicesArray = []
  const cards = realm.objects('RainbowCard')[0].cards
  for (let i = 0; i < cards.length; i++) {
    let audioFilename = realm.objects('App')[0].language + '_' + cards[i].audio + '.mp3'
    choicesArray.push(
      <Choice
        audioFilename={audioFilename}
        image={cards[i].image}
        key={cards[i].name + cards[i].audio}
        realm={realm}
      />
    )
  }
  for (let i = choicesArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [choicesArray[i], choicesArray[j]] = [choicesArray[j], choicesArray[i]];
  }
  return (
    <View style={{flex: 5, flexDirection: isPortrait ? 'column' : 'row'}}>
      <View style={{flex: 1, flexDirection: isPortrait ? 'row' : 'column'}}>
        <View style={styles.choiceFlexBox}>
          {choicesArray[0]}
        </View>
        <View style={styles.choiceFlexBox}>
          {choicesArray[1]}
        </View>
        <View style={styles.choiceFlexBox}>
          {choicesArray[2]}
        </View>
      </View>
      <View style={{flex: 1, flexDirection: isPortrait ? 'row' : 'column'}}>
        <View style={styles.choiceFlexBox}>
          {choicesArray[3]}
        </View>
        <View style={styles.choiceFlexBox}>
          {choicesArray[4]}
        </View>
        <View style={styles.choiceFlexBox}>
          {choicesArray[5]}
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  choiceFlexBox: {
    flex:1, 
    alignItems: 'center', 
    justifyContent: 'center'
  }
})
