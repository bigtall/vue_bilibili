import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import register from '@/views/register'

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
    }
  ]
})
