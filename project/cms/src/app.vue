<template>
    <div>
        <mt-header title="CMS系统"></mt-header>
        <router-view></router-view>
        <nav class="mui-bar mui-bar-tab">
			<router-link to='/home' class="mui-tab-item" href="#tabbar">
				<span class="mui-icon mui-icon-home"></span>
				<span class="mui-tab-label">首页</span>
			</router-link>
			<router-link to='/member' class="mui-tab-item" href="#tabbar-with-chat">
				<span class="mui-icon mui-icon-member"></span>
				<span class="mui-tab-label">会员</span>
			</router-link>
			<router-link to='/shopcart' class="mui-tab-item" href="#tabbar-with-contact">
				<span class="mui-icon mui-icon-shopcart"><span class="mui-badge">{{num}}</span></span>
				<span class="mui-tab-label">购物车</span>
			</router-link>
			<router-link to='/search' class="mui-tab-item" href="#tabbar-with-map">
				<span class="mui-icon mui-icon-search"></span>
				<span class="mui-tab-label">查找</span>
			</router-link>
		</nav>
    </div>
</template>
<script>
import connect from './components/common/connect.js';
import shopcart from './components/common/shopcart.js';
    export default {
        data: function(){
            return {
				num: 0
            }
        },
		created(){
			this.num = shopcart.getTotalCount();
			let that = this;
			connect.$on('addcart',
			(num)=>{
				this.num+=num;
			}
			// function(num){
			// 	that.num += num;
			// }
			)
		}
    }
</script>
<style>

</style>