var game = new Vue({
  el: '#app',
  data: state,  // declared in state.js
  template: `<div>
    <h1>{{worldRatio}}</h1>
  </div>`
})

window.addEventListener('resize', () => {
  state.worldRatio = getWorldRatio()
})
