import Vue from 'vue'
import VueRouter from 'vue-router'
import Cover from '../views/coverPage/Cover.vue'
import Login from '../views/login/Login.vue'
import Register from '../views/register/Register.vue'

import homePageRouter from './homePage/homePage';

const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
};
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: Cover
  },
  {
    path: '/login',
    component: Login
  },
  {
    path: '/register',
    component: Register
  },
  
  ...homePageRouter
]

const router = new VueRouter({
  routes
})

export default router
