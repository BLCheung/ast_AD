/**
 * 1，目前这个跳转适配：1）浏览器。2）Hbuilder
 *
 */

import routesMap from "./routesMap";
import comHelp from "./help/comHelp";




function getWebviewByPage(fromPage) {
    return plus.webview.getWebviewById('page_'+fromPage.name);
}
function closePage_(fromPage) {
    fromPage.$router.go(-1);//(n?(1*n):-1);
}
function replacePage_(fromPage,routerInfo) {
    fromPage.$router.replace(routerInfo);
}

/**
 * 把其他页面全部替换掉，也就是保证只有当前页面。
 * @param fromPage
 * @param routerInfo
 * @private
 */
function replaceAllPage_(fromPage,routerInfo) {
    fromPage.$router.replace(routerInfo);
}

//上个页面开始的时间
// let prePageStartTime=new Date();
//目前兼容：{ name: 'pageLoginReg',query: { plan: 'private' }}
function startPage_(fromPage,routerInfo) {

    let path=null;
    if(routerInfo.name){
        let routes=routesMap;
        for (let i=0;i<routes.length;i++){
             if(routerInfo.name==routes[i].name){
                 path=routes[i].path;
                 break;
             }
        }
    }
    let paramsStr=null;
    if(routerInfo.query) {
        // console.log(routerInfo.query);
        let params=routerInfo.query;
        for (let key in params) {
            if(paramsStr==null){
                paramsStr='';
            }else{
                paramsStr+="&";
            }
            paramsStr+=encodeURIComponent(key)+"="+encodeURIComponent(params[key]);
        }
        //保证前面是只有一个？链接。1,?ccc=cc&ddd=ff ;2,index.html/ ;3, ?cc
        if(!comHelp.isEmptyString(paramsStr)) {
            paramsStr = (path.indexOf('?') == -1 ? "?" : "&") + paramsStr;
        }
    }else{
        paramsStr='';
    }

    //path确保不是"/"开头
    path=location.href.substring (0,location.href.indexOf('index.html'))+"index.html#/"+(path.indexOf("/")==0?path.substr(1,path.length):path);
    if(!comHelp.isEmptyString(paramsStr)) {
        path += paramsStr;
    }
    console.log("===="+path);
    fromPage.$router.push(routerInfo);

    try{
        if(!comHelp.isEmptyString(routerInfo.name)) {
            // let cDate=new Date();
            // let pt=cDate-prePageStartTime;
            // prePageStartTime=cDate;
            let data={
                f:"p_"+fromPage.$options.name,
                p:paramsStr,
                // pt:pt,
            }
            plus.statistic.eventTrig("p_" + routerInfo.name,JSON.stringify(data));
            console.log("====记录页面"+routerInfo.name);
        }
    }catch (e){
        // console.log(e);
    }
}

function startPageOfUrl_(fromPage,url) {
    window.location.href=url;
}
export default {
    startPage(fromPage,routerInfo) {
        startPage_(fromPage, routerInfo);
    }
    ,
    startPageOfUrl(fromPage,url) {
        startPageOfUrl_(fromPage, url);
    },

    closeCurWindow(){
        fromPage.$router.go(-1);
    },
    finish(fromPage){
        closePage_(fromPage);
    },

    goWebView(fromPage,title,url){
        var routerInfo={ name: 'pageWebView', query: {title:title,url:url }}
        startPage_(fromPage,routerInfo);
    }


}