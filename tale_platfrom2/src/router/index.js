import Vue from 'vue'
import Router from 'vue-router'

import Home from '@/pages/Home'
import Login from '@/pages/Login'

import HelloWorld from '../components/HelloWorld'

import AddDirector from '@/pages/director/Add'
import DirectorList from '@/pages/director/List'
import DetailAndUpdate from '../pages/director/DetailAndUpdate'

Vue.use(Router)

let router = new Router({
  routes: [
    {
      path:'/',
      name:'Home',
      component:Home,
      meta: {
        title: '登录页'
      }
    },
    {
      path:'/login',
      name:'login',
      component:Login,
      meta: {
        title: '登录页'
      }
    },
    {
      path: '/home',
      name: 'Home',
      component: Home,
      meta: {
        title: '首页'
      },
      children: [
        { path: '/HelloWorld', component: HelloWorld },

        { path: '/director/AddDirector', component: AddDirector },
        { path: '/director/DirectorList', component: DirectorList },
        { path: '/director/DetailAndUpdate', component: DetailAndUpdate },

      ]
    }
  ]
})

export default router;

