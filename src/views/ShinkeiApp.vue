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
          v-for="(flag, index) in cardsOpened"
          :key="index"
          :data-index="index"
          @click="selectCard(index)"
        >
          {{ flag ? cardsFigure[index] : cards[index] }}
        </div>
      </transition-group>
    </div>

    <div class="time">{{ time }}</div>
    <h2>{{ clearMessage }}</h2>
    <button v-if="this.cardsCleard.every((value) => value)" @click="retry">
      もう一度
    </button>
  </div>
</template>

<script>
import gsap from "gsap" //アニメーションのためのライブラリ
import _ from "underscore" //シャッフルに使用するライブラリ
export default {
  data() {
    return {
      // カードの表
      cards: [
        "?",
        "?",
        "?",
        "?",
        "?",
        "?",
        "?",
        "?",
        "?",
        "?",
        "?",
        "?",
        "?",
        "?",
        "?",
        "?",
      ],
      // カードの裏
      cardsFigure: _.shuffle([
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
      ]),
      // カードが裏返されているかのフラグ
      cardsOpened: [
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
      ],
      // カードがペア達成済みかどうかのフラグ
      cardsCleard: [
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
      ],
      select: [], //選択したカードを一時的に保持しておく配列
      fleeze: false, //お手付きフラグ
      timePassed: 0, //開始からの経過時間
      interval: undefined, //経過時間を測る用のタイマー
    }
  },
  computed: {
    clearMessage() {
      return this.cardsCleard.every((value) => value)
        ? "おめでとう！"
        : "がんばって!"
    },
    time() {
      return this.timePassed === 0
        ? "いずれかのカードをクリックすると始まります。"
        : this.timePassed / 1000 + "秒"
    },
  },
  methods: {
    /**
     * カードを裏返す（絵文字が見えるようにする）
     * @param {Number} index 何枚目のカードか
     */
    openCard(index) {
      this.cardsOpened[index] = true
    },
    /**
     *カードを表返す（絵文字が見えないようにする）
     * @param {Number} index 何枚目のカードか
     */
    closeCard(index) {
      this.cardsOpened[index] = false
    },
    /**
     * カードを選択する
     * @param {Number} index 何枚目のカードか
     */
    selectCard(index) {
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
      if (
        !this.cardsCleard[index] &&
        !this.cardsOpened[index] &&
        !this.fleeze
      ) {
        this.openCard(index)
        this.select.push(index)
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
      // 選択したカード
      const firstCardFig = this.cardsFigure[this.select[0]]
      const secondCardFig = this.cardsFigure[this.select[1]]
      if (firstCardFig !== secondCardFig) {
        // お手付きの処理
        this.fleeze = true
        setTimeout(
          function () {
            this.closeCard(this.select[0])
            this.closeCard(this.select[1])
            this.select = []
            this.fleeze = false
          }.bind(this),
          1000
        )
      } else {
        // 正解の処理
        this.cardsCleard[this.select[0]] = true
        this.cardsCleard[this.select[1]] = true
        this.select = []
        if (this.cardsCleard.every((value) => value)) {
          clearInterval(this.interval)
          this.interval = undefined
        }
      }
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
      this.cardsFigure = _.shuffle([
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
      ])
      this.cardsOpened = [
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
      ]
      this.cardsCleard = [
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
      ]
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
