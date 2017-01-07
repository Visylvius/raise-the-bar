var cloudinary = require('cloudinary');

// cloudinary.config({
//   cloud_name: process.env.CLOUD_NAME,
//   api_key: process.env.CLOUDINARY_API_KEY,
//   api_secret: process.env.CLOUDINARY_API_SECRET
// });

cloudinary.config({
  cloud_name: 'insert stuff here',
  api_key: 'insert stuff here',
  api_secret: 'insert stuff here'
});

exports.uploadPhoto = (imgBuffer, imgId) => {
  cloudinary.v2.uploader.upload(imgBuffer, {publicId: imgId}, (result) => {
    console.log('result', result);
  });
};
