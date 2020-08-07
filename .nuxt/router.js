import Vue from 'vue'
import Router from 'vue-router'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _0958038b = () => interopDefault(import('../pages/inspire.vue' /* webpackChunkName: "pages/inspire" */))
const _cd5eda4c = () => interopDefault(import('../pages/login.vue' /* webpackChunkName: "pages/login" */))
const _25c25fc2 = () => interopDefault(import('../pages/register.vue' /* webpackChunkName: "pages/register" */))
const _60ae207a = () => interopDefault(import('../pages/index.vue' /* webpackChunkName: "pages/index" */))
const _71102609 = () => interopDefault(import('../pages/_profile.vue' /* webpackChunkName: "pages/_profile" */))

// TODO: remove in Nuxt 3
const emptyFn = () => {}
const originalPush = Router.prototype.push
Router.prototype.push = function push (location, onComplete = emptyFn, onAbort) {
  return originalPush.call(this, location, onComplete, onAbort)
}

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: decodeURI('/'),
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/inspire",
    component: _0958038b,
    name: "inspire"
  }, {
    path: "/login",
    component: _cd5eda4c,
    name: "login"
  }, {
    path: "/register",
    component: _25c25fc2,
    name: "register"
  }, {
    path: "/",
    component: _60ae207a,
    name: "index"
  }, {
    path: "/:profile",
    component: _71102609,
    name: "profile"
  }],

  fallback: false
}

export function createRouter () {
  return new Router(routerOptions)
}
