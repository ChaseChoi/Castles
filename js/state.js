// Some useful variables
var maxHealth = 10
var maxFood = 10
var handSize = 5
var cardUid = 0
var currentPlayingCard = null

// The consolidated state of our app
var state = {
  // World ratio in the window
  worldRatio: getWorldRatio(),
  // Game data
  turn: 1,
  players: [
    {name: '王者'},
    {name: '英雄'}
  ],
  currentPlayerIndex: Math.round(Math.random()),
}
