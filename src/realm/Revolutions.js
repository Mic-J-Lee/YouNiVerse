import { Alert, Dimensions } from 'react-native'

export const getRainbow = (realm) => {
  if (!realm) return
  let rainbow = {}
  for (color of colors) {
    rainbow[color] = realm.objects('Game')[0][color]
  }
  return rainbow
}

export const nextColor = (realm) => {
  if (!realm) return
  const rainbow = getRainbow(realm)
  const current = colors.indexOf(realm.objects('Game')[0].activeColor)
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
    realm.objects('Game')[0].activeColor = colors[next]
  })
  setTimeout(()=>{nextColor(realm)}, 1000) //delete
}

export const setActiveColor = (realm, color) => {
  if (!realm) return
  if (!realm.objects('Game')[0][color]) return
  realm.write(() => {
    realm.objects('Game')[0].activeColor = color
  })
}

export const setOrientation = (realm) => {
  if (!realm) return
  const dimensions = Dimensions.get('screen')
  const orientation = dimensions.height < dimensions.width ? 'landscape' : 'portrait'
  realm.write(() => {
    realm.objects('Game')[0].screenHeight = dimensions.height
    realm.objects('Game')[0].screenWidth = dimensions.width
    realm.objects('Game')[0].orientation = orientation
  })
}

export const toggleStripe = (realm, color) => {
  if (!realm) return
  if (realm.objects('Game')[0].activeColor == color) return
  let rainbow = getRainbow(realm)
  rainbow[color] = !rainbow[color]
  if (!Object.values(rainbow).includes(true)) 
    Alert.alert('You must have at least 1 active color!')
  else realm.write(()=>{
    realm.objects('Game')[0][color] = !realm.objects('Game')[0][color]
  })
}

const colors = ['red', 'orange', 'yellow', 'green', 'blue', 'purple']
