// src/router.js
import { createRouter, createWebHistory } from 'vue-router'
import TextsView from '../views/TextsView.vue'


const routes = [
  {
    path: '/',
    name: 'Texts',
    component: TextsView // Здесь должно быть TextsView, а не TextsView
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router