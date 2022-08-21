<template>
  <h1>Home</h1>
  <div class="link">
    <router-link to="/quiz" class="link__home">クイズへ</router-link>
    <router-link to="/pallete" class="link__home">パレットへ</router-link>
    <router-link to="/memo" class="link__home">メモへ</router-link>
    <router-link to="/typing" class="link__home">タイピングへ</router-link>
  </div>
</template>

<style>
.link {
  display: flex;
  flex-direction: column;
}

.link__home {
  font-weight: bold;
  font-size: 24px;
  color: #2c3e50;
}
</style>
