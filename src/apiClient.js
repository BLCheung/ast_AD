import config from './config'

function handCode(pageContent, code) {

}


function baseXXX(pageContent, request, resultBC, dataParser, isNeedLogin) {
    request.credentials = true;//在这里无效的

    if (typeof dataParser == 'boolean') {
        isNeedLogin = dataParser;
        dataParser = undefined;
    }


    request.then(function (response) {
        var data = response.body;
        handCode(pageContent, data.code);
        if (data.code == 0) {
            resultBC(true, dataParser != undefined ? dataParser(data) : data);
        } else {
            resultBC(false, data);
        }
    }, function (response) {
        let tips = "访问出错";
        try {
            if (plus.networkinfo.getCurrentType() == plus.networkinfo.CONNECTION_NONE) {
                tips = '网络异常，请检查网络设置！';
            }
        } catch (e) {
        }

        resultBC(false, {msg: tips});
    })
}

export default {

    // /**
    //  * @param pageContent
    //  * @param successBC
    //  */
    // get(pageContent,  resultBC) {
    //     baseXXX(pageContent, pageContent.$http.get(config.ApiHost + '/hotelmanager/login', {
    //         params: {
    //         }
    //     }), resultBC);
    // },

    // /**
    //  * @param pageContent
    //  * @param resultBC
    //  */
    // post(pageContent, resultBC) {
    //     baseXXX(pageContent, pageContent.$http.post(config.ApiHost + '/confige.txt',
    //         {},
    //         {'emulateJSON': true}//请求体不使用json
    //     ), resultBC);
    // },

    /**
     * @param pageContent
     * @param successBC
     */
    getConfige(pageContent, resultBC) {
        baseXXX(pageContent, pageContent.$http.get(config.ApiHost + '/confige.txt', {
            params: {
            }
        }), resultBC);
    },

}