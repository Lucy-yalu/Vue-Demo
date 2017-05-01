<template>
    <div class="tmpl">
        <mytitle title='购物车'></mytitle>
        <div class="pay-detail">
            <ul>
                <li class="p-list" v-for='(item, index) in shopcarts' :key='item.id'>
                    <mt-switch v-model='item.isSelected'></mt-switch>
                    <img :src="item.thumb_path">
                    <div class="pay-calc">
                        <p>{{item.title}}</p>
                        <div class="calc">
                            <span>￥{{item.sell_price}}</span>
                            <span @click='sub(index)'>-</span>
                            <span>{{item.num}}</span>
                            <span @click='add(index)'>+</span>
                            <a href="javascript:;" @click='del(index)'>删除</a>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
        <div class="show-price">
            <div class="show-1">
                <p>总计(不含运费):</p>
                <span>已经选择商品{{payment.totalcount}}件，总价￥{{payment.totalprice}}元</span>
            </div>
            <div class="show-2">
                <mt-button type="danger" size="large">去结算</mt-button>
            </div>
        </div>
    </div>
</template>
<script>
    import shopcart from '../common/shopcart.js';
    import { MessageBox } from 'mint-ui';
    export default {
        data(){
            return {
             shopcarts: []
            }
        },
        created(){
            let url = this.$myconfig.host+'/api/goods/getshopcarlist/';
            let shopCart = shopcart.getshopcart();
            shopCart.forEach(function(p){
                url+=p.id+',';
            });
            url = url.substring(0, url.length-1);
            this.$http.get(url).then(res=>{
                // this.shopcarts = res.body.message;
                // this.shopcarts.forEach((p)=>{
                //     p.isSelected = false;
                //     for(var i = 0; i<=shopCart.length-1; i++){
                //         if(shopCart[i].id==p.id){
                //             // p.num = shopCart[i].num;
                //             this.$set(p,'num',shopCart[i].num);
                //         }
                //     }
                // })

                let temp = res.body.message;
                temp.forEach((p)=>{
                    p.isSelected = false;
                    for(var i = 0; i<=shopCart.length-1; i++){
                        if(shopCart[i].id==p.id){
                            p.num = shopCart[i].num;
                        }
                    }
                })
                this.shopcarts = temp;

            },res=>{
                console.log('获取购物车数据失败');
            })
        },
        methods:{
            sub(index){
                if(this.shopcarts[index].num > 1 ){
                    this.shopcarts[index].num--;
                }
            },
            add(index){
                this.shopcarts[index].num++;
            },
            del(index){
                // if(window.confirm('确定要删除吗？')){
                //     this.shopcarts.splice(index, 1);
                //     shopcart.delshopcart(index);
                // }
                MessageBox.confirm('亲，你确定要离开吗?').then(action => {
                    this.shopcarts.splice(index, 1);
                    shopcart.delshopcart(index);                    
            },action => {
            });
            }
        },
        computed:{
            payment(){
                let totalprice = 0;
                let totalcount = 0;
                this.shopcarts.forEach(function(p){
                     if(p.isSelected){
                        totalcount ++;
                        totalprice += p.num * p.sell_price;
                    }
                });
                return {totalcount, totalprice};
                   
            }
        }
       
    }
</script>
<style scoped>
.pay-detail ul li {
    list-style: none;
    border-bottom: 1px solid rgba(0, 0, 0, 0.2);
    margin-bottom: 3px;
}

.pay-detail ul {
    padding-left: 5px;
    margin-top: 5px;
}

.pay-detail ul li img {
    width: 80px;
    height: 80px;
    display: inline-block;
    vertical-align: top;
    margin-top: 10px;
}

.pay-detail ul li >:nth-child(1),
.pay-detail ul li >:nth-child(3) {
    display: inline-block;
}

.pay-calc p {
    display: inline-block;
    width: 250px;
    overflow: hidden;
    color: blue;
    font-size: 15px;
    margin-bottom: 10px;
}

.pay-detail ul li >:nth-child(1) {
    line-height: 80px;
}

.calc:nth-child(1) {
    color: red;
    font-size: 20px;
}

.calc span:not(:nth-child(1)) {
    border: 1px solid rgba(0, 0, 0, 0.3);
    display: inline-block;
    width: 20px;
    text-align: center;
}

.calc a {
    margin-left: 20px;
}

.show-1,
.show-2 {
    display: inline-block;
}

.show-1,
.show-2 {
    margin-left: 30px;
}

.show-price {
    background-color: rgba(0, 0, 0, 0.2);
}
</style>
