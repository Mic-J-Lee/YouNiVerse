import { Alert } from 'react-native'

export const drawSixCards = (realm) => {
  cards = [...realm.objects('Card')]
  for (let i = cards.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1)); //why does shuffle break without this semicolon?!?
    [cards[i], cards[j]] = [cards[j], cards[i]]
  }
  realm.write(() => {
    realm.objects('RainbowCard')[0].cards = cards
    realm.objects('RainbowCard')[0].wrongGuesses = []
    realm.objects('RainbowCard')[0].playList = []
    realm.objects('RainbowCard')[0].correctCard = realm.objects('Card')[Math.floor(Math.random()*realm.objects('Card').length)] //need to change to not repeat card
    realm.objects('RainbowCard')[0].status = 'ready'
  })
  if (realm.objects('App')[0].animations) {
    realm.write(()=>{realm.objects('RainbowCard')[0].status = 'flashcard entering from top'})
    setTimeout(()=>{
      realm.write(()=>{
        realm.objects('RainbowCard')[0].status = 'ready'
      })
    }, 500)
  }
  if (realm.objects('RainbowCard')[0][realm.objects('RainbowCard')[0].activeColor + 'Mode'].split(' -> ')[1] == 'audio') {
    realm.write(()=>{
      realm.objects('RainbowCard')[0].playList = []
      for (let i = cards.length - 1; i >= 0; i--) {
        realm.objects('RainbowCard')[0].playList.push(cards[i].name)
      }
    })
  }
}

export const guess = (name, realm) => {
  if (name == realm.objects('RainbowCard')[0].correctCard.name) {
    realm.objects('App')[0].animations ? correctGuessAnimation(realm) : nextColor(realm)
  }
  else {
    if (realm.objects('RainbowCard')[0].wrongGuesses.indexOf(name) == -1) {
      realm.write(() => {
        realm.objects('RainbowCard')[0].wrongGuesses.push(name)
      })
    }
  }
}

export const nextColor = (realm) => {
  if (!realm) return
  const colors = ['red', 'orange', 'yellow', 'green', 'blue', 'purple']
  const current = colors.indexOf(realm.objects('RainbowCard')[0].activeColor)
  let next = 0
  if (current != 5) next = current + 1
  realm.write(() => {
    realm.objects('RainbowCard')[0].activeColor = colors[next]
  })
  drawSixCards(realm)
}

export const setActiveColor = (realm, color) => {
  if (!realm) return
  if (realm.objects('RainbowCard')[0].activeColor == color) return
  realm.write(() => {
    realm.objects('RainbowCard')[0].activeColor = color
  })
  drawSixCards(realm)
}

const correctGuessAnimation = (realm) => {
  realm.write(()=>{
    realm.objects('RainbowCard')[0].status = 'wrong choices dropping away'
    setTimeout(()=>{
      realm.write(()=>{
        realm.objects('RainbowCard')[0].status = 'right choice and answer exiting together'
      })
      setTimeout(()=>{nextColor(realm)}, 400)
    }, 700)
  })
}
