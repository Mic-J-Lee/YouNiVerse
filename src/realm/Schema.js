export const UserSchema = {
  name: 'User',
  primaryKey: 'name',
  properties: {
    name:  'string',
    gold:  {type: 'int', default: 0},
    purse: {type: 'int', default: 100},
    flux:  {type: 'int', default: 0},
    flask: {type: 'int', default: 0}
  }
}

export const RainbowCardSchema = {
  name: 'RainbowCard',
  properties: {
    activeColor:  {type: 'string', default: 'red'},
    red:          {type: 'bool',   default: true},
    orange:       {type: 'bool',   default: true},
    yellow:       {type: 'bool',   default: true},
    green:        {type: 'bool',   default: true},
    blue:         {type: 'bool',   default: true},
    purple:       {type: 'bool',   default: true},
    introStatus:  {type: 'string', default: 'not started'}
  }
}

export const AppSchema = {
  name: 'App',
  properties: {
    orientation:  {type: 'string', default: 'portrait'},
    screenHeight: {type: 'int',    default: 1},
    screenWidth:  {type: 'int',    default: 0},
    status:       {type: 'string', default: 'ready'},
    user:         'User?'
  }
}
