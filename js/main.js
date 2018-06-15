new Vue({
  name: 'game',
  el: '#app',
  data: state,  // declared in state.js
  template:
  `<div>
    <top-bar :current-player-index='currentPlayerIndex' :turn='turn' :players='players'/>
    <card :card-obj="testCard" @play="handlePlay"/>
    <transition name='hand'>
      <hand :cards="testHand" v-if="!activityOverlay" />
    </transition>
  </div>`,
  computed: {
    testCard() {
      return cards.archers
    }
  },
  methods: {
    handlePlay() {
      console.log('Caught play event!');
    },
    createHand() {
      const cards = []
      const ids = Object.keys(cards)
      for (var i = 0; i < 5; i++) {
        cards.push(testDrawHand())
      }
      return cards
    },
    testDrawHand() {
      const ids = Object.keys(cards)
      const randomId = ids[Math.floor(Math.random() * ids.length)]
      return {
        uid: cardUid++,
        id: randomId,
        def: cards[randomId],
      }
    }
  },
})

window.addEventListener('resize', () => {
  state.worldRatio = getWorldRatio()
})
