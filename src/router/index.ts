import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '@/views/HomePage.vue'
import Transactions from '@/views/Transactions.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      redirect: '/admin/dasboard',
    },
    {
      name: 'dashboard',
      path: '/admin/dasboard',
      component: HomePage,
    },
    {
      name: 'transactions',
      path: '/admin/transactions',
      component: Transactions,
    },
  ],
})

export default router
