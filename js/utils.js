// WORLD

function getWorldRatio () {
  return 1 / 1920 * window.innerWidth
}

// GAME

// Pile

function drawCard () {
  if (getDrawPileCount() === 0) {
    refillPile()
  }

  const choice = Math.round(Math.random() * (getDrawPileCount() - 1)) + 1

  let	accumulation = 0
  for (let k in state.handPile) {
    accumulation += state.handPile[k]
    if (choice <= accumulation) {
      // Draw the card from the pile
      state.handPile[k] --
      return {
        id: k,
        uid: cardUid++,
        def: cards[k],
      }
    }
  }
}

function drawInitialHand (player) {
  for (let i = 0; i < handSize; i++) {
    player.hand.push(drawCard())
  }
}

function addCardToPile (pile, cardId) {
  if (typeof pile[cardId] === 'number') {
    pile[cardId] ++
  } else {
    pile[cardId] = 1
  }
}

function refillPile () {
  Object.assign(state.handPile, state.discardPile)
  state.discardPile = {}
}


function getDrawPileCount () {
  let result = 0
  for (let k in state.handPile) {
    result += state.handPile[k]
  }
  return result
}

// Card play

function applyCardEffect (card) {
  state.currentPlayer.lastCardId = card.id
  card.def.play(state.currentPlayer, state.currentOpponent)
  // Check if the stats (health, food) are not outside the boundaries
  state.players.forEach(checkStatsBounds)
}

// Player

function checkStatsBounds (player) {
  // Health
  if (player.health < 0) {
    player.health = 0
  } else if (player.health > maxHealth) {
    player.health = maxHealth
  }

  // Food
  if (player.food < 0) {
    player.food = 0
  } else if (player.food > maxFood) {
    player.food = maxFood
  }
}

function checkPlayerLost (player) {
  player.isDead = (player.health === 0 || player.food === 0)
}

function isOnePlayerDead () {
  return state.players.some(p => p.isDead)
}
// get info of the previous card
function getLastCard(player) {
  return cards[player.lastCardId]
}
