<template>
  <h1>じゃんけんゲーム</h1>
  <h2>コンピューターは...</h2>
  <div class="te__images">
    <img
      v-if="this.pc === 0"
      src="@/views/images/guu.png"
      alt="グー"
      class="te"
    />
    <img
      v-if="this.pc === 1"
      src="@/views/images/tyoki.png"
      alt="チョキ"
      class="te"
    />
    <img
      v-if="this.pc === 2"
      src="@/views/images/paa.png"
      alt="パー"
      class="te"
    />
  </div>

  <div class="button__area">
    <button
      v-for="choice in choices"
      v-bind:key="choice.number"
      v-on:click="choose(choice)"
    >
      {{ choice.te }}
    </button>
  </div>

  <h3>{{ resultText }}</h3>
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
<style>
.te__images {
  display: flex;
  justify-content: center;
}

.te {
  width: 300px;
  margin: 0 auto;
}

.button__area {
  margin: 0 auto;
  width: 50%;
  display: flex;
  justify-content: space-around;
}

button {
  margin: 20px;
  font-size: 20px;
  justify-content: space-around;
}

h2 {
  text-align: center;
}

h3 {
  text-align: center;
}
</style>
