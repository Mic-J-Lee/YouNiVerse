import { Alert, Dimensions } from 'react-native'

export const getRainbow = (realm) => {
  if (!realm) return
  let rainbow = {}
  const colors = ['red', 'orange', 'yellow', 'green', 'blue', 'purple']
  for (color of colors) {
    rainbow[color] = realm.objects('Game')[0][color]
  }
  return rainbow
}

export const setActiveColor = (realm, color) => {
  if (!realm) return
  if (realm.objects('Game')[0][color]) return
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
  let rainbow = getRainbow(realm)
  rainbow[color] = !rainbow[color]
  if (!Object.values(rainbow).includes(true)) 
    Alert.alert('You must have at least 1 active color!')
  else realm.write(()=>{
    realm.objects('Game')[0][color] = !realm.objects('Game')[0][color]
  })
}

