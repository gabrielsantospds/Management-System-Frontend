import { createRouter, createWebHistory } from 'vue-router'
import TranslatorView from '../views/translator/TranslatorView.vue'
import TranslatorsList from '../views/translator/TranslatorList.vue'
import DocumentsList from '../views/document/DocumentList.vue'
import DocumentView from '../views/document/DocumentView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    // Translator routes
    {
      path: '/newTranslator',
      name: 'newTranslator',
      component: TranslatorView
    },
    {
      path: '/translatorList',
      name: 'translatorList',
      component: TranslatorsList
    },
    {
      path: '/editTranslator/:id',
      name: 'editTranslator',
      component: TranslatorView,
      props: true
    },

    // Document routes
    {
      path: '/newDocument',
      name: 'newDocument',
      component: DocumentView
    },
    {
      path: '/documentList',
      name: 'documentList',
      component: DocumentsList
    },
    {
      path: '/editDocument/:id',
      name: 'editDocument',
      component: DocumentView,
      props: true
    }
  ]
})

export default router
