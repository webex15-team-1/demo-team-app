<template>
  <h1>Home</h1>
  <div class="link">
    <router-link to="/quiz" class="link__home">クイズへ</router-link>
    <router-link to="/palette" class="link__home">パレットへ</router-link>
    <router-link to="/memo" class="link__home">メモへ</router-link>
    <router-link to="/janken" class="link__home">じゃんけんへ</router-link>
    <router-link to="/typing" class="link__home">タイピングへ</router-link>
    <router-link to="/kisekae" class="link__home">着せ替えへ</router-link>
    <router-link to="/shinkei-suijaku" class="link__home"
      >神経衰弱へ</router-link
    >
  </div>
</template>

<style>
.link {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}

.link__home {
  width: 250px;
  height: 50px;
  text-align: center;
  font-size: 24px;
  color: #d9d9d9;
  background-color: #495b73;
  margin: 10px;
}
</style>
