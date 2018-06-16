// draw the background
Vue.component('castle', {
  props: ['player', 'index'],
  template:
  `<div class="castle" :class="'player-' + index">
    <img class="building" :src="'images/castle' + index + '.svg'">
    <img class="ground" :src="'images/ground' + index + '.svg'">
    <castle-banners :player="player" />
  </div>`,
})

Vue.component('banner-bar', {
  props: ['ratio', 'color'],
  template: '#banner',
  computed: {
    targetHeight () {
      return this.ratio * 220 + 40
    },
  },
  data () {
    return {
      height: 0,
    }
  },
  watch: {
    targetHeight(newValue, oldValue) {
      const vm = this
      new TWEEN.Tween({ value: oldValue })
      .easing(TWEEN.Easing.Cubic.InOut)
      .to({ value: newValue }, 500)
      .onUpdate(function () {
        vm.height = this.value.toFixed(0)
      })
      .start()
    },
  },
  created () {
    this.height = this.targetHeight
  },
})

// draw the banners showing value of health and food
Vue.component('castle-banners', {
  props: ['player'],
  template:
  `<div class="banners">
      <!-- banner for food -->
      <img class="food-icon" src="images/food-icon.svg" />
      <bubble type="food" :value="player.food" :ratio="foodRatio" />
      <banner-bar class="food-bar" color="#288339" :ratio="foodRatio" />

      <!-- banner for health -->
      <img class="health-icon" src="images/health-icon.svg" />
      <bubble type="health" :value="player.health" :ratio="healthRatio" />
      <banner-bar class="health-bar" color="#9b2e2e" :ratio="healthRatio" />
    </div>`,
  computed: {
    foodRatio () {
      return this.player.food / maxFood
    },
    healthRatio () {
      return this.player.health / maxHealth
    }
  }
})
// bubble for showing current position on banner
Vue.component('bubble', {
  props: ['type', 'value', 'ratio'],
  template:
  `<div class="stat-bubble" :class="type + '-bubble'" :style="bubbleStyle">
    <img :src="'images/' + type + '-bubble.svg'" />
    <div class="counter">{{ value }}</div>
  </div>`,
  computed: {
    bubbleStyle () {
      return {
        top: (this.ratio * 220 + 40) * state.worldRatio + 'px',
      }
    },
  },
})
