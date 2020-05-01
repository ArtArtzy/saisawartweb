import Vue from 'vue'
import VueRouter from 'vue-router'

import routes from './routes'

Vue.use(VueRouter)

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyCow_qyDpuhp_PyYyg32p9oIUV1xsKpFm8",
  authDomain: "saisawart-52861.firebaseapp.com",
  databaseURL: "https://saisawart-52861.firebaseio.com",
  projectId: "saisawart-52861",
  storageBucket: "saisawart-52861.appspot.com",
  messagingSenderId: "182376624637",
  appId: "1:182376624637:web:f259765e8e9f4103416994",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
export const db = firebase.firestore();
const storage = firebase.storage();
export const st = storage.ref()
/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Router instance.
 */

export default function (/* { store, ssrContext } */) {
  const Router = new VueRouter({
    scrollBehavior: () => ({ x: 0, y: 0 }),
    routes,

    // Leave these as they are and change in quasar.conf.js instead!
    // quasar.conf.js -> build -> vueRouterMode
    // quasar.conf.js -> build -> publicPath
    mode: process.env.VUE_ROUTER_MODE,
    base: process.env.VUE_ROUTER_BASE
  })

  return Router
}
