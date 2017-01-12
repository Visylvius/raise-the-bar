var cloudinary = require('cloudinary');




cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});



exports.uploadPhoto = (imgBuffer, imgId) => {
  console.log('imgId', imgId);
  cloudinary.v2.uploader.upload(imgBuffer, {public_id: imgId}, (result) => {
    console.log('result', result);
  });
};

// cloudinary.v2.uploader.upload(imgBuffer, {publicId: imgId}, (result) => {
//   console.log('result', result);
// });
