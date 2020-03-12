import AWS from "aws-sdk";
import axios from "axios";

const { S3_KEY, S3_SECRET, BUCKET_REGION, BUCKET_NAME } = process.env;
AWS.config = new AWS.Config({
  accessKeyId: S3_KEY,
  secretAccessKey: S3_SECRET,
  region: BUCKET_REGION
});

const s3 = new AWS.S3();

function presignedURL(action, params) {
  return new Promise((resolve, reject) => {
    s3.getSignedURL(action, params, (err, url) => {
      if (err) reject(err);
      else resolve(url);
    });
  });
}

export function retrieveFromS3(fileName) {
  const params = { Bucket: BUCKET_NAME, Key: fileName, Expires: 300 };
  return presignedURL("getObject", params);
}

export function uploadToS3(file) {
  function generatePutURL(fileName) {
    const params = {
      Bucket: BUCKET_NAME,
      Key: fileName,
      ContentType: file.type,
      ACL: "public-read"
    };
    return presignedURL("putObject", params);
  }
  const url = generatePutURL(file["name"]);
  const options = {
    params: { Key: file["name"], ContentType: file.type },
    headers: { "Content-Type": file.type }
  };
  axios
    .put(url, file, options)
    .then(res => {
      console.log(res);
    })
    .catch(err => console.err(err));
}


