<template>
    <div class="tmpl" style="height: 100%;">
        <mytitle title='商品展示'></mytitle>
        <mt-loadmore :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" :auto-fill='autofill' ref="loadmore" @bottom-status-change='handleBottomChange'>
            <ul class="mui-table-view mui-grid-view">
                <li class="mui-table-view-cell mui-media mui-col-xs-6" v-for='item in goodslist' :key='item.id'>
                    <router-link :to="'/goods/detail/'+item.id">
                        <img class="mui-media-object" :src="item.img_url">
                        <div class="mui-media-body" v-text='item.title'></div>
                        <div class="desc">
                            <div class="sell">
                                <span>￥{{item.sell_price}}</span>
                                <s>￥{{item.market_price}}</s>
                            </div>
                            <div class="detail">
                                <div class="hot">
                                    热卖中
                                </div>
                                <div class="count">
                                    剩{{item.stock_quantity}}件
                                </div>
                            </div>
                        </div>
                    </router-link>
                </li>
            </ul>
            <span v-show="bottomStatus === 'loading'">
                <mt-spinner type="triple-bounce"></mt-spinner>
            </span>
        </mt-loadmore>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                pageindex: 1,
                goodslist: [],
                autofill: false,
                allLoaded: false,
                bottomStatus: ''
            }
        },
        // /api/getgoods?pageindex=number
        created() {
            this.$http.get(this.$myconfig.host + '/api/getgoods?pageindex=' + this.pageindex).then(res => {
                this.goodslist = res.body.message;
            }, res => {
                console.log('获取商品列表失败');
            })
        },
        methods: {
            loadBottom() {
                this.pageindex++;
                this.$http.get(this.$myconfig.host + '/api/getgoods?pageindex=' + this.pageindex).then(res => {
                    if (res.body.message.length === 0) {
                        this.allLoaded = true;
                    }
                    this.goodslist = this.goodslist.concat(res.body.message);
                    this.$refs.loadmore.onBottomLoaded();
                })
            },
            handleBottomChange(s) {
                this.bottomStatus = s;
            }
        }
    }
</script>
<style scoped>
    .mui-table-view.mui-grid-view .mui-table-view-cell>a:not(.mui-btn) {
        margin: 0px;
        padding: 0px;
        border: 1px solid #5c5c5c;
        box-shadow: 0 0 4px #666;

    }
    .mui-table-view.mui-grid-view{
        margin-bottom: 50px;
    }
    
    .sell>span {
        float: left;
        color: red;
        text-align: left;
    }
    
    .detail>.hot {
        float: left;
        text-align: left;
        font-size: 15px;
    }
    
    .detail>.count {
        float: right;
        text-align: right;
        font-size: 15px;
    }
    /*撑开，去除浮动没有的高度*/
    
    .detail {
        overflow: hidden;
    }
    
    .desc {
        color: rgba(92, 92, 92, 0.8);
        background-color: rgba(0, 0, 0, 0.2);
    }
    
    .mui-table-view.mui-grid-view .mui-table-view-cell .mui-media-object {
        height: 200px;
    }
</style>