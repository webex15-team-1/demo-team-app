<template>
  <h1>じゃんけんゲーム</h1>
  <h2 class="pc__text">コンピューターは...</h2>

  <div class="te__images">
    <div v-if="pon">
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

    <div v-else>
      <!-- ボタン推すまでのドゥルルルルのもの -->
      <img src="@/views/images/guu.png" alt="グー" class="dwu__guu" />
      <img src="@/views/images/tyoki.png" alt="チョキ" class="dwu__tyoki" />
      <img src="@/views/images/paa.png" alt="パー" class="dwu__paa" />
    </div>
  </div>

  <div class="button__area">
    <button
      v-for="choice in choices"
      v-bind:key="choice.number"
      v-on:click="choose(choice)"
      class="janken__button"
    >
      {{ choice.te }}
    </button>
  </div>

  <h3 class="result__text">{{ resultText }}</h3>

  <div class="replay__button">
    <button v-if="pon" v-on:click="replay()">もう一回！！</button>
  </div>
</template>
<script>
export default {
  data() {
    return {
      player: "",
      pc: "",
      resultText: "",
      pon: false,
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
      this.pon = true
      this.player = choice.number
      this.result()
      //選択した手がでるようにする
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
    replay() {
      //やり直し
      this.pon = false
      this.resultText = ""
      this.player = ""
    },
  },
}
</script>
<style>
.te__images {
  height: 240px;
  position: relative;
}

.te {
  width: 20%;
  position: absolute;
  left: 40%;
}

.dwu__guu {
  width: 20%;
  position: absolute;
  left: 40%;
  animation-name: images;
  animation-duration: 0.3s;
  animation-iteration-count: infinite;
}

.dwu__tyoki {
  width: 20%;
  position: absolute;
  left: 40%;
  animation-name: images;
  animation-duration: 0.3s;
  animation-iteration-count: infinite;
  animation-delay: 0.1s;
}

.dwu__paa {
  width: 20%;
  position: absolute;
  left: 40%;
  animation-name: images;
  animation-duration: 0.3s;
  animation-iteration-count: infinite;
  animation-delay: 0.2s;
}

@keyframes images {
  0% {
    opacity: 0;
    /* opacityは透明度で、0~1で設定、0は表示されない */
  }
  25% {
    opacity: 1;
  }
  50% {
    opacity: 0;
  }
}

.button__area {
  margin: 0 auto;
  width: 50%;
  display: flex;
  justify-content: space-around;
}

.janken__button {
  margin: 20px;
  font-size: 20px;
  justify-content: space-around;
}

.replay__button {
  display: flex;
  justify-content: center;
}

.pc__text {
  text-align: center;
}

.result__text {
  text-align: center;
}
</style>
