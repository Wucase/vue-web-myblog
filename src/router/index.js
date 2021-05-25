import Vue from 'vue'
import VueRouter from 'vue-router'
import BlogRouters from './blogRouters/blogRouters';

const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
};
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: () => import("@/views/coverPage/Cover.vue")
  },
  {
    path: '/login',
    component: () => import("@/views/login/Login.vue")
  },
  {
    path: '/register',
    component: () => import("@/views/register/Register.vue")
  },
  {
    path: '/blog',
    component: () => import("@/views/blog/Blog.vue"),
    children:[
      ...BlogRouters
    ],
  },
  
  
]

const router = new VueRouter({
  routes
})

export default router
