import Vue from 'vue';
import App from './app.vue';
// ui
import MintUi from 'mint-ui';
import 'mint-ui/lib/style.css';
Vue.use(MintUi);
// router
import VueRouter from 'vue-router';
Vue.use(VueRouter);
// mui
import './static/render/mui/dist/css/mui.css'
// 组件
import home from './components/home/home.vue';
// http请求
import VueResource from 'vue-resource';
Vue.use(VueResource);
// 引入moment处理时间 自定义过滤器
import Moment from 'moment';
Vue.filter('comenttime',function(time){
    return Moment(time).format('YYYY-MM-DD');
})
// global css
import './static/css/global.css';
// 注册一个全局组件title
import title from './components/common/title.vue';
Vue.component('mytitle',title);
// 引入news
import news from './components/news/news.vue';
import newsdetail from './components/news/newsdetail.vue';
import myconfig from './myconfig.js';
Vue.use(myconfig);
import share from './components/photo/share.vue';
import photodetail from './components/photo/photodetail.vue';
import VuePreview from 'vue-preview';
Vue.use(VuePreview);
import comments from './components/common/comment.vue';
Vue.component('mycomments',comments);
import goodslist from './components/goods/list.vue';
import goodsdetil from './components/goods/detail.vue';
import myswiper from './components/common/myswiper.vue';
Vue.component('myswiper', myswiper); 
import goodscomments from './components/goods/comments.vue';
import member from './components/member/member.vue';
import shopcart from './components/shopcart/shopcart.vue';
import search from './components/search/search.vue';





// 路由规则
let router = new VueRouter({
    linkActiveClass: 'mui-active'
});
router.addRoutes([
    {path: '/', redirect: '/home'},
    {path: '/home', component: home},
    {path: '/news/newslist',component: news},
    {path: '/news/detail/:id', component: newsdetail},
    {path: '/photo/share', component: share},
    {path: '/photo/detail/:id', component: photodetail},
    {path: '/goods/list', component: goodslist},
    {path: '/goods/detail/:id', component: goodsdetil},
    {path: '/goods/detailinfo/:id', component: newsdetail},
    {path: '/goods/comments/:id', component: goodscomments},
    {path: '/member', component: member},
    {path: '/shopcart', component: shopcart},
    {path: '/search', component: search},

]);
// render
new Vue({
    el: '#app',
    render: c=>c(App),
    router
});


