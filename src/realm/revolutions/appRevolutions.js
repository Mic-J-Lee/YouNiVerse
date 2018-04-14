import { Dimensions } from 'react-native'

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
