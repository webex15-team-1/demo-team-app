<template>
  <h1>Home</h1>
  <div class="link">
    <router-link to="/quiz" class="link__home"><div>クイズへ</div></router-link>
    <router-link to="/palette" class="link__home"
      ><div>パレットへ</div></router-link
    >
    <router-link to="/memo" class="link__home"><div>メモへ</div></router-link>
    <router-link to="/janken" class="link__home"
      ><div>じゃんけんへ</div></router-link
    >
    <router-link to="/typing" class="link__home"
      ><div>タイピングへ</div></router-link
    >
    <router-link to="/kisekae" class="link__home"
      ><div>着せ替えへ</div></router-link
    >
    <router-link to="/shinkei-suijaku" class="link__home"
      ><div>神経衰弱へ</div></router-link
    >
  </div>
</template>

<style>
.link {
  display: flex;
  flex-wrap: wrap;
  gap: 30px;
  justify-content: space-around;
}

.link__home {
  display: flex;
  justify-content: center;
  align-items: center;
  /* リンクを中央ぞろえ */
  width: 250px;
  height: 100px;
  text-align: center;
  font-size: 30px;
  color: #4f4c59;
  background-color: #a3bf3f;
  border-radius: 60px;
  border-bottom: 10px solid #465902;
}

.link__home:hover {
  margin-top: 7px;
  border-bottom: 3px solid #465902;
  /* 合計で元のボーダーと等しくする */
  transition: 0.3s;
  color: #592e42;
}
</style>
