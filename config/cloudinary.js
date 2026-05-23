const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// Storage for profile photos (images only)
const profilePhotoStorage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'devconnector/profile-photos',
    allowed_formats: ['jpg', 'jpeg', 'png', 'gif'],
    transformation: [{ width: 200, height: 200, crop: 'fill' }]
  }
});

// Storage for post images
const postImageStorage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'devconnector/post-images',
    allowed_formats: ['jpg', 'jpeg', 'png', 'gif'],
    transformation: [{ width: 800, crop: 'limit' }]
  }
});

// Storage for resumes (PDFs)
const resumeStorage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'devconnector/resumes',
    allowed_formats: ['pdf'],
    resource_type: 'raw'
  }
});

const uploadProfilePhoto = multer({ storage: profilePhotoStorage });
const uploadPostImage = multer({ storage: postImageStorage });
const uploadResume = multer({ storage: resumeStorage });

module.exports = { uploadProfilePhoto, uploadPostImage, uploadResume, cloudinary };
