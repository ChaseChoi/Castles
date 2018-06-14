new Vue({
  name: 'game',
  el: '#app',
  data: state,  // declared in state.js
  template:
  `<div>
    <top-bar :current-player-index='currentPlayerIndex' :turn='turn' :players='players'/>
    <card :card-obj="testCard" @play="handlePlay"/>
  </div>`,
  computed: {
    testCard() {
      return cards.archers
    }
  },
  methods: {
    handlePlay() {
      console.log('Caught play event!');
    }
  }
})

window.addEventListener('resize', () => {
  state.worldRatio = getWorldRatio()
})
