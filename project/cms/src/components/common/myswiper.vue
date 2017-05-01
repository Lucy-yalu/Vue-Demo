<template>
    <div>
        <div class="h-swipe">
            <mt-swipe :auto="4000">
                <mt-swipe-item v-for="(item,index) in imgs" :key="index">
                    <a :href="item.url">
                        <img :src="item.img">
                    </a>
                </mt-swipe-item>
            </mt-swipe>
        </div>
    </div>
</template>
<script>
    export default {
        data(){
            return {

            }
        },
        props:['imgs']
    }
</script>
<style scoped>
    .h-swipe {
        width: 100%;
        height: 220px;
    }
    
    .h-swipe img {
        width: 100%;
        height: 220px;
    }
</style>