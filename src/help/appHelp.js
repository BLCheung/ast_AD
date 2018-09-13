import comHelp from "./comHelp";
import apiClient from "../apiClient";

export default {


    /**
     *
     * @param urlJsonArray '["dd","ss"]'
     * @returns {Array}  ["http://ssxx/dd","http://ssxx/ss"] 失败会是[]
     */
    toImageUrls(urlJsonArray){
        let roomPics=[];
        try {
            roomPics = JSON.parse(urlJsonArray);
        }catch (e){}
        if(comHelp.isNull(roomPics)){
            roomPics=[];
        }
        for(let i=0;i<roomPics.length;i++){
            roomPics[i]=apiClient.getImageUrl(roomPics[i]);
        }
        return roomPics;

    },



}