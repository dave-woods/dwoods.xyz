import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/Home.vue'
import Development from '@/views/Development.vue'
import Music from '@/views/Music.vue'
import Research from '@/views/Research.vue'
import Trampolining from '@/views/Trampolining.vue'
import Visual from '@/views/Visual.vue'
import Blog from '@/views/Blog.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/development',
    name: 'development',
    component: Development
  },
  {
    path: '/music',
    name: 'music',
    component: Music
  },
  {
    path: '/research',
    name: 'research',
    component: Research
  },
  {
    path: '/trampolining',
    name: 'trampolining',
    component: Trampolining
  },
  {
    path: '/visual',
    name: 'visual',
    component: Visual
  },
  {
    path: '/blog',
    redirect: '/blog/read'
  },
  {
    path: '/blog/write',
    name: 'write',
    props: { writing: true },
    component: Blog
  },
  {
    path: '/blog/read/',
    name: 'read',
    component: Blog
  },
  {
    path: '/blog/read/:postId',
    props: true,
    component: Blog
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

export default router
