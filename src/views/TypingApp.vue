<template>
  <h1>Vue タイピングゲーム</h1>
  <div class="app">
    <h2 class="container">
      {{ words }}
    </h2>
    <input
      class="typingSpace"
      type="text"
      v-on:input="collectTyping"
      v-model="inputText"
      ref="focusInput"
      v-bind:disabled="inputClass"
    />
    <button
      class="start"
      v-on:click="startTime"
      v-if="start"
      v-bind:disabled="buttonClass"
    >
      開始
    </button>
    <button class="again" v-on:click="again" v-if="!start">もう一度</button>
    <div class="time">経過時間 : {{ fixedTime }}秒</div>
    <div class="history">
      <h2>履歴</h2>
      <div
        v-for="(pastTime, index) in pastTimesJson"
        v-bind:key="index"
        v-bind:pastTime="pastTime"
      >
        日時：{{ pastTime.date }} タイム：{{ pastTime.time }}秒
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      words: "「開始」を押してください",
      second: 0,
      time: 0,
      fixedTime: 0,
      interval: null,
      start: true,
      buttonClass: false,
      inputClass: false,
      pastTimes: [
        //ここに格納してく
      ],
      pastTimesJson: [],
    }
  },

  methods: {
    //時間の関数
    countTime: function () {
      this.second += 1
      this.time = this.second / 100
      this.fixedTime = this.time.toFixed(2)
    },
    //開始時
    startTime: function () {
      this.words = "hello world"
      this.interval = setInterval(this.countTime, 10)
      this.interval
      this.buttonClass = true
      this.$refs.focusInput.focus()
      this.inputText = null
    },
    //正解時
    collectTyping: function () {
      if (this.inputText === this.words) {
        alert("正解！")
        this.pastTimesJson.push({
          date: new Date(),
          time: this.fixedTime,
        })
        clearInterval(this.interval)
        this.buttonClass = false
        this.inputClass = true
        this.start = false
        localStorage.pastTimesJson = JSON.stringify(this.pastTimesJson)
        this.pastTimesJson = JSON.parse(localStorage.pastTimesJson)
      }
    },
    //もう一度
    again: function () {
      this.second = 0
      this.fixedTime = 0
      this.words = "「開始」を押してください"
      this.buttonClass = false
      this.inputClass = false
      this.start = true
      this.inputText = null
    },
  },

  created: function () {
    if (localStorage.pastTimesJson !== null) {
      this.pastTimesJson = JSON.parse(localStorage.pastTimesJson)
    }
  },
}
</script>

<style>
.app {
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: center;
}
</style>
