import { Dimensions } from 'react-native'
import { AppSchema, CardSchema, RainbowCardSchema, UserSchema } from '../Schema'

export const establish = (realm) => {
  if (!realm) return
  realm.write(() => {
    !realm.objects('App')[0] && realm.create('App', {})
    !realm.objects('RainbowCard')[0] && realm.create('RainbowCard', {})
    // users = realm.objects('User')
    // for (let user of users) realm.delete(user)

  })
  setOrientation(realm)
  Dimensions.addEventListener('change', ()=>setOrientation(realm))
  seedCards(realm)
}

export const loadSchema = (Realm) => {
  return Realm.open({
                          deleteRealmIfMigrationNeeded: true, /////////////MUST REMOVE THIS LINE IN PRODUCTION!!!!!!!!!
    schema: [ CardSchema, UserSchema, AppSchema, RainbowCardSchema ]
  })
}

export const seedCards = (realm) => {
  if (!realm) return
  realm.write(()=>{
    if (!realm.objects('Card')[0]) {
      realm.create('Card', {name: '一', audio: 'jat1', image: 'oneimage', writing: 'onechinese', category: 'elementary numbers'})
      realm.create('Card', {name: '二', audio: 'ji6', image: 'twoimage', writing: 'twochinese', category: 'elementary numbers'})
      realm.create('Card', {name: '三', audio: 'saam1', image: 'threeimage', writing: 'threechinese', category: 'elementary numbers'})
      realm.create('Card', {name: '四', audio: 'sei3', image: 'fourimage', writing: 'fourchinese', category: 'elementary numbers'})
      realm.create('Card', {name: '五', audio: 'ng5', image: 'fiveimage', writing: 'fivechinese', category: 'elementary numbers'})
      realm.create('Card', {name: '六', audio: 'luk6', image: 'siximage', writing: 'sixchinese', category: 'elementary numbers'})
      //set initial state
      realm.objects('RainbowCard')[0].correctCard = realm.objects('Card')[Math.floor(Math.random()*realm.objects('Card').length)]
      realm.objects('RainbowCard')[0].wrongGuesses = []
      realm.objects('RainbowCard')[0].cards = realm.objects('Card')
    }
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
