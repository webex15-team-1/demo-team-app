<template>
  <div class="cards-container">
    <div
      class="card"
      v-for="(flag, index) in cardsOpened"
      :key="index"
      @click="selectCard(index)"
    >
      {{ flag ? cardsFigure[index] : cards[index] }}
    </div>
  </div>
  <div v-for="(item, index) in select" :key="index">
    select {{ item }} => {{ cardsFigure[item] }}
  </div>
</template>

<script>
export default {
  data() {
    return {
      cards: ["?", "?", "?", "?", "?", "?", "?", "?"],
      cardsFigure: ["😆", "😆", "🍒", "🍒", "🥈", "🥈", "🀄", "🀄"],
      cardsOpened: [false, false, false, false, false, false, false, false],
      select: [],
    }
  },
  methods: {
    selectCard(index) {
      //   alert(index)
      this.openCard(index)
      this.select.push(index)
      //   if (this.select.length === 2) {
      //     this.test()
      //   }
    },
    toggleCard(index) {
      this.cardsOpened[index] ? this.closeCard(index) : this.openCard(index)
    },
    openCard(index) {
      this.cardsOpened[index] = true
    },
    closeCard(index) {
      this.cardsOpened[index] = false
    },
  },
}
</script>

<style scoped>
.cards-container {
  display: flex;
  flex-direction: row;
  width: 18em;
  flex-wrap: wrap;
}
.card {
  display: inline-block;
  height: 2em;
  width: 2em;
  text-align: center;
  border: solid 1px;
  margin: 1em;
}
</style>
