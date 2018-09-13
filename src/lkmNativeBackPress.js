import uiNavigate from "./uiNavigate";

function sendEventToWebview_(webview,eventName, data) {

    if(typeof webview == 'undefined'||webview==null){
        return ;
    }
    var jsonData = (typeof data == 'undefined'||data==null)?'':JSON.stringify(data);
    webview.evalJS(" (function(){var event=document.createEvent('Events');event.initEvent('" + eventName + "', false, false);event['kmDataJson']='" + jsonData + "';document.dispatchEvent(event);})();");
}


let BackStackHandle_ = [];

function backListener(){
    handlePopBackStackHandle_();
}
// 开始监听backbutton事件
function startBack(){
    console.log("======startBack");
    plus.key.addEventListener('backbutton',backListener,false);
    //关闭当前webview，因为。hbuild的webview不会因为按下放回按钮关闭的。
    BackStackHandle_.push(function () {
        uiNavigate.closeCurWindow();
    });

    //监听自己是否被关闭。 纯网页版的话 回退 vue会监听到生命周期的。
    plus.webview.currentWebview().addEventListener('close',function () {
        //getTopWebview 真的是拿到显示的  不会拿到隐藏的
        sendEventToWebview_(plus.webview.getWebviewById("__W2A_CONTEXT_"),"onReenterWebview");
    },false);
}
// 取消监听backbutton事件
function stopBack(){
    plus.key.removeEventListener('backbutton',backListener);
}

//处理回退按钮。hbuild的webview不会因为按下放回按钮关闭的。
function handlePopBackStackHandle_() {
    let isContinue = true;
    while (isContinue) {
        if(BackStackHandle_.length==0){
            break;
        }
        let bsh = BackStackHandle_.pop();
        if (!(typeof (bsh) == "undefined" || bsh == null)) {
            if (bsh()) {
                isContinue = false;
            }
        }
    }
}



// if(typeof plus === 'undefined'){
//     startBack();
// }else {
//
//     console.log("======plus==undefined");
//     document.addEventListener('plusready', function () {
//         startBack();
//     }, false);
// };

//在mixin.js中被引入。这时监听初始化。丫的 现在监听不到了是不是因为我加了"<script src="html5plus://ready"></script>"的原因
// document.addEventListener('plusready', function () {
//     startBack();
// }, false);

//兼容没有plus的
try {
    startBack();
}catch (e){}

export default {

    //发出一个回退按钮
    onBackPress(){
        handlePopBackStackHandle_();
    },
    //添加到回退栈中。返回true 就是拦截事件 不继续传递下去
    putBackStackHandle(handleFun) {
        BackStackHandle_.push(handleFun);
    },
    removeBackStackHandle(handleFun) {
        for (let i = 0; i < BackStackHandle_.length; i++) {
            let item = BackStackHandle_[i];
            if (item === handleFun) {
                BackStackHandle_[i]=undefined;
            }
        }
    }

}