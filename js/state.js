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
    {name: 'Chase'},
    {name: 'Sherry'}
  ],
  currentPlayerIndex: Math.round(Math.random()),
}
