import { Dimensions } from 'react-native'
import { AppSchema, CardSchema, RainbowCardSchema, UserSchema } from '../Schemata'
import { seedCards } from './seed'

export const establish = (realm) => {
  if (!realm) return
  realm.write(() => {
    !realm.objects('App')[0] && realm.create('App', {})
    !realm.objects('User')[0] && realm.create('User', {})
    !realm.objects('RainbowCard')[0] && realm.create('RainbowCard', {})
    // users = realm.objects('User')
    // for (let user of users) realm.delete(user)

  })
  setOrientation(realm)
  Dimensions.addEventListener('change', ()=>setOrientation(realm))
  seedCards(realm)
  setInitialState(realm)
}

export const loadSchema = (Realm) => {
  return Realm.open({
                          deleteRealmIfMigrationNeeded: true, /////////////MUST REMOVE THIS LINE IN PRODUCTION!!!!!!!!!
    schema: [ CardSchema, UserSchema, AppSchema, RainbowCardSchema ]
  })
}

export const toggleAnimations = (realm) => {
  if (!realm) return
  realm.write(() => {
    realm.objects('App')[0].animations = !realm.objects('App')[0].animations
  })
}

export const toggleMenu = (realm) => {
  if (!realm) return
  realm.write(() => {
    realm.objects('App')[0].menu = !realm.objects('App')[0].menu
  })
}

const setInitialState = (realm) => {
  realm.write(() => {
    realm.objects('RainbowCard')[0].correctCard = realm.objects('Card')[Math.floor(Math.random()*realm.objects('Card').length)]
    realm.objects('RainbowCard')[0].wrongGuesses = []
    realm.objects('RainbowCard')[0].cards = realm.objects('Card')
  })
}

const setOrientation = (realm) => {
  if (!realm) return
  const dimensions = Dimensions.get('screen')
  const orientation = dimensions.height < dimensions.width ? 'landscape' : 'portrait'
  realm.write(() => {
    realm.objects('App')[0].height = dimensions.height
    realm.objects('App')[0].width = dimensions.width
    realm.objects('App')[0].orientation = orientation
  })
}
