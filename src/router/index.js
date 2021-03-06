import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import PanelLogin from '../views/LoginPanel.vue'
import Panel from '../views/Panel.vue'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/panel/login',
    name: 'LoginPanel',
    component: PanelLogin
  },
  {
    path: '/panel',
    name: 'Panel',
    component: Panel
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
