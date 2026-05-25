const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const { uploadProfilePhoto, uploadPostImage, uploadResume } = require('../../config/cloudinary');
const User = require('../../models/User');
const Profile = require('../../models/Profile');

// @route   POST api/upload/profile-photo
// @desc    Upload profile photo
// @access  Private
router.post(
  '/profile-photo',
  [auth, uploadProfilePhoto.single('photo')],
  async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ msg: 'No file uploaded' });
      }

      const imageUrl = req.file.path;

      // Update user avatar
      await User.findByIdAndUpdate(
        req.user.id,
        { avatar: imageUrl },
        { new: true }
      );

      res.json({ imageUrl, msg: 'Profile photo uploaded successfully' });
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route   POST api/upload/post-image
// @desc    Upload image for a post
// @access  Private
router.post(
  '/post-image',
  [auth, uploadPostImage.single('image')],
  async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ msg: 'No file uploaded' });
      }
      console.log('Uploaded file:', req.file);
      const imageUrl = req.file.path;
      res.json({ imageUrl, msg: 'Image uploaded successfully' });
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route   POST api/upload/resume
// @desc    Upload resume PDF
// @access  Private
router.post(
  '/resume',
  [auth, uploadResume.single('resume')],
  async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ msg: 'No file uploaded' });
      }

      const resumeUrl = req.file.path;

      // Save resume URL to profile
      await Profile.findOneAndUpdate(
        { user: req.user.id },
        { resume: resumeUrl },
        { new: true }
      );

      res.json({ resumeUrl, msg: 'Resume uploaded successfully' });
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

module.exports = router;