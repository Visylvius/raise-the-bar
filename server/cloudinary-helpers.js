var cloudinary = require('cloudinary');

// cloudinary.config({
//   cloud_name: process.env.CLOUD_NAME,
//   api_key: process.env.CLOUDINARY_API_KEY,
//   api_secret: process.env.CLOUDINARY_API_SECRET
// });

cloudinary.config({
  cloud_name: 'stuff goes here',
  api_key: 'stuff goes here',
  api_secret: 'stuff goes here'
});

exports.uploadPhoto = (imgBuffer, imgId) => {
  cloudinary.v2.uploader.upload(imgBuffer, {publicId: imgId}, (result) => {
    console.log('result', result);
  });
};
