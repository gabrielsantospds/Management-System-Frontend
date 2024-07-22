import { createRouter, createWebHistory } from 'vue-router'
import TranslatorView from '../views/TranslatorView.vue'
import TranslatorsList from '../views/TranslatorsList.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/newTranslator',
      name: 'newTranslator',
      component: TranslatorView
    },
    {
      path: '/translatorsList',
      name: 'translatorsList',
      component: TranslatorsList
    }
  ]
})

export default router
