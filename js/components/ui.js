// display names of two players and an arrow showing whose turn
Vue.component('top-bar', {
  props: ['players', 'currentPlayerIndex', 'turn'],
  template:
    `<div class='top-bar' :class="'player-' + currentPlayerIndex">
      <div class='player p0'>{{ players[0].name }}</div>
      <div class='turn-counter'>
      <div class="turn">回合 {{ turn }}</div>
      <img class='arrow' src='images/turn.svg' alt='turn-arrow'>
      </div>
      <div class='player p1'>{{ players[1].name }}</div>
    </div>`,
})

Vue.component('card', {
  props: ['cardObj'],
  template:
    `<div class='card' :class='"type-" + cardObj.type' @click='play'>
      <div class='title'>{{ cardObj.title }}</div>
      <img class='separator' src='images/card-separator.svg' alt='separator under the title of the card'>
      <div class="description">
        <div v-html="cardObj.description"></div>
      </div>
      <div class="note" v-if="cardObj.note">
        <div v-html="cardObj.note"></div>
      </div>
    </div>`,
    methods: {
      play() {
        this.$emit('play')
      }
    }
})
// cards in the hand
Vue.component('hand', {
  props: ['cards'],
  template: `
    <div class="card-in-hands">
      <div class="wrapper">
        <transition-group name="card" tag="div" class="cards" @after-leave="handleLeaveTransitionEnd">
          <card v-for="card of cards" :cardObj="card.def" :key="card.uid" @play="handlePlay(card)" />
        </transition-group>
      </div>
    </div>
  `,
  methods: {
    handlePlay(card) {
      this.$emit('play-card', card)
    },
    handleLeaveTransitionEnd() {
      this.$emit('card-leave-end')
    },
  }
})

// overlay
Vue.component('overlay', {
  template:
  `<div class="overlay" @click="handleClick">
    <div class="content">
      <slot/>
    </div>
  </div>`,
  methods: {
    handleClick() {
      this.$emit('close')  // close the overlay
    }
  }
})

Vue.component('overlay-content-play-turn', {
  props: ['player'],
  template:
  `<div>
    <div class="big" v-if="player.isSkip">
      {{ player.name }}, <br/> 跳过该回合!
    </div>
    <div class="big" v-else>
      {{ player.name }}, <br/> 你的回合!
    </div>
    <div>轻点继续</div>
  </div>`
})

Vue.component('overlay-content-last-play', {
  props: ['opponent'],
  computed: {
    lastCard() {
      return getLastCard(this.opponent)
    }
  },
  template:
  `<div>
    <div class="big" v-if="opponent.hasSkipped">
      {{ opponent.name }}, <br/> 跳过该回合!
    </div>
    <template v-else>
      <div>{{ opponent.name }} just played:</div>
      <card :cardObj="lastCard" />
    </template>
  </div>`
})


Vue.component('overlay-content-game-over', {
  template:
  `<div>
    <div class="big">Game Over</div>
    <play-result v-for="player in players" :player="player" :key="player.id"/>
  </div>`,
  props: ["players"],
})

Vue.component('play-result', {
  props: ['player'],
  template:
  `<div class="play-result" :class="result">
    <span class="name">{{ player.name }}</span>
    <span class="result">{{ result }}</span>
  </div>`,
  computed: {
    result() {
      return this.player.isDead ? 'defeated' : 'victorious'
    }
  }
})
