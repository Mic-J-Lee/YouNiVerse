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
    }
  })
}

export const seedOMGCards = (realm) => {
  if (!realm) return
  realm.write(()=>{
    if (!realm.objects('Card')[0]) {
      realm.create('Card', {name: '一', audio: 'jat1', image: 'oneimage', writing: 'onechinese', category: 'elementary numbers'})
      realm.create('Card', {name: '二', audio: 'ji6', image: 'twoimage', writing: 'twochinese', category: 'elementary numbers'})
      realm.create('Card', {name: '三', audio: 'saam1', image: 'threeimage', writing: 'threechinese', category: 'elementary numbers'})
      realm.create('Card', {name: '四', audio: 'sei3', image: 'fourimage', writing: 'fourchinese', category: 'elementary numbers'})
      realm.create('Card', {name: '五', audio: 'ng5', image: 'fiveimage', writing: 'fivechinese', category: 'elementary numbers'})
      realm.create('Card', {name: '六', audio: 'luk6', image: 'siximage', writing: 'sixchinese', category: 'elementary numbers'})
    }
  })
}
