import { createRouter, createWebHistory } from "vue-router"
import HomeView from "../views/HomeView.vue"
import MemoApp from "@/views/MemoApp.vue"
import QuizApp from "@/views/QuizApp.vue"
import PaletteApp from "@/views/PaletteApp.vue"
import TypingApp from "@/views/TypingApp.vue"
import KisekaeApp from "@/views/KisekaeApp.vue"
import JankenApp from "@/views/JankenApp.vue"
import ShinkeiApp from "@/views/ShinkeiApp.vue"

const routes = [
  {
    path: "/",
    name: "Home",
    component: HomeView,
  },
  {
    path: "/memo",
    name: "MemoApp",
    component: MemoApp,
  },
  {
    path: "/quiz",
    name: "QuizApp",
    component: QuizApp,
  },
  {
    path: "/palette",
    name: "PaletteApp",
    component: PaletteApp,
  },
  {
    path: "/typing",
    name: "TypingApp",
    component: TypingApp,
  },
  {
    path: "/kisekae",
    name: "KisekaeApp",
    component: KisekaeApp,
  },
  {
    path: "/janken",
    name: "JankenApp",
    component: JankenApp,
  },
  {
    path: "/shinkei-suijaku",
    name: "ShinkeiApp",
    component: ShinkeiApp,
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
