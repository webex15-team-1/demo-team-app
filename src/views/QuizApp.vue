<template>
  <h1>Vue クイズ</h1>
  <div class="app">
    <h2>Q. {{ currentQuiz.text }}</h2>
    <img class="quiz-image" v-bind:src="quizImagePath" alt="クイズ画像" />
    <div class="container">
      <button
        v-for="(choice, index) in currentQuiz.choices"
        v-bind:key="index"
        v-on:click="answer(choice)"
      >
        {{ choice.text }}
      </button>
    </div>
    <div>{{ feedback }}</div>
    <button v-if="nextQuiz" v-on:click="next()">次の問題へ</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      nextQuiz: false,
      feedback: "",
      quizIndex: 0,
      quizzes: [
        {
          text: "じゅんの好きなことは？",
          image: "jun.jpg",
          choices: [
            {
              text: "睡眠",
              feedback: "正解だよ！ロングスリーパーで困ってます💦",
              isCorrect: true,
            },
            {
              text: "旅行",
              feedback: "残念...旅行もいいよね！",
              isCorrect: false,
            },
            {
              text: "写真",
              feedback: "残念...良い写真撮れると嬉しいよね！",
              isCorrect: false,
            },
          ],
        },
        {
          text: "こうすけの好きなことは？",
          image: "kousuke.jpg",
          choices: [
            {
              text: "山登り",
              feedback: "残念...全然違うかな（笑）",
              isCorrect: false,
            },
            {
              text: "原付",
              feedback: "正解だよ！通学に山一つ超えるのにちょうどいいよ🛵",
              isCorrect: true,
            },
            {
              text: "ゲーム",
              feedback: "残念...ゲームも好きだけどちょっと違うかな...",
              isCorrect: false,
            },
          ],
        },
        {
          text: "りーふの好きなことは？",
          image: "leaf.jpg",
          choices: [
            {
              text: "ショッピング",
              feedback: "残念...好きだけどもっと好きなものがあるよ！",
              isCorrect: false,
            },
            {
              text: "K-popを聞く",
              feedback: "正解だよ！TWICEが一番すきです😍",
              isCorrect: true,
            },
            {
              text: "部屋の掃除",
              feedback: "残念...めっちゃ苦手です💦",
              isCorrect: false,
            },
          ],
        },
      ],
    }
  },
  methods: {
    answer(choice) {
      // フィードバックを返す
      this.feedback = choice.feedback
      if (choice.isCorrect) {
        if (this.quizIndex < this.quizzes.length - 1) {
          this.nextQuiz = true
        } else {
          this.nextQuiz = false
          alert("クイズは終わりだよ！！チーム No.1 について少し知れたかな？")
        }
      } else {
        this.nextQuiz = false
      }
      // 次の問題へ
    },
    next() {
      this.quizIndex++
      this.feedback = ""
      this.nextQuiz = false
    },
  },
  computed: {
    quizImagePath() {
      // 画像パス
      return require("@/views/images/" + this.currentQuiz.image)
    },
    currentQuiz() {
      return this.quizzes[this.quizIndex]
    },
  },
}
</script>

<style>
.app {
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: center;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
}

.quiz-image {
  height: 300px;
  width: 300px;
  object-fit: contain;
}

.container {
  display: flex;
  height: 2em;
  width: 300px;
  padding: 1em;
  justify-content: space-around;
}
</style>
