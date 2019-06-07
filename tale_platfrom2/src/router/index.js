import Vue from 'vue'
import Router from 'vue-router'

import Home from '../pages/Home'
import Login from '@/pages/Login'

import HelloWorld from '../components/HelloWorld'

import AddLost from '../pages/Lost/addLost'
import QueryLost from '../pages/Lost/queryLost'
import QueryHistory from '../pages/Lost/queryHistory'

import  AddFound from '../pages/Found/addFound'
import QueryFound from '../pages/Found/queryFound'

import  AddNotice from '../pages/Notice/addNotice'
import QueryNotice from '../pages/Notice/queryNotice'

import  AddThank from '../pages/Thank/addThank'
import QueryThank from '../pages/Thank/queryThank'
import Register from '../pages/Register'

import AddUser from '../pages/User/addUser'
import queryUser from '../pages/User/queryUser'

import Index from "../pages/Index"
Vue.use(Router)

let router = new Router({
  routes: [
    {
      path:'/',
      name:'login',
      component:Login,
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
      path: '/register',
      name: 'Register',
      component: Register
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
        { path: '/lost/addLost', component: AddLost},
        { path: '/lost/queryLost', component: QueryLost},
        { path: '/lost/queryHistory', component: QueryHistory},
        { path: '/found/addFound', component: AddFound},
        { path: '/found/queryFound', component: QueryFound},
        { path: '/notice/addNotice', component: AddNotice},
        { path: '/notice/queryNotice', component: QueryNotice},
        { path: '/Thank/AddThank', component: AddThank },
        { path: '/Thank/queryThank', component: QueryThank },

        { path: '/User/addUser', component:  AddUser},
        { path: '/User/queryUser', component:  queryUser},

        { path: '/index', component: Index },

      ]
    }
  ]
})
//访问之前，都检查下是否登录了
// router.beforeEach((to,from,next) =>{
//   if(to.path.startsWith("/login")){
//     window.sessionStorage.removeItem("access-token");
//     next();
//   } else{
//     let token = window.sessionStorage.getItem("access-token");
//     if(!token){
//       next("/login");
//     }else{
//       next();
//     }
//   }
// })
export default router;

