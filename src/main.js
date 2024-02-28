// main.js
import Vue from 'vue'
import App from './App.vue'
import 'jquery'; // Importa jQuery antes que Bootstrap
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'

import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
new Vue({
  render: (h) => h(App)
}).$mount('#app')
