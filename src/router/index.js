import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/Home'
import { isLoggedIn } from '@/apiWrapper'
import needLoggedIn from './needLoggedIn'
import needLoggedOut from './needLoggedOut'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    ...needLoggedIn,
    ...needLoggedOut
  ]
})

router.beforeEach((to, from, next) => {
  // Check if the route requires to be logged out
  if (needLoggedOut.find(x => x.name === to.name) && isLoggedIn())
    return next({ name: 'Home' })

  // Check if the route requires to be logged in
  if (needLoggedIn.find(x => x.name === to.name) && !isLoggedIn())
    return next({ name: 'Login' })

  next()
})

export default router
