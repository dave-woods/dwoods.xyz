import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/Home.vue'
import Section from '@/views/Section.vue'
import Blog from '@/views/Blog.vue'

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
    path: '/section/:sectionId',
    props: true,
    component: Section
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
