<template>
  <div class="play-area">
    <h2>Vue 神経衰弱</h2>
    <p>
      ？をクリックして同じ絵文字の組み合わせを探してください。
      全部で８組あります。
    </p>

    <div class="cards-container">
      <!-- カードがDOMに追加される直前にcardBeforeEnter,
      カードがDOMに追加されるときにcardEnterが呼び出されるので
      それぞれにフックする関数でアニメーション効果をつける -->
      <transition-group
        @before-enter="cardBeforeEnter"
        @enter="cardEnter"
        appear
      >
        <!-- カードはOpenedフラグによって表示/非表示を切り替える -->
        <div
          class="card"
          v-for="(card, i) in cards"
          :key="card.index"
          :data-index="i"
          @click="selectCard(card)"
        >
          {{ card.isOpened ? card.figure : card.face }}
        </div>
      </transition-group>
    </div>

    <div class="time">{{ time }}</div>
    <h2>{{ clearMessage }}</h2>
    <button v-if="allCleared" @click="retry">もう一度</button>
  </div>
</template>

<script>
import gsap from "gsap" //アニメーションのためのライブラリ
import _ from "underscore" //シャッフルに使用するライブラリ
export default {
  data() {
    return {
      cards: [], //カード
      select: [], //選択したカードを一時的に保持しておく配列
      fleeze: false, //お手付きフラグ
      timePassed: 0, //開始からの経過時間
      interval: undefined, //経過時間を測る用のタイマー
    }
  },
  computed: {
    /**
     * 全てクリア済みのときtrue
     * 内部のクリア判定と“もう一度”ボタンの表示に使う
     */
    allCleared() {
      return this.cards.every((value) => value.isCleared)
    },
    /**
     * クリア済みかどうかに応じて盤面の下のメッセージを切り替える
     */
    clearMessage() {
      return this.allCleared ? "おめでとう！" : "がんばって!"
    },
    /**
     * 盤面の下にある時間表示
     */
    time() {
      return this.timePassed === 0
        ? "いずれかのカードをクリックすると始まります。"
        : this.timePassed / 1000 + "秒"
    },
  },
  created() {
    // ページが読み込まれるときに初期化する
    this.initialize()
  },
  methods: {
    /**
     * カードオブジェクトを作成する
     * @param {number} index カードの通し番号
     * @param {string} face カードの表面
     * @param {string} figure カードの裏面（絵柄）
     * @return {Object} カード
     */
    createCard(index, face, figure) {
      return {
        index,
        face,
        figure,
        isOpened: false,
        isCleared: false,
        open() {
          this.isOpened = true
        },
        close() {
          this.isOpened = false
        },
      }
    },
    /**
     * 盤面の初期化
     * 絵柄配列からカードを生成する.
     */
    initialize() {
      this.cards = [
        "😆",
        "😆",
        "🍒",
        "🍒",
        "🥈",
        "🥈",
        "🀄",
        "🀄",
        "🎆",
        "🎆",
        "🎁",
        "🎁",
        "🥺",
        "🥺",
        "🐱",
        "🐱",
      ].map((fig, index) => this.createCard(index, "?", fig))
      this.cards = _.shuffle(this.cards)
    },
    /**
     * カードを選択する
     * @param {object} card カード
     */
    selectCard(card) {
      // もしタイマーが始動していなかったら始動する
      if (this.interval === undefined) {
        this.interval = setInterval(
          function () {
            this.timePassed += 10
          }.bind(this),
          10
        )
      }
      // お手付きでないとき、クリアしていない表のカードをクリックしたら
      // カードを裏返す
      // ２枚裏返したらペアかどうかの判定へ
      if (!card.isCleared && !card.isOpened && !this.fleeze) {
        card.open()
        this.select.push(card)
        if (this.select.length === 2) {
          this.test()
        }
      }
    },
    /**
     * 選択したカードが正しいペアか判定し、
     * 間違っていたら表にしてお手付きタイムを発動
     * 正しかったら選択したカードのクリア済みフラグを立てる
     * 全て正解したらタイマーストップ
     */
    test() {
      const [firstCard, secondCard] = this.select
      if (firstCard.figure != secondCard.figure) {
        this.fleeze = true
        setTimeout(
          function () {
            firstCard.close()
            secondCard.close()
            this.fleeze = false
          }.bind(this),
          1000
        )
      } else {
        firstCard.isCleared = true
        secondCard.isCleared = true
        if (this.allCleared) {
          clearInterval(this.interval)
          this.interval = undefined
        }
      }
      this.select = []
    },
    /**
     * カードのアニメーション関数(DOM表示直前)
     * 初期値を透明、本来の50％右に設定する
     * @param {*} el カード要素
     */
    cardBeforeEnter(el) {
      console.log("before enter")
      gsap.set(el, { opacity: 0, x: "50%" })
    },
    /**
     * カードのアニメーション関数(DOM表示時)
     * 本来の位置に1 + (何枚目) * 0.2秒後にたどり着く
     * @param {*} el カード要素
     * @param {*} done 表示完了時のコールバック（？）
     */
    cardEnter(el, done) {
      console.log("enter")
      gsap.to(el, {
        opacity: 1,
        x: 0,
        duration: 1,
        delay: el.dataset.index * 0.2,
        onComplete: done,
      })
    },
    /**
     * もう一度遊ぶ時用のリセット関数
     */
    retry() {
      this.initialize()
      this.timePassed = 0
    },
  },
}
</script>

<style scoped>
.play-area {
  display: flex;
  align-items: center;
  flex-direction: column;
}
.cards-container {
  display: flex;
  flex-direction: row;
  width: 14em;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
}
.card {
  display: inline-block;
  height: 2em;
  width: 2em;
  text-align: center;
  border: solid 1px;
  margin: 0.5em;
}
.time {
  margin: 1em;
}
</style>
