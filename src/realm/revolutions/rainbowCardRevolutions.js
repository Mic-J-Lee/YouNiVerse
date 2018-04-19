import { Alert } from 'react-native'

export const nextColor = (realm) => {
  if (!realm) return
  const rainbow = rainbowAbledness(realm)
  const current = colors.indexOf(realm.objects('RainbowCard')[0].activeColor)
  let next = 0
  if (current != 5) next = current + 1
  let nextColorIsFound = false
  while (nextColorIsFound == false) {
    if (rainbow[colors[next]] == true)
      nextColorIsFound = true
    else if (next == 5)
      next = 0
    else
      next++
  }
  realm.write(() => {
    realm.objects('RainbowCard')[0].activeColor = colors[next]
    realm.objects('RainbowCard')[0].correctCard = realm.objects('Card')[Math.floor(Math.random()*realm.objects('Card').length)]
  })
  setTimeout(()=>{nextColor(realm)}, 8000) //delete
}

export const setActiveColor = (realm, color) => {
  if (!realm) return
  if (!realm.objects('RainbowCard')[0][color]) return
  realm.write(() => {
    realm.objects('RainbowCard')[0].activeColor = color
  })
}

export const toggleStripe = (realm, color) => {
  if (!realm) return
  if (realm.objects('RainbowCard')[0].activeColor == color) return
  let rainbow = rainbowAbledness(realm)
  rainbow[color] = !rainbow[color]
  if (!Object.values(rainbow).includes(true)) 
    Alert.alert('You must have at least 1 active color!')
  else realm.write(()=>{
    realm.objects('RainbowCard')[0][color] = !realm.objects('RainbowCard')[0][color]
  })
}

const rainbowAbledness = (realm) => {
  if (!realm) return
  let rainbowAbledness = {}
  for (color of colors) {
    rainbowAbledness[color] = realm.objects('RainbowCard')[0][color]
  }
  return rainbowAbledness
}

const colors = ['red', 'orange', 'yellow', 'green', 'blue', 'purple']
