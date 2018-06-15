new Vue({
  name: 'game',
  el: '#app',
  data: state,  // declared in state.js
  template:
  `<div>
    <top-bar :current-player-index='currentPlayerIndex' :turn='turn' :players='players'/>
    <transition name='hand'>
      <hand :cards="testHand" v-if="!activityOverlay" @play-card="testPlayCard" />
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
