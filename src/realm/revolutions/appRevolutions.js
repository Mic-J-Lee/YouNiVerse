import { Dimensions } from 'react-native'

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
