import { Alert } from "react-native"

export const drawSixCards = (realm) => {
  cards = [...realm.objects("Card")]
  for (let i = cards.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1)); //why does shuffle break without this semicolon?!?
    [cards[i], cards[j]] = [cards[j], cards[i]]
  }
  realm.write(() => {
    realm.objects("RainbowCard")[0].cards = cards
    realm.objects("RainbowCard")[0].wrongGuesses = []
    realm.objects("RainbowCard")[0].playList = []
    realm.objects("RainbowCard")[0].correctCard = realm.objects("Card")[Math.floor(Math.random()*realm.objects("Card").length)] //need to change to not repeat card
    realm.objects("RainbowCard")[0].status = "ready"
  })
  if (realm.objects("App")[0].animations) {
    realm.write(()=>{realm.objects("RainbowCard")[0].status = "flashcard entering from top"})
    setTimeout(()=>{
      realm.write(()=>{
        realm.objects("RainbowCard")[0].status = "ready"
      })
    }, 500)
  }
  if (realm.objects("RainbowCard")[0][realm.objects("RainbowCard")[0].activeColor + "Mode"].split(" -> ")[1] == "audio") {
    realm.write(()=>{
      realm.objects("RainbowCard")[0].playList = []
      for (let i = cards.length - 1; i >= 0; i--) {
        realm.objects("RainbowCard")[0].playList.push(cards[i].name)
      }
    })
  }
}

export const guess = (name, realm) => {
  if (name == realm.objects("RainbowCard")[0].correctCard.name) {
    realm.objects("App")[0].animations ? correctGuessAnimation(realm) : nextColor(realm)
  }
  else {
    realm.write(() => {
      console.log(realm.objects("RainbowCard")[0].wrongGuesses.push(name))
    })
  }
}

export const nextColor = (realm) => {
  if (!realm) return
  const rainbow = rainbowAbledness(realm)
  const current = colors.indexOf(realm.objects("RainbowCard")[0].activeColor)
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
    realm.objects("RainbowCard")[0].activeColor = colors[next]
  })
  drawSixCards(realm)
}

export const setActiveColor = (realm, color) => {
  if (!realm) return
  if (!realm.objects("RainbowCard")[0][color]) return
  realm.write(() => {
    realm.objects("RainbowCard")[0].activeColor = color
  })
  drawSixCards(realm)
}

export const toggleStripe = (realm, color) => {
  if (!realm) return
  if (realm.objects("RainbowCard")[0].activeColor == color) return
  let rainbow = rainbowAbledness(realm)
  rainbow[color] = !rainbow[color]
  if (!Object.values(rainbow).includes(true)) 
    Alert.alert("You must have at least 1 active color!")
  else realm.write(()=>{
    realm.objects("RainbowCard")[0][color] = !realm.objects("RainbowCard")[0][color]
  })
}

const colors = ["red", "orange", "yellow", "green", "blue", "purple"]

const rainbowAbledness = (realm) => {
  if (!realm) return
  let output = {}
  for (color of colors) {
    output[color] = realm.objects("RainbowCard")[0][color]
  }
  return output
}

const correctGuessAnimation = (realm) => {
  realm.write(()=>{
    realm.objects("RainbowCard")[0].status = "wrong choices dropping away"
    setTimeout(()=>{
      realm.write(()=>{
        realm.objects("RainbowCard")[0].status = "right choice and answer exiting together"
      })
      setTimeout(()=>{nextColor(realm)}, 800)
    }, 1000)
  })
}
