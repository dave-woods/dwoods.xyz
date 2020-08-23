import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/Home.vue'
import Section from '@/views/Section.vue'
import Blog from '@/views/Blog.vue'

import { auth } from '@/firebase'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/blog',
    redirect: '/blog/read'
  },
  {
    path: '/blog/write',
    name: 'write',
    props: { writing: true },
    component: Blog,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/blog/read/',
    name: 'read',
    component: Blog
  },
  {
    path: '/blog/read/:postSlug',
    props: true,
    component: Blog
  },
  {
    path: '/blog/tag/:tag',
    props: true,
    component: Blog
  },
  {
    path: '/section/:sectionId',
    props: true,
    component: Section
  },
  {
    path: '/research',
    redirect: '/section/research'
  },
  {
    path: '*',
    name: '404',
    component: () => import('@/views/404.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(x => x.meta.requiresAuth)

  if (requiresAuth && !auth.currentUser) {
    alert('Sign in required')
    if (from.name === null) next('/')
  } else {
    next()
  }
})

export default router
