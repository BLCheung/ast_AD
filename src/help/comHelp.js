export default {


    formatMoney(value){
        return this.formatFloat(value,2);
    },
    formatFloat(value,s){
        // console.log(value);
        var value =  (parseFloat(value) * 100) / 100;
        // console.log(value);
        var xsd = value.toString().split(".");

        let result=xsd[0]+ ".";
        let cs=0;//需要循环几次
        //没有点
        if (xsd.length == 1) {
            cs=s;
        }else if (xsd.length > 1) {
            //有点，就肯定是0.1。
            let n=xsd[1].substr(0,s);
            cs=Math.max(0,s-n.length);
            result=result+n;
        }
        for(let i=0;i<cs;i++){
            result=result+"0";
        }
        return result;
    },
    format_yyyy_MM_dd(val) {
        if (val != null) {
            var date = new Date(val);
            return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
        }
        return '';
    },
    /**
     * 没？的
     * @param obj
     * @returns {string}
     */
    toGetParams: function (obj) {
        var params = [];
        Object.keys(obj).forEach(function (key) {
            var value = obj[key];
            // 如果值为undefined我们将其置空
            if (this.isNull(value)) {
                value = '';
            }
            // 对于需要编码的文本（比如说中文）我们要进行编码
            params.push([key, encodeURIComponent(value)].join('='));
        });

        return params.join('&');
    },
    isEmptyString(s){
        return typeof s == 'undefined'||s==null||s=="";
    },
    isNull(o){
        return typeof o == 'undefined'||o==null;
    },
    /**
     *
     * @param dateString1 yyyy-mm-dd
     * @param dateString2
     * @returns {number}
     */
    getDaysByDateString(dateString1,dateString2){
        //获取起始时间的毫秒数
        //其中dateString1.replace('/-/g','/')是将日期格式为yyyy-mm-dd转换成yyyy/mm/dd
        //Date.parse()静态方法的返回值为1970年1月1日午时到当前字符串时间的毫秒数，返回值为整数
        //如果传入的日期只包含年月日不包含时分秒，则默认取的毫秒数为yyyy/mm/dd 00:00:00
        //取的是0时0分0秒的毫秒数，如果传入的是2015/07/03 12:20:12则取值为该时间点的毫秒数
        var  startDate=Date.parse(dateString1.replace('/-/g','/'));
        var  endDate=Date.parse(dateString2.replace('/-/g','/'));
        //因为不传时分秒的时候 默认取值到dateString2的0时0分0秒时的毫秒数，这样就不包含当前天数的毫秒数
        // /如果计算时要包含日期的当前天，就要加上一天的毫秒数，我的业务需要，将加上了。
        var diffDate=(endDate-startDate)+1*24*60*60*1000;
        //计算出两个日期字符串之间的相差的天数
        var days=diffDate/(1*24*60*60*1000);
        //alert(diffDate/(1*24*60*60*1000));
        return  days;
    }


}