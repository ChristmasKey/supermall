import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vConsole from 'vconsole'

var vconsole = new vConsole();

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
