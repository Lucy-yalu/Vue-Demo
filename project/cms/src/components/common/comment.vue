<template>
    <div class="tmpl">
        <div class="photo-bottom">
            <ul>
                <li class="photo-comment">
                    <div>
                        <span>提交评论</span>
                        <span><a >返回</a></span>
                    </div>
                </li>
                <li class="txt-comment">
                    <textarea v-model='newmsg'></textarea>
                </li>
                <li>
                    <mt-button type="primary" size="large" @click='sendmsg'>发表评论</mt-button>
                </li>
                <li class="photo-comment">
                    <div>
                        <span>评论列表</span>
                        <span>99+条评论</span>
                    </div>
                </li>
            </ul>
            <ul class="comment-list">
                <li v-for='(item, index) in comments' :key='index'>
                    帅哥美女：{{item.content}} {{item.add_time | comenttime}}
                </li>
            </ul>
            <mt-button type="danger" size="large" plain @click='getmore'>加载更多</mt-button>
        </div>
    </div>
</template>
<script>
    import {
        Indicator
    } from 'mint-ui';
    export default {
        data() {
            return {
                comments: [],
                pageindex: 1,
                newmsg: ''

            }
        },
        props: ['id'],
        created() {
            this.$http.get(this.$myconfig.host + '/api/getcomments/' + this.$props.id + '?pageindex=' + this.pageindex)
                .then(res => {
                    this.comments = res.body.message;
                    this.pageindex++;
                }, res => {
                    console.log('获取评论失败');
                })
        },
        methods: {
            getmore() {
                this.$http.get(this.$myconfig.host + '/api/getcomments/' + this.$props.id + '?pageindex=' + this.pageindex)
                    .then(res => {
                        this.comments = this.comments.concat(res.body.message);
                        this.pageindex++;
                    }, res => {
                        console.log('获取更多评论失败');
                    })
            },
            sendmsg() {
                Indicator.open({
                    text: '加载中...',
                    spinnerType: 'fading-circle'
                });
                this.$http.post(this.$myconfig.host + '/api/postcomment/' + this.$props.id, {
                    content: this.newmsg
                }, {
                    emulateJSON: true
                }).then(res => {
                    this.comments = [];
                    this.pageindex = 1;
                    this.getmore();
                    this.newmsg = '';
                    Indicator.close();
                }, res => {
                    console.log('发送评论失败');
                })
            }
        }
    }
</script>
<style scoped>
    .photo-comment>div span:nth-child(1) {
        float: left;
        font-weight: bold;
        margin-left: 5px;
    }
    
    .photo-comment>div span:nth-child(2) {
        float: right;
    }
    
    .photo-comment {
        height: 30px;
        border-bottom: 1px solid rgba(0, 0, 0, 0.4);
        line-height: 30px;
        margin-bottom: 5px;
    }
    
    .txt-comment {
        padding: 5 5;
    }
    
    .txt-comment textarea {
        margin-bottom: 5px;
    }
    
    .comment-list li {
        border-bottom: 1px solid rgba(0, 0, 0, 0.2);
        padding-bottom: 5px;
        margin-bottom: 5px;
        padding-left: 5px;
    }
    
    li {
        list-style: none;
    }
    
    ul {
        margin: 0;
        padding: 0;
    }
</style>