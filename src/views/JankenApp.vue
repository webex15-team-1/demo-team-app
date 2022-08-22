<template>
  <div>
    <h1>じゃんけんゲーム</h1>
    <button
      v-for="choice in choices"
      v-bind:key="choice.number"
      v-on:click="choose(choice)"
    >
      {{ choice.te }}
    </button>
    <p>{{ resultText }}</p>
    <p>あなたは{{ player }}</p>
    <p>パソコンは{{ pc }}</p>
  </div>
</template>
<script>
export default {
  data() {
    return {
      player: "",
      pc: "",
      resultText: "",
      choices: [
        {
          te: "グー",
          number: 0,
        },
        {
          te: "チョキ",
          number: 1,
        },
        {
          te: "パー",
          number: 2,
        },
      ],
    }
  },
  methods: {
    choose(choice) {
      this.player = choice.number
      this.result()
    },
    result() {
      //Math.random()は0~1未満の少数を返す
      //最大値に3足して0~2にした
      //math.floor()で小数点以下を切り捨て
      this.pc = Math.floor(Math.random() * 3)
      switch ((this.player - this.pc + 3) % 3) {
        case 0:
          this.resultText = "引き分け..."
          break
        case 1:
          this.resultText = "残念！負けです💦"
          break
        case 2:
          this.resultText = "おめでとう！勝ちです🎉"
      }
    },
  },
}
</script>
<style></style>
