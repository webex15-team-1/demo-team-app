<template>
  <h1>Vue タイピングゲーム</h1>
  <div class="app">
    <h2 class="container">
      {{ words[i] }}
    </h2>
    <input
      class="typingSpace"
      type="text"
      v-on:input="collectTyping"
      v-model="inputText"
      ref="focusInput"
      v-bind:disabled="!isInput"
    />
    <button
      class="start"
      v-on:click="startTime"
      v-if="start"
      v-bind:disabled="!isButton"
    >
      開始
    </button>
    <button
      class="next"
      v-on:click="startTime"
      v-if="next"
      v-bind:disabled="!isButton"
    >
      次へ
    </button>
    <button class="again" v-on:click="again" v-if="!start && !next">
      もう一度
    </button>
    <div class="time">経過時間 : {{ fixedTime }}秒</div>
    <div class="history">
      <h2>履歴</h2>
      <div
        v-for="(pastTime, index) in pastTimes"
        v-bind:key="index"
        v-bind:pastTime="pastTime"
      >
        {{ index + 1 }}位 : {{ pastTime.time }}秒 ({{ pastTime.year }}/{{
          pastTime.month
        }}/{{ pastTime.date }} {{ pastTime.hours }}:{{ pastTime.minutes }}:{{
          pastTime.seconds
        }})
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      i: 0,
      words: [
        "「開始」を押してください",
        "hello world",
        "Jun is the cleverest man",
        "Kosuke wants to eat sushi",
        "Leaf likes leaves",
      ],
      second: 0,
      time: 0,
      fixedTime: 0,
      interval: null,
      start: true,
      next: false,
      isButton: true,
      isInput: true,
      pastTimes: [],
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
      this.i += 1
      this.interval = setInterval(this.countTime, 10)
      this.interval
      this.isButton = false
      this.$refs.focusInput.focus()
      this.inputText = null
      this.isInput = true
    },
    //正解時
    collectTyping: function () {
      if (this.inputText === this.words[this.i]) {
        clearInterval(this.interval)
        this.start = false
        this.next = true
        this.isButton = true
        if (this.i === this.words.length - 1) {
          this.finishTyping()
          alert("おしまい！お疲れ様！！！")
        } else {
          alert("正解！")
        }
      }
    },
    //終了時タイムの保存
    finishTyping: function () {
      this.pastTimes.push({
        year: new Date().getFullYear(),
        month: new Date().getMonth(),
        date: new Date().getDate(),
        hours: new Date().getHours(),
        minutes: new Date().getMinutes(),
        seconds: new Date().getSeconds(),
        time: this.fixedTime,
      })
      clearInterval(this.interval)
      this.isInputClass = false
      this.next = false
      //localhostに保存する
      localStorage.pastTimes = JSON.stringify(this.pastTimes)
      this.pastTimes = JSON.parse(localStorage.pastTimes)
      //並び替え
      this.pastTimes.sort(function (a, b) {
        return a.time - b.time
      })
    },
    //もう一度
    again: function () {
      //初期状態に戻す
      this.second = 0
      this.fixedTime = 0
      this.i = 0
      this.isButton = true
      this.isInput = true
      this.start = true
      this.inputText = null
    },
  },

  created: function () {
    //localstorageにデータがあるなら
    if (localStorage.getItem("pastTimes") !== null) {
      //pastTimesに格納
      this.pastTimes = JSON.parse(localStorage.pastTimes)
      //並び替え
      this.pastTimes.sort(function (a, b) {
        return a.time - b.time
      })
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
