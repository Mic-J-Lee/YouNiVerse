export const CardSchema = {
  name: 'Card',
  properties: {
    name:     'string',
    audio:    'string',
    image:    'string',
    writing:  'string',
    category: 'string'
  }
}

export const UserSchema = {
  name: 'User',
  primaryKey: 'name',
  properties: {
    name:     {type: 'string', default: 'default-user'},
    language: {type: 'string', default: 'cantonese'},
    gold:     {type: 'int',    default: 0},
    purse:    {type: 'int',    default: 100},
    flux:     {type: 'int',    default: 0},
    flask:    {type: 'int',    default: 0}
  }
}

export const RainbowCardSchema = {
  name: 'RainbowCard',
  properties: {
    cards:        'Card[]',
    correctCard:  'Card',
    introStatus:  {type: 'string', default: 'not started'},
    activeColor:  {type: 'string', default: 'red'},
    playList:     {type: 'string[]'},
    wrongGuesses: {type: 'string[]'},
    status:       {type: 'string', default: 'ready'},
    redMode:      {type: 'string', default: 'audio -> image'},
    orangeMode:   {type: 'string', default: 'writing -> audio'},
    yellowMode:   {type: 'string', default: 'image -> writing'},
    greenMode:    {type: 'string', default: 'writing -> image'},
    blueMode:     {type: 'string', default: 'audio -> writing'},
    purpleMode:   {type: 'string', default: 'image -> audio'}
  }
}

export const AppSchema = {
  name: 'App',
  properties: {
    animations:   {type: 'bool',   default: true},
    background:   {type: 'string', default: 'clouds'},
    height:       {type: 'int',    default: 1},
    width:        {type: 'int',    default: 0},
    menu:         {type: 'bool',   default: false},
    orientation:  {type: 'string', default: 'portrait'},
    user:         'User?'
  }
}
