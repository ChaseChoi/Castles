Vue.component('castle', {
  props: ['player', 'index'],
  template:
  `<div class="castle" :class="'player-' + index">
    <img class="building" :src="'images/castle' + index + '.svg'">
    <img class="ground" :src="'images/ground' + index + '.svg'">
  </div>`,
})
