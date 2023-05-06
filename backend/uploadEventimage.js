//import { v2 as cloudinary } from "cloudinary";
const cloudinary = require("cloudinary").v2;
cloudinary.config({
  cloud_name: "djkbqtds4",
  api_key: "874229631182893",
  api_secret: "YUJCUs9r5GpjQyyOnL1CX0BDoqQ",
});

const opts = {
  overwrite: true,
  invalidate: true,
  resource_type: "auto",
};

const uploadEventimage = (image) => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload(image, opts, (error, result) => {
      if (result && result.secure_url) {
        console.log(result.secure_url);
        return resolve(result.secure_url);
      }
      console.log(error.message);
      return reject({ message: error.message });
    });
  });
};

module.exports = uploadEventimage;
