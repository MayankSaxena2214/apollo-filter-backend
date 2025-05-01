// import { bucketName } from "../config.js";
import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
// import { s3 } from "../utils/s3Client.js";
import dotenv from "dotenv";
dotenv.config()
import AWS from "aws-sdk";
// import { access_key, access_secret, region } from "../config.js";

console.log(process.env.PORT)
const access_secret = process.env.S3_ACCESS_SECRET;
const access_key = process.env.S3_ACCESS_KEY;
const region = process.env.S3_REGION;
const bucketName=process.env.S3_BUCKET_NAME;





const s3=new AWS.S3({
    
    credentials:{
        secretAccessKey:access_secret,
        accessKeyId:access_key
    },
    region:region
});
console.log(access_key,access_secret,region,bucketName)

// ✅ Correct usage with Express handler
export const getSignedUrl = catchAsyncErrors(async (req, res, next) => {
  const { filename, contentType } = req.body;

  const { uploadUrl, publicUrl } = await generateSignedUrl(filename, contentType);

  return res.status(200).json({
    success: true,
    uploadUrl,
    publicUrl,
  });
});

// ✅ Utility function (don't wrap with catchAsyncErrors)
export const generateSignedUrl = async (filename, contentType) => {
  const key = `project/${Date.now()}-${filename}`;

  const uploadUrl = await s3.getSignedUrlPromise("putObject", {
    Bucket: "mayanksaxena-testing-s3",
    Key: key,
    Expires: 180,
    ContentType: contentType,
  });

  const publicUrl = `https://${bucketName}.s3.${region}.amazonaws.com/${key}`;

  return {
    uploadUrl,
    publicUrl,
  };
};

// import { bucketName, region } from "../config.js";
// import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
// import { s3 } from "../utils/s3Client.js";

// // ✅ Correct usage with Express handler
// export const getSignedUrl = catchAsyncErrors(async (req, res, next) => {
//   const { filename, contentType } = req.body;

//   const { uploadUrl, publicUrl } = await generateSignedUrl(filename, contentType);

//   return res.status(200).json({
//     success: true,
//     uploadUrl,
//     publicUrl,
//   });
// });

// // ✅ Utility function (don't wrap with catchAsyncErrors)
// export const generateSignedUrl = async (filename, contentType) => {
//   const key = `project/${Date.now()}-${filename}`;

//   const uploadUrl = await s3.getSignedUrlPromise("putObject", {
//     Bucket: "mayanksaxena-testing-s3",
//     Key: key,
//     Expires: 180,
//     ContentType: contentType,
//   });

//   const publicUrl = `https://${bucketName}.s3.${region}.amazonaws.com/${key}`;

//   return {
//     uploadUrl,
//     publicUrl,
//   };
// };
