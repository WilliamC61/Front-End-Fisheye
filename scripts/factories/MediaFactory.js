import {Image} from "../models/Media.js";
import {Video} from "../models/Media.js";

class MediaFactory {
    constructor(data, type) {
        // 
        if (type === "image") {
            return new Image(data);
        // 
        } else if (type === "video") {
            return new Video(data);
        // 
        } else {
            throw `Unknown media type : ${type}`;
        }
    }
}
export {MediaFactory};