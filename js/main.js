new Vue({
  name: 'game',
  el: '#app',
  data: state,  // declared in state.js
  template:
  `<div>
    <top-bar :current-player-index='currentPlayerIndex' :turn='turn' :players='players'/>
  </div>`,
})

window.addEventListener('resize', () => {
  state.worldRatio = getWorldRatio()
})
