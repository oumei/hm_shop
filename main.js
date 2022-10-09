import App from './App'
import { myRequest } from './util/api.js'
import { formatDate } from "./util/date.js"

// #ifndef VUE3
import Vue from 'vue'
Vue.config.productionTip = false
Vue.prototype.$myRequest = myRequest
Vue.filter('formatDate',(time)=>{
	time = time * 1000
	const date = new Date(time)
	return formatDate(date, 'yyyy-MM-dd hh:mm')
})
App.mpType = 'app'
const app = new Vue({
    ...App
})
app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
export function createApp() {
  const app = createSSRApp(App)
  return {
    app
  }
}
// #endif