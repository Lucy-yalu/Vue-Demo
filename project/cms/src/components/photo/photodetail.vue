<template>
    <div class="tmpl">
        <mytitle title='图片详情'></mytitle>
        <div class="photo-title">
            <p>{{imgdetail.title}}</p>
            <span>发起日期：{{imgdetail.add_time | comenttime}}</span>
            <span>{{imgdetail.click}}次浏览</span>
            <span>分类：民生经济</span>
        </div>
        <ul class="mui-table-view mui-grid-view mui-grid-9">
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3" v-for='(item, index) in imgs' :key='index'>
                 <img class="preview-img"  :src="item.src" height="100" @click="$preview.open(index, imgs)">
            </li>
          
        </ul>
        <div class="photo-desc">
            <p v-html="imgdetail.content"></p>
        </div>
        <mycomments :id='this.$route.params.id'></mycomments>
    </div>
</template>
<script>
    export default {
        data(){
            return {
                imgdetail: {},
                imgs: []
            }
        },
        created(){
            let id = this.$route.params.id;
            this.$http.get(this.$myconfig.host+'/api/getimageInfo/'+id).then(res=>{
                this.imgdetail = res.body.message[0];
            },res=>{
                console.log('获取图片详情失败');
            });
            this.$http.get(this.$myconfig.host+'/api/getthumimages/'+id).then(res=>{
                this.imgs = res.body.message;
                this.imgs.forEach(function(v){
                    v.w = 300;
                    v.h = 300;
                })
            },res=>{
                console.log('获取缩略图失败');
            });

        }
    }
</script>
<style scoped>
li {
    list-style: none;
}

ul {
    margin: 0;
    padding: 0;
}

.photo-title {
    overflow: hidden;
}

.photo-title,
.photo-desc {
    border-bottom: 1px solid rgba(0, 0, 0, 0.2);
    padding-bottom: 5px;
    margin-bottom: 5px;
    padding-left: 5px;
}

.photo-title p {
    color: #13c2f7;
    font-size: 20px;
    font-weight: bold;
}

.photo-title span {
    margin-right: 20px;
}

.mui-table-view.mui-grid-view.mui-grid-9 {
    background-color: white;
    border: 0;
}

.mui-table-view.mui-grid-view.mui-grid-9 li {
    border: 0;
}

.photo-desc p {
    font-size: 18px;
}

.mui-table-view-cell.mui-media.mui-col-xs-4.mui-col-sm-3 {
    padding: 2 2;
}
</style>
