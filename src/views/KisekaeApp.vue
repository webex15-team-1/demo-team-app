<template>
  <h1>Vue きせかえゲーム</h1>
  <div class="app">
    <div class="human" v-if="!start">
      <div class="face">{{ face }}</div>
      <div class="cloth">💪{{ cloth }}💪</div>
      <div class="shoe">{{ shoe }}</div>
    </div>
    <div class="message">
      <div>{{ message[i] }}</div>
      <div class="choices">
        <div class="faceChoice" v-if="i === 1">
          <span
            v-for="(humanFace, index) in humanFaces"
            v-bind:key="index"
            v-bind:humanFace="humanFace"
            v-on:click="faceChoice(humanFace)"
          >
            {{ humanFace }}
          </span>
        </div>
        <div class="clothChoice" v-if="i === 2">
          <span
            v-for="(humanCloth, index) in humanClothes"
            v-bind:key="index"
            v-bind:humanCloth="humanCloth"
            v-on:click="clothChoice(humanCloth)"
          >
            {{ humanCloth }}
          </span>
        </div>
        <div class="shoesChoice" v-if="i === 3">
          <span
            v-for="(humanShoe, index) in humanShoes"
            v-bind:key="index"
            v-bind:humanShoe="humanShoe"
            v-on:click="shoeChoice(humanShoe)"
          >
            {{ humanShoe }}
          </span>
        </div>
      </div>
    </div>
    <button v-if="start" v-on:click="startKisekae">開始！</button>
    <button
      v-if="!start && !end && !reset"
      v-on:click="nextKisekae"
      v-bind:disabled="!isNext"
    >
      次へ
    </button>
    <input v-if="end" v-model="name" placeholder="あなたの名前" />
    <button v-if="end" v-on:click="tourokuKisekae">登録！</button>
    <button v-if="reset" v-on:click="resetKisekae">もう一度</button>
  </div>
  <h2>みんなのHuman</h2>
  <div class="humanContainter">
    <div
      v-for="(humanHistory, index) in humanHistories"
      v-bind:key="index"
      v-bind:humanHistory="humanHistory"
      class="humanHistory"
    >
      <div>{{ humanHistory.face }}</div>
      <div>💪{{ humanHistory.cloth }}💪</div>
      <div>{{ humanHistory.shoe }}</div>
      <div>作成者：{{ humanHistory.name }}</div>
    </div>
  </div>
</template>

<script>
import { collection, addDoc, getDocs } from "firebase/firestore"
import { db } from "@/firebase.js"
export default {
  data() {
    return {
      message: [
        "きせかえゲームを始めよう！",
        "顔を選ぼう！",
        "服を選ぼう！",
        "靴を選ぼう！",
      ],
      start: true,
      end: false,
      reset: false,
      isNext: false,
      i: 0,
      face: "＜顔(未選択)＞",
      cloth: "＜服(未選択)＞",
      shoe: "＜靴(未選択)＞",
      humanFaces: [
        "😀",
        "😁",
        "😆",
        "😂",
        "🤣",
        "😇",
        "😍",
        "😚",
        "🤪",
        "🧐",
        "😎",
        "🥸",
        "🥺",
        "😭",
        "😡",
        "🤔",
        "😴",
        "🤤",
        "😷",
      ],
      humanClothes: [
        "🧥",
        "🥼",
        "🦺",
        "👚",
        "👕",
        "🩲",
        "🩳",
        "👔",
        "👗",
        "👙",
        "🩱",
        "👘",
        "🥻",
      ],
      humanShoes: [
        "🩴",
        "🥿",
        "👠",
        "👡",
        "👢",
        "👞",
        "👟",
        "🥾",
        "🧦",
        "🛼",
        "⛸",
      ],
      humanHistories: [],
    }
  },
  methods: {
    startKisekae: function () {
      this.start = false
      this.i += 1
    },
    nextKisekae: function () {
      this.i += 1
      this.isNext = false
      this.$nextTick(() => {
        if (this.i == this.message.length) {
          this.end = true
        }
      })
    },
    faceChoice: function (item) {
      this.face = item
      this.isNext = true
    },
    clothChoice: function (item) {
      this.cloth = item
      this.isNext = true
    },
    shoeChoice: function (item) {
      this.shoe = item
      this.isNext = true
    },
    tourokuKisekae: function () {
      alert("登録しました！")
      let data = {
        face: this.face,
        cloth: this.cloth,
        shoe: this.shoe,
        name: this.name,
      }
      addDoc(collection(db, "kisekae"), data).then(() => {
        this.humanHistories.push(data)
      })
      this.end = false
      this.reset = true
    },
    resetKisekae: function () {
      this.i = 0
      this.start = true
      this.reset = false
      this.face = "＜顔(未選択)＞"
      this.cloth = "＜服(未選択)＞"
      this.shoe = "＜靴(未選択)＞"
    },
  },
  created() {
    getDocs(collection(db, "kisekae"))
      .then((snapshot) => {
        return snapshot.docs
      })
      .then((docs) => {
        for (let j = 0; j < docs.length; j++) {
          this.humanHistories.push(docs[j].data())
        }
      })
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
.human {
  text-align: center;
  font-size: 50px;
  padding: 10px;
  border: 4px solid;
}
.message {
  font-size: 30px;
  text-align: center;
}
.humanContainter {
  display: flex;
  flex-wrap: wrap;
}
.humanHistory {
  text-align: center;
  align-items: center;
  width: 20%;
  font-size: 30px;
  padding: 10px;
  border: 4px solid;
}
</style>
