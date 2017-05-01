<template>
    <div class="tmpl">
        <mytitle title='图片分享'></mytitle>
        <!-- 引入返回导航 -->
        <div class="photo-header">
            <ul>
                <li v-for='item in category' :key='item.id'>
                    <a href="javascript:;" @click='getimg(item.id)'>{{item.title}}</a>
                </li>
            </ul>
        </div>
        <div class="photo-list">
            <ul>
                <li v-for='item in imgs' :key='item.id'>
                    <router-link :to="'/photo/detail/'+item.id">
                        <img v-lazy="item.img_url">
                        <p>
                            <span>{{item.title}}</span>
                            <br>
                            <span>{{item.zhaiyao}}</span>
                        </p>
                    </router-link>
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                category: [],
                imgs: []
            }
        },
        created() {
            this.getimg(0),
            this.getcategory()
           
        },
        methods: {
            getimg(id){
                this.$http.get(this.$myconfig.host+'/api/getimages/'+id).then(res=>{
                    this.imgs = res.body.message;
                },res=>{
                    console.log('请求图片失败');
                })
            },
            getcategory(){
                 this.$http.get(this.$myconfig.host + '/api/getimgcategory').then(res => {
                this.category = res.body.message;
                this.category.unshift({
                    "title": "全部",
                    "id": 0
                })
            }, res => {
                console.log('获取图片分类失败');
            })
            }
        }
    }
</script>
<style>
    .photo-header li {
        list-style: none;
        display: inline-block;
        margin-left: 10px;
        height: 30px;
    }
    
    .photo-header ul {
        /*强制不换行*/
        white-space: nowrap;
        overflow-x: auto;
        padding-left: 0px;
        margin: 5;
    }
    /*下面的图片*/
    
    .photo-list li {
        list-style: none;
        position: relative;
    }
    
    .photo-list li img {
        width: 100%;
        height: 230px;
        vertical-align: top;
    }
    
    .photo-list ul {
        padding-left: 0px;
        margin: 0;
    }
    
    .photo-list p {
        position: absolute;
        bottom: 0px;
        color: white;
        background-color: rgba(0, 0, 0, 0.3);
        margin-bottom: 0px;
    }
    
    .photo-list p span:nth-child(1) {
        font-weight: bold;
        font-size: 16px;
    }
    /*mint-ui懒加载*/
    
    image[lazy=loading] {
        width: 40px;
        height: 300px;
        margin: auto;
    }
</style>