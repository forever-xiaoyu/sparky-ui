import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/directory',
      name: 'directory',
      component: () => import('../views/Directory/Directory.vue'),
    },
    {
      path: '/carousel',
      name: 'carousel',
      component: () => import('../views/CarouselDemo/CarouselDemo.vue'),
    },
    {
      path: '/3dcarousel',
      name: '3dcarousel',
      component: () => import('../views/CarouselDemo/3dCarouselDemo.vue'),
    },
    {
      path: '/typeWriter',
      name: 'typeWriter',
      component: () => import('../views/TypeWriterDemo/index.vue'),
    },
    {
      path: '/toolBar',
      name: 'toolBar',
      component: () => import('../views/ToolBarDemo/index.vue'),
    },
  ],
})

export default router
