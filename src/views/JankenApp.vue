<template>
  <div>
    <h1>じゃんけんゲーム</h1>
    <button v-for="choose in choices" v-bind:key="choose.number">
      {{ choose.te }}
    </button>
    <p>{{ player }}</p>
    <p>{{ pc }}</p>
    <p>{{ result }}</p>
  </div>
</template>
<script>
export default {
  data() {
    return {
      player: "",
      pc: "",
      result: "",
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
  methods() {},
}
</script>
<style></style>
