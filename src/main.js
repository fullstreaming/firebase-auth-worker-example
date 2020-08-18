import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false

const authentication = async () => {
  const user = await store.dispatch('authenticate')
  if (user) {
    router.push({ name: 'Home' })
  }
}
authentication()

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
