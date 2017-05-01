<template>
    <div class="tmpl ">
        <mytitle :title='title'></mytitle>
        <div class="top">
            <p>{{newsdetail.title}}</p>
            <div>
                <span>{{newsdetail.click}}次点击</span>
                <span>分类：民生经济</span>
                <span>添加时间：{{newsdetail.add_time | comenttime}}</span>
            </div>
        </div>
        <div class="bottom" v-html='newsdetail.content'>
            
        </div>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                newsdetail: {},
                title: ''
            }
        },
        created() {
            let id = this.$route.params.id; // 要进入详情的新闻的id
            this.title = this.$route.query.title;
            
            this.$http.get(this.$myconfig.host + '/api/getnew/' + id).then(res => {
                this.newsdetail = res.body.message[0];
            }, res => {
                console.log('获取新闻详情失败');
            })

        }
    }
</script>
<style scoped>
    .top p {
        font-weight: 700;
        color: blue;
    }
    .top div span {
        font-size: 14px;
    }
    .top div {
        border-bottom: 1px solid #ccc;
        
    }
</style>