<template>
  <Header />
  <main class="main-view">
    <router-view />
  </main>
  <Footer />
</template>

<script>
import Header from "@/components/Header"
import Footer from "@/components/Footer"

export default {
  components: {
    Header,
    Footer,
  },
}
</script>

<style scoped>
.main-view {
  padding: 0 2rem;
  width: 100%;
  box-sizing: border-box;
}
</style>

<style>
body {
  color: #2c3e50;
  overflow-x: hidden;
}
</style>
