import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import index from '@/pages/index/index'
import detail from '@/pages/detail/detail'

Vue.use(Router)

const routes = [{
    path: '',
    redirect: '/index',
}, {
    path: '/index',
    component: index,
    // components: ()=>import('@/pages/index/index')
}, {
    path: '/detail',
    component: detail,
    // components: ()=>import('@/pages/detail/detail')
}];

export default new Router({
    routes: routes,
    scrollBehavior(to, from, savedPosition) {
        if(savedPosition) {
            return savedPosition;
        }
        else {
            return {x:0, y:0};
        }
    }
});
