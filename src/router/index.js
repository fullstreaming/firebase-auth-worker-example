import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'

Vue.use(VueRouter)

const notAuthenticated = (to, from, next) => {
  if (!store.state.authenticated) {
    next()
    return
  }
  next({ name: 'Home' })
}

const isAuthenticated = (to, from, next) => {
  if (store.state.authenticated) {
    next()
    return
  }
  next({ name: 'Login' })
}

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    beforeEnter: isAuthenticated
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    beforeEnter: notAuthenticated
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
