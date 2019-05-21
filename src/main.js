// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from '@/App'
import router from '@/router'
import store from '@/store'

//第三方库
import MintUI, { Indicator, Toast } from 'mint-ui'
import 'mint-ui/lib/style.css'
import VueProgressBar from 'vue-progressbar'

//自定义
import '@/assets'
import '@/filters'
import '@/mock'

//第三方
Vue.use(MintUI);
Vue.prototype.$indicator = Indicator
Vue.prototype.$toast = Toast
Vue.use(VueProgressBar, {
    color: 'rgb(143, 255, 199)',  //进度条颜色
    failedColor: 'red',  //失败现实的颜色
    height: '2px'  //进度条高度
});

//全局错误捕捉
if(process.env.NODE_ENV === 'production') {
    Vue.config.errorHandler = function(error, vm, info) {
        console.log(error);
        Toast(info);
    };
}

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: {
    App
  },
  template: '<App/>'
});
/*new Vue({
    router,
    store,
    render: h=>h(App)
}).$mount('#app');*/
