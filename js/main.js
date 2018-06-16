new Vue({
  name: 'game',
  el: '#app',
  data: state, // declared in state.js
  template: `<div>
    <top-bar :current-player-index='currentPlayerIndex' :turn='turn' :players='players'/>
    <div class='world'>
      <div class="clouds">
        <cloud v-for="index in 10" :type="(index - 1) % 5 + 1" :key="index"/>
      </div>
      <castle v-for="(player, index) in players" :player="player" :index="index" :key="index"/>
      <div class="land"></div>
    </div>
    <transition name='hand'>
      <hand :cards="currentHand" v-if="!activityOverlay" @play-card="handlePlayCard" @card-leave-end="handleCardLeaveEnd"/>
    </transition>
    <transition name='zoom'>
      <overlay v-if="activityOverlay" :key="activityOverlay">
        <overlay-content-play-turn v-if="activityOverlay==='play-turn'" :player="currentPlayer" />
        <overlay-content-last-play v-if="activityOverlay==='last-play'" :opponent="currentOpponent" />
        <overlay-content-game-over v-if="activityOverlay==='game-over'" :players="players" />
      </overlay>
    </transition>
  </div>`,
  computed: {
    testCard() {
      return cards.archers
    }
  },
  methods: {
    handlePlayCard(card) {
      playCard(card)
    },
    handleCardLeaveEnd() {
      applyCard()
    },
  },
  mounted() {
    // init cards in hand
    beginGame()
  }
})

window.addEventListener('resize', () => {
  state.worldRatio = getWorldRatio()
})

requestAnimationFrame(animate);

function animate(time) {
  requestAnimationFrame(animate);
  TWEEN.update(time);
}

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
  state.currentPlayerIndex = state.currentOpponentId; // change player
  state.activeOverlay = 'player-turn'
}
