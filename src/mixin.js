import {Indicator} from "mint-ui"
import comHelp from "./help/comHelp";
//得到当前的页面名称
function getPageName_(PageThah) {
    // console.log(thah);
    var pageName = PageThah.$options.name ? PageThah.$options.name.split("page-")[1] : undefined;
    return pageName;
}
export default {
     mounted:function() {
        //进入新页面 滚动到最顶
        window.scrollTo(0,0);
        Indicator.close();

         let pageName=getPageName_(this);
         if(!comHelp.isEmptyString(pageName)) {
             // if (!(this.flag_isNotFastClick)) {
             //     FastClick.attach(document.body);//有bug 会让图片上传点击很难
             // }
         }

    },

    beforeCreate:function () {
         let pageName=getPageName_(this);
        if (!(typeof (pageName) == "undefined" || pageName == null)) {
            console.log("======mixin beforeCreate");
            let this_ = this;
            //只有网页才有这种回退方式好不，但是网页没有返回的实体按钮丫
            // lkmNative.putBackStackHandle(function () {
            //     if (typeof this_.$router === 'undefined') {
            //         return false;
            //     }
            //     this_.$router.go(-1);
            //     return true;
            //
            // });
        }
    }

};