new Vue({
  name: 'game',
  el: '#app',
  data: state, // declared in state.js
  template:
  `<div id="#app" :class="cssClass">
    <top-bar :current-player-index='currentPlayerIndex' :turn='turn' :players='players'/>

    <div class='world'>
      <div class="clouds">
        <cloud v-for="index in 10" :type="(index - 1) % 5 + 1" :key="index"/>
      </div>
      <castle v-for="(player, index) in players" :player="player" :index="index" :key="index"/>
      <div class="land"></div>
    </div>

    <transition name='hand'>
      <hand v-if="!activityOverlay" :cards="currentHand" @play-card="handlePlayCard" @card-leave-end="handleCardLeaveEnd"/>
    </transition>

    <transition name="fade">
      <div class="overlay-background" v-if="activityOverlay" />
    </transition>

    <transition name='zoom'>
      <overlay v-if="activityOverlay" :key="activityOverlay" @close="handleOverlayClose">
        <overlay-content-play-turn v-if="activityOverlay==='play-turn'" :player="currentPlayer" />
        <overlay-content-last-play v-if="activityOverlay==='last-play'" :opponent="currentOpponent" />
        <overlay-content-game-over v-if="activityOverlay==='game-over'" :players="players" />
      </overlay>
    </transition>
  </div>`,
  computed: {
    cssClass() {
      return {
        'can-play': this.canPlay,
      }
    }
  },
  methods: {
    handlePlayCard(card) {
      playCard(card)
    },
    handleCardLeaveEnd() {
      applyCard()
    },
    handleOverlayClose() {
      overlayCloseHandlers[this.activityOverlay]()
    },
  },
  mounted() {
    // init cards in hand
    beginGame()
  }
})

var overlayCloseHandlers = {
  'play-turn' () {
    if (state.turn > 1) {
      state.activityOverlay = 'last-play'
    } else {
      newTurn()
    }
  },

  'last-play' () {
    newTurn()
  },

  'game-over' () {
    document.location.reload()
  },
}

window.addEventListener('resize', () => {
  state.worldRatio = getWorldRatio()
})

requestAnimationFrame(animate);

function animate(time) {
  requestAnimationFrame(animate);
  TWEEN.update(time);
}

// entry: start the game
state.activityOverlay = 'play-turn'

function beginGame() {
  state.players.forEach(drawInitialHand)
}

function playCard(card) {
  if (state.canPlay) {
    state.canPlay = false;
    currentPlayingCard = card;
    // Remove the card from the player hand
    const index = state.currentPlayer.hand.indexOf(card)
    state.currentPlayer.hand.splice(index, 1)
    // Add the card to the discard pile
    addCardToPile(state.discardPile, card.id)
  }
}

function applyCard() {
  const card = currentPlayingCard
  applyCardEffect(card)

  setTimeout(() => {
    state.players.forEach(checkPlayerLost)
    if (isOnePlayerDead()) {
      endGame()
    } else {
      nextTurn()
    }
  }, 700)
}

function endGame() {
  state.activityOverlay = 'game-over'
}

function nextTurn() {
  state.turn++
  state.currentPlayerIndex = state.currentOpponentIndex; // change player
  state.activityOverlay = 'play-turn'
}

function newTurn() {
  state.activityOverlay = null
  if (state.currentPlayer.isSkip) {
    skipTurn()
  } else {
    beginTurn()
  }
}

function skipTurn() {
  state.currentPlayer.hasSkipped = true
  state.currentPlayer.isSkip = false
  nextTurn()
}

function beginTurn() {
  state.currentPlayer.hasSkipped = false // If both player already had a first turn
  if (state.turn > 2) {
    // Draw new card
    setTimeout(() => {
      state.currentPlayer.hand.push(drawCard())
      state.canPlay = true
    }, 800)
  } else {
    state.canPlay = true
  }
}
