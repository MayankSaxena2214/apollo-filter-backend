import AWS from "aws-sdk";
import { access_key, access_secret, region } from "../config.js";





export const s3=new AWS.S3({
    
    credentials:{
        secretAccessKey:access_secret,
        accessKeyId:access_key
    },
    region:region
});