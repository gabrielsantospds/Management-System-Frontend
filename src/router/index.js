import { createRouter, createWebHistory } from 'vue-router'
import TranslatorView from '../views/TranslatorView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: TranslatorView
    }
  ]
})

export default router
