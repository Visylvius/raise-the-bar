var cloudinary = require('cloudinary');

// cloudinary.config({
//   cloud_name: process.env.CLOUD_NAME,
//   api_key: process.env.CLOUDINARY_API_KEY,
//   api_secret: process.env.CLOUDINARY_API_SECRET
// });

cloudinary.config({
  cloud_name: 'raise-the-bar',
  api_key: '542361533446431',
  api_secret: '_h2HI5kaohXFtDILSX6HDTFFkvo'
});

exports.uploadPhoto = (imgBuffer, imgId) => {
  cloudinary.v2.uploader.upload(imgBuffer, {publicId: imgId}, (result) => {
    console.log('result', result);
  });
};
