import React from 'react'
import { StyleSheet, View } from 'react-native'
import Choice from './Choice'

export const choices = (realm) => {
  if (!realm) return
  const isPortrait = realm.objects('App')[0].orientation == 'portrait'
  let choicesArray = []
  const cards = realm.objects('RainbowCard')[0].cards
  const RainbowCard = realm.objects('RainbowCard')[0]
  const activeColor = RainbowCard.activeColor
  for (let i = 0; i < cards.length; i++) {
    let audioFilename = realm.objects('User')[0].language + '_' + cards[i].audio + '.mp3'
    choicesArray.push(
      <Choice
        audioFilename={audioFilename}
        image={cards[i][RainbowCard[activeColor + 'Mode'].split(' -> ')[1]]}
        key={cards[i].name + cards[i].audio}
        name={cards[i].name}
        realm={realm}
      />
    )
  }
  return (
    <View pointerEvents='box-none' style={{flex: 5, flexDirection: isPortrait ? 'column' : 'row'}}>
      <View pointerEvents='box-none' style={{flex: 1, flexDirection: isPortrait ? 'row' : 'column'}}>
        <View pointerEvents='box-none' style={styles.choiceFlexBox}>
          {choicesArray[1]}
        </View>
        <View pointerEvents='box-none' style={styles.choiceFlexBox}>
          {choicesArray[3]}
        </View>
        <View pointerEvents='box-none' style={styles.choiceFlexBox}>
          {choicesArray[5]}
        </View>
      </View>
      <View pointerEvents='box-none' style={{flex: 1, flexDirection: isPortrait ? 'row' : 'column'}}>
        <View pointerEvents='box-none' style={styles.choiceFlexBox}>
          {choicesArray[0]}
        </View>
        <View pointerEvents='box-none' style={styles.choiceFlexBox}>
          {choicesArray[2]}
        </View>
        <View pointerEvents='box-none' style={styles.choiceFlexBox}>
          {choicesArray[4]}
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
