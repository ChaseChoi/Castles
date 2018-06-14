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
    `<div class='card' :class='"type-" + cardObj.type'>
      <div class='title'>{{ cardObj.title }}</div>
      <img class='separator' src='images/card-separator.svg' alt='separator under the title of the card'>
      <div class="description">
        <div v-html="cardObj.description"></div>
      </div>
      <div class="note" v-if="cardObj.note">
        <div v-html="cardObj.note"></div>
      </div>
    </div>`
})
