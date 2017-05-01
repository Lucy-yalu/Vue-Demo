<template>
    <div class="tmpl ">
        <mytitle title='新闻资讯'></mytitle>
        <div>
            <ul class="mui-table-view mui-unfold">
                <li class="mui-table-view-cell mui-media mui-media-icon" v-for='item in lists' :key='item.id'>
                    <router-link :to="'/news/detail/'+item.id+'?title=新闻详情'" href="javascript:;">
                        <img class="mui-media-object mui-pull-left" :src="item.img_url">
                        <div class="mui-media-body">
                            {{item.title}}
                            <div class="bottom">
                                <span>点击数：{{item.click}}</span>
                                <span>发表日期：{{item.add_time | comenttime}}</span>
                            </div>
                        </div>
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
                lists: []
            }
        },
        created() {
            this.$http.get(this.$myconfig.host+'/api/getnewslist').then(res => {
                this.lists = res.body.message;
            }, res => {
                console.log('请求新闻列表失败');
            })
        }
    }
</script>
<style scoped>
    .bottom span {
        color: #04a1f0;
        /*display: inline-block;*/
        font-size: 14px;
    }
    
    .bottom span:first-child {
        float: left;
    }
    
    .bottom span:last-child {
        float: right;
    }
</style>