<template>
  <h1>Vue メモ</h1>
  <div class="memo-list">
    <ul class="memo-list__container">
      <!--
        メモの1要素(li)はチェックボックス,  本体, 削除ボタンからなる.
        チェックボックスの入力はitem.isDoneに結びつける.
        item.isDoneがtrueのときメモ本文のdivに'memo__text--done'を付与することで
        メモに打消し線を引くことができる.
      -->
      <li class="memo" v-for="(item, index) in items" v-bind:key="index">
        <div class="memo__checkbox">
          <input type="checkbox" v-model="item.isDone" />
        </div>
        <div
          class="memo__text"
          v-bind:class="{ 'memo__text--done': item.isDone }"
        >
          {{ index + 1 }}:{{ item.text }}
        </div>
        <button class="memo__delete" v-on:click="removeItem(index)">
          削除
        </button>
      </li>
      <!-- <li class="memo">
        <div class="memo__checkbox">
          <input type="checkbox" />
        </div>
        <div class="memo__text memo__text--done">ひき肉を300g買う</div>
        <button class="memo__delete">削除</button>
      </li>
      -->
    </ul>
    <div class="add-memo-field">
      <input
        class="add-memo-field__input"
        type="text"
        v-model="memoInput"
        v-on:keydown.enter="addItem"
        placeholder="メモを入力(エンターキーで追加)"
      />
      <button class="add-memo-field__button" v-on:click="addItem">追加</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      items: [
        { text: "コードを書く", isDone: false },
        { text: "コミットする", isDone: false },
        { text: "レビューをもらう", isDone: false },
      ],
      memoInput: "",
    }
  },
  methods: {
    addItem: function () {
      if (this.memoInput != "") {
        this.items.push({ text: this.memoInput, isDone: false })
        this.memoInput = ""
      }
    },
    removeItem: function (index) {
      this.items.splice(index, 1)
    },
  },
}
</script>

<style scoped>
.memo-list {
  padding-left: 5rem;
  padding-right: 5rem;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  max-width: 512px;
  margin-left: auto;
  margin-right: auto;
}

.memo-list__container {
  padding: 0;
}

.memo {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem;
  border-radius: 5px;
}

.memo:hover {
  color: white;
  background-color: #b23b61;
}

.memo__text {
  margin-left: 2rem;
  text-align: left;
}

.memo__text--done {
  text-decoration-line: line-through;
}

.memo__delete {
  margin-left: 1rem;
  padding: 0.5rem 0.5rem;
  border: solid 1px black;
  border-radius: 5px;
  background-color: white;
}

.memo__delete:hover {
  background-color: #b2ae3b;
  border-radius: 5px;
}

.add-memo-field {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.add-memo-field__input {
  padding: 10px;
}
.add-memo-field__button {
  padding: 0.5rem 0.5rem;
  border: solid 1px black;
  border-radius: 5px;
  background-color: white;
}

.add-memo-field__button:hover {
  background-color: #b2ae3b;
  border-radius: 5px;
}
</style>
