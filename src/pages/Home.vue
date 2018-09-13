<template>
    <div ref="view_body" style="width: 100%; background-color: aquamarine;"
         class="km-ll km-ll-v">

        <!--header-->
        <div style="height: 55px">fffffdfdfd</div>

        <!--content-->
        <div ref="view_content" style="padding: 5px" class="km-w1 km-ll km-ll-h">

            <!--left-->
            <div ref="view_left" class="km-ll km-ll-v "
                 style="width: 55%;height: 100%;padding: 10px">
                <!-- left1 -->
                <div style=" height: 40%;" class="km-holdsize"
                     ref="view_ad_left1">
                    <mt-swipe :auto="4000" style="height: 100%" :show-indicators="false">

                        <mt-swipe-item v-for="(item,index) in p_ads" :key="index"
                                       style="height: 100%">
                            <div @click="onClickAd(' ',item,false)" class="km-center"
                                 style="width: 100%; height: 100%;overflow: hidden;">
                                <img :src=item
                                     style="width: 100%;height:auto;">
                            </div>
                        </mt-swipe-item>

                    </mt-swipe>
                </div>

                <div class="km-w1"></div>

                <!-- left2 -->
                <div style=" height: 40%;" class="km-holdsize"
                     ref="view_ad_left2">
                    <mt-swipe :auto="4000" style="height: 100%" :show-indicators="false">

                        <mt-swipe-item v-for="(item,index) in p_ads" :key="index"
                                       style="height: 100%">
                            <div @click="onClickAd(' ',item,false)" class="km-center"
                                 style="width: 100%; height: 100%;overflow: hidden;">
                                <img :src=item
                                     style="width: 100%;height:auto;">
                            </div>
                        </mt-swipe-item>
                    </mt-swipe>
                </div>
            </div>

            <!-- right -->
            <div ref="view_right" class="km-ll km-ll-v"
                 style="width: 45%; height: 100%;padding: 10px">


                <!-- right1 -->
                <div style=" height: 40%;" class="km-holdsize"
                     ref="view_ad_right1">

                    <div style="background-color: chartreuse; height: 100%"></div>

                </div>

                <div class="km-w1"></div>

                <!-- right2 -->
                <div style=" height: 40%;" class="km-holdsize"
                     ref="view_ad_right2">
                    <mt-swipe :auto="4000" style="height: 100%" :show-indicators="false">

                        <mt-swipe-item v-for="(item,index) in p_ads" :key="index"
                                       style="height: 100%">
                            <div @click="onClickAd(' ',item,false)" class="km-center"
                                 style="width: 100%; height: 100%;overflow: hidden;">
                                <img :src=item
                                     style="width: 100%;height:auto;">
                            </div>
                        </mt-swipe-item>
                    </mt-swipe>
                </div>

            </div>

        </div>

        <!--footer-->
        <div style="height: 30px;"></div>


    </div>

</template>

<script>
    import Vue from 'vue'
    import {Swipe, SwipeItem} from 'mint-ui'

    import mixinPage from "../mixinPage";

    var components = {};

    components[Swipe.name] = Swipe;
    components[SwipeItem.name] = SwipeItem;

    export default {
        name: "page-home",
        components: components,
        mixins: [mixinPage],
        data() {
            return {

                p_ads: [
                    "http://thh.satrace.cn/upload/201802/02/201802021119311627.jpg",
                    "http://thh.satrace.cn//upload/201802/01/201802011200023988.jpg",
                    "http://thh.satrace.cn/upload/201710/24/201710241733380750.jpg",
                    "http://thh.satrace.cn/upload/201710/24/201710241733254813.jpg",
                    "http://thh.satrace.cn/upload/201710/24/201710241733132826.jpg",
                    "http://thh.satrace.cn/upload/201710/24/201710241732431559.jpg",

                ],

                p_indicatorCount: 0,//打开indicator的次数

            }
        },
        mounted: function () {

            this.$refs.view_body.style.height = (parseInt(this.$refs.view_body.clientWidth) * (2160 / 3840)) + "px";

            this.$refs.view_left.style.height = this.$refs.view_content.clientHeight + "px";

            this.$refs.view_ad_left1.style.height = (parseInt(this.$refs.view_ad_left1.clientWidth) * (1.55 / 4)) + "px";

            this.$refs.view_ad_left2.style.height = (parseInt(this.$refs.view_ad_left2.clientWidth) * (2 / 4)) + "px";

            this.$refs.view_right.style.height = this.$refs.view_content.clientHeight + "px";

            this.$refs.view_ad_right1.style.height = (parseInt(this.$refs.view_ad_right1.clientWidth) * (2.25 / 3)) + "px";

            this.$refs.view_ad_right2.style.height = (parseInt(this.$refs.view_ad_right2.clientWidth) * (1.45 / 4.2)) + "px";

            // //region 保证图片能完全显示
            // let height = (parseInt(this.$refs.mainAD.clientWidth) * (768 / 1280))
            // let width = document.body.clientWidth;
            //
            // if (height > document.body.clientHeight) {
            //     height = document.body.clientHeight
            // }
            // let holdwidth = (parseInt(height) * (1280 / 768));
            // if (width > holdwidth) {
            //     width = holdwidth;
            // }
            //
            // this.$refs.mainAD.style.height = height + "px";
            // this.$refs.mainAD.style.width = width + "px";
            // //endregion


            document.addEventListener('onGetConfige', function (event) {
                let data = event.data;
                //接受到数据
                console.log(data);
            });
        },

        //这个时候mixin没生效的在"create"的时候才有
        beforeCreate: function () {


        },


        methods: {
            // indicatorOpen() {
            //     if (this.p_indicatorCount == 0) {
            //         uiHelp.indicatorOpen();
            //     }
            //     this.p_indicatorCount++;
            // },
            // indicatorClose() {
            //     this.p_indicatorCount--;
            //     if (this.p_indicatorCount == 0) {
            //         uiHelp.indicatorClose();
            //     }
            // },
            onClickAd(title, url, isGoOut) {


            },


        },

    }
</script>


<style lang="less" scoped>
    /*@import "~jfxh5/dist/less/style.less";*/


</style>
<style scoped>
    /deep/ .mint-header-button {
        height: 100%;
    }
</style>