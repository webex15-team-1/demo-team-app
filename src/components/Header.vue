<template>
  <header class="header">
    <div class="header__titles">
      <img src="@/assets/logo.png" alt="vue logo" width="50" height="50" />
      <h2>Vue 小作品集</h2>
    </div>
    <nav class="navigation">
      <router-link
        to="/"
        class="navigation__link"
        exact-active-class="navigation__link--exact-active"
        >Home</router-link
      >
      |
      <router-link
        to="/quiz"
        class="navigation__link"
        exact-active-class="navigation__link--exact-active"
        >クイズ</router-link
      >|
      <router-link
        to="/palette"
        class="navigation__link"
        exact-active-class="navigation__link--exact-active"
        >パレット</router-link
      >|
      <router-link
        to="/memo"
        class="navigation__link"
        exact-active-class="navigation__link--exact-active"
        >メモ</router-link
      >|
      <router-link
        to="/janken"
        class="navigation__link"
        exact-active-class="navigation__link--exact-active"
        >じゃんけん</router-link
      >|
      <router-link
        to="/typing"
        class="navigation__link"
        exact-active-class="navigation__link--exact-active"
        >タイピング</router-link
      >|
      <router-link
        to="/kisekae"
        class="navigation__link"
        exact-active-class="navigation__link--exact-active"
        >着せ替え</router-link
      >|
      <router-link
        to="/shinkei-suijaku"
        class="navigation__link"
        exact-active-class="navigation__link--exact-active"
        >神経衰弱
      </router-link>
    </nav>
  </header>
</template>

<style scoped>
.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 2rem;
}

.header__titles {
  display: flex;
  align-items: center;
  gap: 2rem;
}

.navigation {
  display: flex;
  justify-content: center;
  align-items: flex-end;
  gap: 0.8rem;
  font-size: 20px;
}

.navigation__link {
  font-weight: bold;
  color: #2c3e50;
}

.navigation__link--exact-active {
  color: #42b983;
}
</style>
