import lkmNative from "./lkmNativeBackPress";

export default {

    //beforeCreate这个时候mixin没生效的,在"create"的时候才有

    methods: {
        onBackPress: function () {
            lkmNative.onBackPress();
        },
        //添加到回退栈中。
        putBackStackHandle: function (handleFun) {
            lkmNative.putBackStackHandle(handleFun);
        },
        removeBackStackHandle: function (handleFun) {
            lkmNative.removeBackStackHandle(handleFun);
        }
    }
}