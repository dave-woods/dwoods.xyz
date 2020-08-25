import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/Home.vue'
import Section from '@/views/Section.vue'
import Blog from '@/views/Blog.vue'
import Write from '@/views/Write.vue'

import { auth } from '@/firebase'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/write/:id?',
    name: 'write',
    props: true,
    component: Write,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/read/:postSlug?',
    name: 'read',
    props: route => ({
      postSlug: route.params.postSlug,
      tag: route.query.tag,
      drafts: route.query.drafts
    }),
    component: Blog
  },
  {
    path: '/section/:sectionID',
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
