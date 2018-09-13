<template>
    <div style="height: 100%" class="km-ll km-ll-v">
        <mt-header :title="v_title" fixed>
            <mt-button slot="left" icon="back" @click="onBackPress()">返回</mt-button>

        </mt-header>
        <div class="header-space"></div>
        <iframe class="km-w1" @onload="onIframeLoad" ref="view_iframe" id='iframe-content' name="iframe-content"
                style="frameborder:no;border: none;width: 100%;height: 100%  "></iframe>
    </div>

</template>

<script>
    import mixinPage from "../mixinPage";

    export default {
        name: "web-view",
        mixins:[mixinPage],
        data() {
            v_title:"加载中...";
        },
        mounted() {
            this.$refs.view_iframe.src = this.$route.query.url;//"https://xinwo.kuaizhan.com/25/23/p43449286209823";//
        },
        methods: {
            onIframeLoad() {
                this.v_title = this.$route.query.title;
            }
        }
    }
</script>

<style scoped>

</style>