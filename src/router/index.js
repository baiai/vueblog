import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/homepage/Home'
import Admin from '@/components/adminpage/Home'
import Detail from '@/components/homepage/Detail'
import CategoryFilter from '@/components/homepage/CategoryFilter'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/admin',
      name: 'Admin',
      component: Admin
    },
    {
      path: '/detail',
      name: 'Detail',
      component: Detail
    },
    {
      path: '/category',
      name: 'CategoryFilter',
      component: CategoryFilter
    }
  ]
})
