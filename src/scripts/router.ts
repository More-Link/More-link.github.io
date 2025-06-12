import { createRouter, createWebHistory } from 'vue-router'

export enum ROUTER_NAME {
  HOME = 'home',
  CDN_P2P = 'cdn_p2p',
  PCDN = 'pcdn',
  SOLUTION = 'solution',
  ABOUT = 'about',
}

const routes = [
  { path: '/', name: ROUTER_NAME.HOME, component: () => import('../pages/Home/index.vue') },
  { path: '/cdn_p2p', name: ROUTER_NAME.CDN_P2P, component: () => import('../pages/CdnP2P/index.vue') },
  { path: '/pcdn', name: ROUTER_NAME.PCDN, component: () => import('../pages/Pcdn.vue') },
  { path: '/solution', name: ROUTER_NAME.SOLUTION, component: () => import('../pages/Solution/index.vue') },
  { path: '/about', name: ROUTER_NAME.ABOUT, component: () => import('../pages/About/index.vue') },
]

export const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior (_, __, savedPosition) {
    if (savedPosition) return savedPosition
    return { top: 0, left: 0, behavior: 'smooth' }
  }
})
