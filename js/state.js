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
  activityOverlay: null,
  testHand: [
    {
      uid: 0,
      id: 0,
      def: cards.archers
    },
    {
      uid: 1,
      id: 1,
      def: cards.farm
    },
    {
      uid: 2,
      id: 2,
      def: cards.trebuchet
    },
    {
      uid: 3,
      id: 3,
      def: cards.knighthood
    },
    {
      uid: 4,
      id: 4,
      def: cards.repair
    }
  ],

}
