import Vue from 'vue';
import App from './app';
import VueRouter from 'vue-router';
import mixin from './mixin'
import routes from './routesMap'
import VueResource from 'vue-resource'

Vue.use(VueResource);
//region 路由
const router = new VueRouter({
    routes
})
Vue.use(VueRouter);
//endregion


//region 组件
import {Header, Button, Toast, Indicator} from 'mint-ui'

Vue.component(Header.name, Header);
Vue.component(Button.name, Button);
// Vue.component(Indicator.name, Indicator);
// Vue.component(Toast.name, Toast);//无效的
//endregion


// region confige
//解决没有传cookie到服务器的问题
Vue.http.interceptors.push((request, next) => {
    request.credentials = true;

    // if(!userHelp.isLogin()) {
    //     //有用的其实是下面这句话，不知道为什么 用了之后就没有Cookie了。但是不行用了之后其他请求都失败了403
    //     request.headers.set('lkm', 'sssjdlsjdklsj');
    //     request.headers.set('Cookie', '');
    //     request.headers.delete("Cookie")
    // }
    next();
});
//endregion


var onRun = function () {
    Vue.mixin(mixin);
    new Vue({ // eslint-disable-line
        el: '#app',
        router,
        render: h => h(App)
    });
}

// if(typeof plus === 'object'){
//     document.addEventListener('plusready', function () {
//         onRun();
//     }, false);
//
// }else {
//     console.log("======onRun")
//     onRun();
// }
//目前还没有用的plus的地方。需要延迟的
onRun();
