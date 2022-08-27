<template>
  <!-- 天気 -->
  <h3>現在の天気(簡易版)</h3>
  <div class="weather">
    <div class="prefecture">
      地域を選択してください。
      <select
        name="prefecture"
        v-on:change="weatherChange"
        v-bind:style="{ color: `rgba(${red},${green}, ${blue}, ${alpha})` }"
      >
        <option v-bind:disabled="!disabled">選択してください</option>
        <option value="016000">北海道</option>
        <option value="020000">青森</option>
        <option value="030000">岩手</option>
        <option value="040000">宮城</option>
        <option value="050000">秋田</option>
        <option value="060000">山形</option>
        <option value="070000">福島</option>
        <option value="080000">茨城</option>
        <option value="090000">栃木</option>
        <option value="100000">群馬</option>
        <option value="110000">埼玉</option>
        <option value="120000">千葉</option>
        <option value="130000">東京</option>
        <option value="140000">神奈川</option>
        <option value="150000">新潟</option>
        <option value="160000">富山</option>
        <option value="170000">石川</option>
        <option value="180000">福井</option>
        <option value="190000">山梨</option>
        <option value="200000">長野</option>
        <option value="210000">岐阜</option>
        <option value="220000">静岡</option>
        <option value="230000">愛知</option>
        <option value="240000">三重</option>
        <option value="250000">滋賀</option>
        <option value="260000">京都</option>
        <option value="270000">大阪</option>
        <option value="280000">兵庫</option>
        <option value="290000">奈良</option>
        <option value="300000">和歌山</option>
        <option value="310000">鳥取</option>
        <option value="320000">島根</option>
        <option value="330000">岡山</option>
        <option value="340000">広島</option>
        <option value="350000">山口</option>
        <option value="360000">徳島</option>
        <option value="370000">香川</option>
        <option value="380000">愛媛</option>
        <option value="390000">高知</option>
        <option value="400000">福岡</option>
        <option value="410000">佐賀</option>
        <option value="420000">長崎</option>
        <option value="430000">熊本</option>
        <option value="440000">大分</option>
        <option value="450000">宮崎</option>
        <option value="460100">鹿児島</option>
        <option value="471000">沖縄</option>
      </select>
    </div>
    <div>{{ weatherReport }}</div>
    <img class="weatherImg" v-bind:src="weatherImg" />
  </div>
  <!--パレット-->
  <h1 v-bind:style="{ color: `rgba(${red},${green}, ${blue}, ${alpha})` }">
    Vue パレット
  </h1>
  <div class="app">
    <div
      class="palette"
      v-bind:style="{
        backgroundColor: `rgba(${red},${green}, ${blue}, ${alpha})`,
      }"
      v-on:mousemove="changeColor"
      v-on:click="pickColor"
    ></div>
    <div class="blue">
      Blue
      <input type="range" min="0" max="255" v-model="blue" />
    </div>
    <div class="blue">
      Alpha
      <input type="range" min="0" max="1" step="0.1" v-model="alpha" />
    </div>
    <p v-bind:style="{ color: `rgba(${red},${green}, ${blue}, ${alpha})` }">
      rgba({{ red }},{{ green }}, {{ blue }}, {{ alpha }})
    </p>
    <div class="colors-container">
      <div
        class="mini-palette"
        v-for="(color, index) in colors"
        v-bind:key="index"
        v-bind:color="color"
        v-bind:style="{
          backgroundColor: `rgba(${color.red},${color.green}, ${color.blue}, ${color.alpha})`,
        }"
        v-on:click="showColor(color)"
      ></div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      disabled: true,
      red: 0,
      green: 0,
      blue: 0,
      alpha: 1,
      colors: [
        //クリック時にここに追加される
      ],
      weatherImg: "",
      weatherAll: "",
      weather: "",
      weatherNumber: "",
      weatherReport: "",
    }
  },

  methods: {
    weatherChange: function (e) {
      this.disabled = false
      fetch(
        `https://www.jma.go.jp/bosai/forecast/data/forecast/${e.target.value}.json`
      )
        .then((res) => {
          return res.json()
        })
        .then((value) => {
          this.weatherAll = value
          this.weather = this.weatherAll[0].timeSeries[0].areas[0].weathers[0]
          this.weatherNumber =
            this.weatherAll[0].timeSeries[0].areas[0].weatherCodes[0]
          this.weatherReport =
            this.weather + "(" + this.weatherAll[0].reportDatetime + ")"
          if (this.weatherNumber < 200) {
            this.weatherImg = require("./images/sunny.png")
          } else if (this.weatherNumber < 300) {
            this.weatherImg = require("./images/cloudy.png")
          } else if (this.weatherNumber < 400) {
            this.weatherImg = require("./images/rainy.png")
          } else {
            this.weatherImg = require("./images/snowy.png")
          }
        })
    },
    //色を変える
    changeColor: function (e) {
      this.red = e.offsetX
      this.green = e.offsetY
    },
    //クリック時の色をcolorsに格納
    pickColor: function () {
      this.colors.push({
        red: this.red,
        green: this.green,
        blue: this.blue,
        alpha: this.alpha,
      })
    },
    showColor: function (color) {
      this.red = color.red
      this.green = color.green
      this.blue = color.blue
      this.alpha = color.alpha
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
}
.weatherImg {
  width: 100%;
}
.palette {
  width: 255px;
  height: 255px;
}
.mini-palette {
  min-width: 60px;
  height: 60px;
}
.colors-container {
  display: flex;
  flex-wrap: wrap;
  width: 300px;
  padding-top: 8px;
}
</style>
