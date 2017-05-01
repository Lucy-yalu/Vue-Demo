<template>
    <div>
        <mytitle title='商品详情'></mytitle>
        <div class="outer-swiper">
            <div class="swiper">
                <myswiper :imgs='imgs'></myswiper>
            </div>
        </div>
        <div class="product-desc">
            <ul>
                <li><span class="product-desc-span">
                    {{proinfo.title}}
                </span></li>
                <li class="price-li">市场价：
                    <s>￥{{proinfo.market_price}}</s> 销售价：<span>￥{{proinfo.sell_price}}</span></li>
                <li class="number-li">购买数量：<span @click='sub'>-</span><span>{{num}}</span><span @click='add'>+</span></li>
                <li>
                    <mt-button type="primary">立即购买</mt-button>
                    <mt-button type="danger" @click='addcart'>加入购物车</mt-button>
                </li>
            </ul>
        </div>
        <transition name="ball" @after-enter='afterenter'>
            <div class="ball" v-if='showball'></div>
        </transition>
        <div class="product-props">
            <ul>
                <li>商品参数</li>
                <li>商品货号：{{proinfo.goods_no}}</li>
                <li>库存情况：{{proinfo.stock_quantity}}件</li>
                <li>上架时间：{{proinfo.add_time | comenttime}}</li>
            </ul>
        </div>
        <div class="product-info">
            <ul>
                <li>
                    <mt-button type="primary" size="large" plain @click='showPicInfo'>图文介绍</mt-button>
                </li>
                <li>
                    <mt-button type="danger" size="large" plain @click='showComments'>商品评论</mt-button>
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
    import connect from '../common/connect.js';
    import shopcart from '../common/shopcart.js';
    import { MessageBox } from 'mint-ui';
    export default {
        data() {
            return {
                imgs: [],
                proinfo: {},
                num: 1,
                showball: false
            }
        },
        created() {
            let id = this.$route.params.id;
            this.$http.get(this.$myconfig.host + '/api/getthumimages/' + id).then(res => {
                this.imgs = res.body.message;
            }, res => {
                console.log('获取商品轮播图失败');
            });
            this.$http.get(this.$myconfig.host + '/api/goods/getinfo/' + id).then(res => {
                this.proinfo = res.body.message[0];
            }, res => {
                console.log('获取商品参数失败');
            });
        },
        methods: {
            add() {
                if (this.num >= this.proinfo.stock_quantity) return;
                this.num++;
            },
            sub() {
                if (this.num <= 1) return;
                this.num--;
            },
            showPicInfo() {
                this.$router.push('/goods/detailinfo/' + this.$route.params.id + '?title=图文信息');
            },
            showComments() {
                this.$router.push('/goods/comments/' + this.$route.params.id);
            },
            addcart() {
                this.showball = true;
                connect.$emit('addcart', this.num);

                shopcart.addshopcart({
                    id: this.proinfo.id,
                    num: this.num
                })
            },
            afterenter() {
                this.showball = false;
            }


        },
        // beforeRouteLeave(to, from, next){
        //     if(window.confirm('亲，你去定要离开吗？？？')){
        //         next();
        //     }else{
        //         next(false);
        //     }
        // }
        beforeRouteLeave(to, from, next) {
            MessageBox.confirm('亲，你确定要离开吗?').then(action => {
                next();
            },action => {
                next(false);
            });
        }
    }
</script>
<style scoped>
    .ball-enter-active {
        animation: bounce-in 1s;
    }
    /*解决小球闪的问题*/
    
    .ball-leave-active {
        opacity: 0;
    }
    
    @keyframes bounce-in {
        0% {
            transform: translate3d(0, 0, 0);
        }
        50% {
            transform: translate3d(140px, -50px, 0);
        }
        75% {
            transform: translate3d(160px, 0px, 0);
        }
        100% {
            transform: translate3d(140px, 300px, 0);
        }
    }
    
    .swiper {
        border: 1px solid rgba(0, 0, 0, 0.2);
        margin: 8px;
        width: 95%;
        border-radius: 15px;
        overflow: hidden;
    }
    
    .outer-swiper,
    .product-desc,
    .product-props,
    .product-info {
        border-radius: 5px;
        border: 1px solid rgba(0, 0, 0, 0.2);
        margin: 3px;
    }
    /*请ulpadding*/
    
    .outer-swiper ul,
    .product-desc ul,
    .product-props ul,
    .product-info ul {
        padding: 0;
    }
    
    .product-desc ul li,
    .product-props ul li,
    .product-info ul li {
        list-style: none;
        font-size: 15px;
        color: rgba(0, 0, 0, 0.5);
        margin-top: 8px;
    }
    
    .product-desc ul>:nth-child(1) span {
        color: blue;
        font-size: 22px;
        font-weight: bold;
    }
    
    .product-desc ul>:nth-child(1) {
        border-bottom: 1px solid rgba(0, 0, 0, 0.5);
    }
    
    .product-desc ul,
    .product-info ul,
    .product-props ul {
        padding-left: 10px;
    }
    
    .price-li span {
        color: red;
        font-size: 25px;
    }
    
    .price-li s {
        margin-right: 16px;
    }
    /*加减*/
    
    .number-li span {
        display: inline-block;
        border: 2px solid rgba(0, 0, 0, 0.1);
        width: 25px;
    }
    /*商品参数*/
    
    .product-props ul>:nth-child(1) {
        text-align: left;
    }
    
    .product-props ul:not(:nth-child(1)) {
        margin-left: 40px;
    }
    
    .product-info ul {
        margin-bottom: 70px;
        padding: 0 5;
    }
    
    .number-li span {
        text-align: center;
    }
    
    .number-li>:nth-child(2) {
        width: 40px;
    }
    
    .ball {
        border-radius: 50%;
        background-color: red;
        width: 24px;
        height: 24px;
        position: absolute;
        top: 440px;
        left: 120px;
        display: inline-block;
        z-index: 9999;
    }
</style>