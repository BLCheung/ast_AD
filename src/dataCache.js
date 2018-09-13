//数据缓存


import comHelp from "./help/comHelp";

function save_(key, data) {
    // sessionStorage.setItem
    try {
        localStorage.setItem(key, JSON.stringify(data));
        // plus.storage.setItem(key, JSON.stringify(data));
    }catch (e){
        sessionStorage.setItem(key, JSON.stringify(data));
    }
}

function remove_(key) {
    try {
        localStorage.removeItem(key );
        // plus.storage.removeItem(key);
    }catch (e){
        sessionStorage.removeItem(key );
    }
}
function get_(key) {

    try {
        // return JSON.parse(plus.storage.getItem(key));
        return JSON.parse(localStorage.getItem(key));
    }catch (e){
        try{
            return JSON.parse(sessionStorage.getItem(key));
        }catch (ee){}
    }
    return undefined;
}

// let userDate_=null;

let dataCache={

    clearUserInfo(){
        // userDate_=null;
        remove_("UserInfo");
        //顺便清除cookie
        //   document.cookie='';
    },

    //用不下线  也就是token过期啦
    userOutline(){
        try{
            let u=this.getUserInfo();
            u.token='';
            this.saveUserInfo(u);
        }catch (e){}
    }
    ,
    saveUserInfo(data){
        if(comHelp.isNull(data)){
            data={};
        }

        let userDate = {
            phone:data.tel,//我的手机号

            token:data.token,
            isHasOnceLogin:true,//是否曾经登录过。为true的时候就证明这个用户对象有数据

        }


        // userDate.realname=(typeof data.realname == 'undefined'||data.realname==null||data.realname=='')?data.username:data.realname;

        // userDate_=userDate;
        save_("UserInfo",userDate);

        // //对状态什么的做统一处理
        // if(userDate.state==4){
        //     //冻结了。
        //     //在别人之后  进行调整
        //     setTimeout(function () {
        //         uiIntercept.showDJ();
        //     },500);
        //
        // }
    },


    getUserInfo(){
        // if(userDate_==null){
        //     userDate_=get_("UserInfo");
        // }
        let userData=get_("UserInfo");//userDate_;
        if(typeof userData == 'undefined'||userData==null){
            userData={
                isHasOnceLogin:false,//是否曾经登录过。为true的时候就证明这个用户对象有数据
            };
        }

        return userData;
    },
    getToken(){
        let userInfo=this.getUserInfo();
        return comHelp.isNull(userInfo)?'':userInfo.token;
    }
    ,

    //页面传值
    setUIPassData(data){
        save_("setUIPassData",data);
    },
    //页面传值
    getUIPassData(){
        var data=get_("setUIPassData");
        remove_("setUIPassData");
        return data;
    },
    get(key){
        return get_(key);
    },
    save(key,data){
        save_(key,data);
    }


}

export default dataCache;



