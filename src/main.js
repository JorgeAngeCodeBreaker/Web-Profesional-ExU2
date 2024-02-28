// main.js
import Vue from 'vue'
import App from './App.vue'
import 'jquery'; // Importa jQuery antes que Bootstrap
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';


new Vue({
  render: (h) => h(App)
}).$mount('#app')
