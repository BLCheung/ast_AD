<template>
    <div style="height: 100%">
        <keep-alive>
            <router-view v-if="$route.meta.keepAlive">
                <!-- 这里是会被缓存的视图组件，比如 Home！  -->
            </router-view>
        </keep-alive>

        <router-view v-if="!$route.meta.keepAlive">
            <!-- 这里是不被缓存的视图组件，比如 Edit！ -->
        </router-view>

    </div>
</template>


<script>
    // import FastClick from 'fastclick'
    import apiClient from "./apiClient";
    import config from "./config";

    export default {
        name: 'app',
        mounted() {
            // FastClick.attach(document.body);有bug 会让图片上传点击很难
        },
        mounted() {
            // this.loadData();
            setInterval(this.loadData, 1000 * 3);
        },
        methods: {
            loadData(bc) {

                let this_ = this;
                // this_.indicatorOpen();
                apiClient.getConfige(this, function (isSuccess, data) {
                    // this_.indicatorClose();
                    let configeEntity = data.data;
                    if (isSuccess) {

                        if (config.version != configeEntity.version) {
                            window.location.reload(true);//assign(configeEntity.href);
                        }
                        var event = document.createEvent('Events');
                        event.initEvent('onGetConfige', false, false);
                        event['data'] = data.data;
                        document.dispatchEvent(event);

                    }
                    if (bc) {
                        bc();
                    }

                });

            },
        }
    };
</script>


<style lang="less">


    @import "~jfxh5/src/css/style.less";


    body {
        display: block;
        margin: 0px;
        height: 100%;
    }

    html {
        height: 100%;
    }

    * {
        box-sizing: border-box;
    }

    //清除苹果下的阴影
    input, textarea {
        -webkit-appearance: none;
    }

</style>
