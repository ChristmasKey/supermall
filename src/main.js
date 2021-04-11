import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vConsole from 'vconsole'
import store from './store'

// var vconsole = new vConsole();

Vue.config.productionTip = false

// Vue.prototype.$bus = new Vue();

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
