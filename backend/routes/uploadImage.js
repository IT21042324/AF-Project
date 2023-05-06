// import { v2 as cloudinary } from 'cloudinary';
const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: "didbbkorv",
  api_key: "743328695584488",
  api_secret: "G-eXpwReH1hBha71EL1qvjla6sY"
});

const opts = {
  overwrite: true,
  invalidate: true,
  resource_type: "auto",
};

const uploadImage = (image) => {
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

module.exports = uploadImage;
