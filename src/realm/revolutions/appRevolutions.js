import { Dimensions } from 'react-native'

export const institute = (realm) => {
  if (!realm) return
  realm.write(() => {
    !realm.objects('App')[0] && realm.create('App', {})
    !realm.objects('RainbowCard')[0] && realm.create('RainbowCard', {})
    // users = realm.objects('User')
    // for (let user of users) realm.delete(user)
  })
  setOrientation(realm)
  Dimensions.addEventListener('change', () => {
    setOrientation(realm)
  })
}

export const setOrientation = (realm) => {
  if (!realm) return
  const dimensions = Dimensions.get('screen')
  const orientation = dimensions.height < dimensions.width ? 'landscape' : 'portrait'
  realm.write(() => {
    realm.objects('App')[0].screenHeight = dimensions.height
    realm.objects('App')[0].screenWidth = dimensions.width
    realm.objects('App')[0].orientation = orientation
  })
}
