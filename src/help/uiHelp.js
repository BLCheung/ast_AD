import comHelp from "./comHelp";
import {MessageBox,Indicator,Toast} from 'mint-ui';
let Toast__=Toast;
export default {

    indicatorOpen(){
        try {
            plus.nativeUI.showWaiting();
        }catch (e){
            Indicator.open();
        }
    },
    indicatorClose(){
        try{
            plus.nativeUI.closeWaiting();
        }catch (e){
            Indicator.close();
        }
    },
    Toast(message, options) {
        try{
            plus.nativeUI.toast(message, options);
        }catch (e){
            Toast__(message);
        }

    },
    confirmUI(title,message,confirmText,cancelText,confirm,cancel){
        let showCancel = !comHelp.isEmptyString(cancelText);
        MessageBox({
            title: title,
            message: message,
            showCancelButton: showCancel,
            confirmButtonText: confirmText,
            cancelButtonText: cancelText,
            closeOnClickModal:false,//不给点击外面关闭
        }).then(action => {
            if (action == 'confirm') {
                if (!comHelp.isNull(confirm)) {
                    confirm();
                }
            } else {
                if (!comHelp.isNull(cancel)) {
                    cancel();
                }
            }
        });
    },
    /**
     *
     * @param title
     * @param message
     * @param confirmText
     * @param cancelText ''就是不显示取消
     * @param confirm
     * @param cancel
     */
    confirm(title,message,confirmText,cancelText,confirm,cancel){

        try {
            let buttons = [confirmText];
            if (!comHelp.isEmptyString(cancelText)) {
                buttons.push(cancelText);
            }
            plus.nativeUI.confirm(message,
                function (event) {
                    var index = event.index; // 用户关闭确认对话框点击按钮的索引值
                    if (index == 0) {
                        if (!comHelp.isNull(confirm)) {
                            confirm();
                        }
                    } else if (index == -1||index==1) {//安卓 用户按下回退 关闭对话框，重新弹出
                        if (!comHelp.isNull(cancel)) {
                            cancel();
                        }
                    }
                },
                {
                    "title": title,
                    "buttons": buttons,
                }
            );
        }catch (e) {
            this.confirmUI(title, message, confirmText, cancelText, confirm, cancel);
        }

    },

}