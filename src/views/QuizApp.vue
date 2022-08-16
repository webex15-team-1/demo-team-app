<template>
  <h1>Vue クイズ</h1>
  <div class="app">
    <h2>Q. {{ quiz.text }}</h2>
    <img class="quiz-image" src="quizImagePath()" alt="クイズ画像" />
    <div class="container">
      <button
        v-for="(choice, index) in quiz.choices"
        v-bind:key="index"
        v-on:click="answer(choice)"
      >
        {{ choice.text }}
      </button>
    </div>
    <div>{{ feedback }}</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      feedback: "",
      quiz: {
        text: "じゅんの好きなことは？",
        image: "sleep.jpg",
        choices: [
          {
            text: "睡眠",
            feedback: "正解だよ！ロングスリーパーで困ってます💦",
          },
          {
            text: "旅行",
            feedback: "残念...旅行もいいよね！",
          },
          {
            text: "写真",
            feedback: "残念...良い写真撮れると嬉しいよね！",
          },
        ],
      },
    }
  },
  methods: {
    answer(choice) {
      this.feedback = choice.feedback
    },
  },
  computed: {
    quizImagePath() {
      return "./images/" + this.quiz.image
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
