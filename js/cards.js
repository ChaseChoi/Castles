let cards = [
  {
    id: 'pikemen',
    type: 'attack',
    title: 'Pikemen',
    description: '消耗 1 <b>食物</b><br>造成 1 <b>伤害</b>',
    note: '让对手承受一定的伤害.',
    play (player, opponent) {
      player.food -= 1
      opponent.health -= 1
    },
  },
  {
    id: 'catapult',
    type: 'attack',
    title: 'Catapult',
    description: '消耗 2 <b>食物</b><br>造成 2 <b>伤害</b>',
    play (player, opponent) {
      player.food -= 2
      opponent.health -= 2
    },
  },
  {
    id: 'trebuchet',
    type: 'attack',
    title: 'Trebuchet',
    description: '消耗 3 <b>食物</b><br>承受 1 <b>伤害</b><br>造成 4 <b>伤害</b>',
    note: ' &#171;人类至今创造过的最完美的机器!&#187;',
    play (player, opponent) {
      player.food -= 3
      player.health -= 1
      opponent.health -= 4
    },
  },
  {
    id: 'archers',
    type: 'attack',
    title: 'Archers',
    description: '消耗 3 <b>食物</b><br>造成 3 <b>伤害</b>',
    note: '&#171;随时准备射击!&#187;',
    play (player, opponent) {
      player.food -= 3
      opponent.health -= 3
    },
  },
  {
    id: 'knighthood',
    type: 'attack',
    title: 'Knighthood',
    description: '消耗 7 <b>食物</b><br>造成 5 <b>伤害</b>',
    note: '骑士比坐骑拥有更高的灵活性',
    play (player, opponent) {
      player.food -= 7
      opponent.health -= 5
    },
  },
  {
    id: 'repair',
    type: 'support',
    title: 'Repair',
    description: '修复 5 <b>伤害</b><br>跳过下一回合',
    play (player, opponent) {
      player.isSkip = true
      player.health += 5
    }
  },
  {
    id: 'quick-repair',
    type: 'support',
    title: 'Quick Repair',
    description: '消耗 3 <b>食物</b><br>修复 3 <b>伤害</b>',
    note: '这将在道德和力量上获得成果!',
    play (player, opponent) {
      player.food -= 3
      player.health += 3
    }
  },
  {
    id: 'farm',
    type: 'support',
    title: 'Farm',
    description: '获得 5 <b>食物</b><br>跳过下一回合',
    note: '&#171;种植谷物需要极大的耐心&#187;',
    play (player, opponent) {
      player.isSkip = true
      player.food += 5
    },
  },
  {
    id: 'granary',
    type: 'support',
    title: 'Granary',
    description: '获得 2 <b>食物</b>',
    play (player, opponent) {
      player.food += 2
    }
  },
  {
    id: 'poison',
    type: 'special',
    title: 'Poison',
    description: '消耗 1 <b>食物</b><br>对手 失去 3 <b>Food</b>',
    note: '让可靠的人摧毁敌人的谷仓.',
    play (player, opponent) {
      player.food -= 1
      opponent.food -= 3
    },
  },
  {
    id: 'fireball',
    type: 'special',
    title: 'Fireball',
    description: 'Take 3 <b>伤害</b><br>造成 5 <b>伤害</b><br>跳过此回合',
    note: '&#171;魔法并不止存在于童话里&#187;',
    play (player, opponent) {
      player.health -= 3
      player.isSkip = true
      opponent.health -= 5
    },
  },
  {
    id: 'chapel',
    type: 'special',
    title: 'Chapel',
    description: '原地待命',
    note: '在教堂里祈祷, 希望有人可以倾听',
    play (player, opponent) {
      // Nothing happens...
    },
  },
  {
    id: 'curse',
    type: 'special',
    title: 'Curse',
    description: '双方:<br>失去 3 <b>食物</b><br>造成 3 <b>伤害</b>',
    play (player, opponent) {
      player.food -= 3
      player.health -= 3
      opponent.food -= 3
      opponent.health -= 3
    },
  },
  {
    id: 'miracle',
    type: 'special',
    title: 'Miracle',
    description: '双方:<br>获得 3 <b>食物</b><br>修复 3 <b>伤害</b>',
    play (player, opponent) {
      player.food += 3
      player.health += 3
      opponent.food += 3
      opponent.health += 3
    },
  },
]

cards = cards.reduce((map, card) => {
  card.description = card.description.replace(/\d+\s+<b>.*?<\/b>/gi, '<span class="effect">$&</span>')
  card.description = card.description.replace(/<b>(.*?)<\/b>/gi, (match, p1) => {
    const id = p1.toLowerCase()
    return `<b class="keyword ${id}">${p1} <img src="images/${id}.svg"/></b>`
  })
  map[card.id] = card
  return map
}, {})

let pile = {
  pikemen: 4,
  catapult: 4,
  trebuchet: 3,
  archers: 3,
  knighthood: 3,
  'quick-repair': 4,
  granary: 4,
  repair: 3,
  farm: 3,
  poison: 2,
  fireball: 2,
  chapel: 2,
  curse: 1,
  miracle: 1,
}
