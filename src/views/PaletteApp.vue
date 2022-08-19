<template>
  <h1>Vue パレット</h1>
  <div class="app">
    <div
      class="palette"
      v-bind:style="{ backgroundColor: bgColor }"
      v-on:mousemove="changeColor"
      v-on:click="pickColor"
    ></div>
    <p>{{ bgColor }}</p>
    <div class="colors-container">
      <div
        class="mini-palette"
        v-for="(color, index) in colors"
        v-bind:key="index"
        v-bind:color="color"
        v-bind:style="{ backgroundColor: color }"
        v-on:click="showColor(color)"
      ></div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      red: 0,
      green: 0,
      colors: [
        //クリック時にここに追加される
      ],
      bgColor: "rgba(0, 0, 200, 0.5)",
    }
  },

  methods: {
    //色を変える
    changeColor: function (e) {
      this.red = e.offsetX
      this.green = e.offsetY
      //文字列にしちゃえー！という力技(笑)
      this.bgColor = "rgba(" + this.red + "," + this.green + ", 200, 0.5)"
    },
    //クリック時の色をcolorsに格納
    pickColor: function () {
      this.colors.push(this.bgColor)
    },
    showColor: function (color) {
      this.bgColor = color
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
