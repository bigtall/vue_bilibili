import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import register from '@/views/register'
import login from "@/views/login"
import userInfo from "../views/userInfo"

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: register
    },

    {
      path: '/register',
      component: register
    },
    {
      path: '/login',
      component: login
    },
    {
      path: '/userinfo',
      component: userInfo
    }
  ]
})
