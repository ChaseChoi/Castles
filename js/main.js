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
      <hand :cards="testHand" v-if="!activityOverlay" @play-card="testPlayCard" />
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
    testPlayCard(card) {
      // get the index of chosen card
      const index = this.testHand.indexOf(card)
      this.testHand.splice(index, 1)
    },
  },
})

window.addEventListener('resize', () => {
  state.worldRatio = getWorldRatio()
})

requestAnimationFrame(animate);

function animate(time) {
  requestAnimationFrame(animate);
  TWEEN.update(time);
}
