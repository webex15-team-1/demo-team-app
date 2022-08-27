<template>
  <Header />

  <router-view />

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

<style scoped></style>

<style>
body {
  color: #2c3e50;
  overflow-x: hidden;
}
</style>
