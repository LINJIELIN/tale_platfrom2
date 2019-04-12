// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from  'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

Vue.config.productionTip = false
Vue.use(ElementUI)

/* eslint-disable no-new  1962-06-21T16:00:00.000+0000 */

/*Vue.filter('dateString', function (value) {
  if (!value) return ''
  value = value.toString();
  value = value.substr(0,10);
  return value;
})*/

new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
