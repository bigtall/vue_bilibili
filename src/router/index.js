import Vue from 'vue'
import Router from 'vue-router'
import VueRouter from 'vue-router';

import register from '@/views/register'
import login from "@/views/login"
import userInfo from "../views/userInfo"
import edit from '../views/edit.vue'
import home from '../views/home.vue'


Vue.use(Router)

const routes = [
  {
    path: '/',
    component: home
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
    component: userInfo,
    meta: {
      istoken: true
    }
  },

  {
    path: '/edit',
    component: edit,
    meta: {
      istoken: true
    }
  },

]

const router = new VueRouter({
  routes,
  mode: 'history'
});

// 路由跳转拦截,判断需要token的页面需要直接跳转到登录页面
router.beforeEach((to, from, next) => {
  if ((!localStorage.getItem('token') || !localStorage.getItem('id')) && to.meta.istoken == true) {
    router.push('/login')
    Vue.prototype.$msg.fail('请新登录，本功能通过路由拦截判断')
    return
  }
  next();

});

export default router;
