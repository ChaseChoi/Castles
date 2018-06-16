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
  canPlay: false,
  players: [
    {
      id: 0,
      name: 'Chase',
      health: 10,
      food: 10,
      isSkip: false,
      hasSkipped: false,
      lastCardId: null,
      isDead: false,
      hand: [],
    },
    {
      id: 1,
      name: 'Sherry',
      health: 10,
      food: 10,
      isSkip: false,
      hasSkipped: false,
      lastCardId: null,
      isDead: false,
      hand: [],
    }
  ],
  currentPlayerIndex: Math.round(Math.random()),
  activityOverlay: null,  // null: means no overlay; not null: hold the name of overlay

  handPile: pile,  // see cards.js
  discardPile: {},

  get currentPlayer() {
    return state.players[state.currentPlayerIndex]
  },
  get currentOpponentIndex() {
    return state.currentPlayerIndex === 0 ? 1 : 0
  },
  get currentOpponent() {
    return state.players[state.currentOpponentIndex]
  },
  get currentHand() {
    return state.currentPlayer.hand
  }

}
