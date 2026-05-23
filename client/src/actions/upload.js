import axios from 'axios';
import { setAlert } from './alert';
import { loadUser } from './auth';
import { getCurrentProfile } from './profile';
import {
  UPLOAD_PHOTO_SUCCESS,
  UPLOAD_PHOTO_FAIL,
  UPLOAD_RESUME_SUCCESS,
  UPLOAD_RESUME_FAIL
} from './types';

// Upload profile photo
export const uploadProfilePhoto = (formData) => async (dispatch) => {
  try {
    const config = { headers: { 'Content-Type': 'multipart/form-data' } };
    const res = await axios.post('/api/upload/profile-photo', formData, config);
    dispatch({ type: UPLOAD_PHOTO_SUCCESS, payload: res.data });
    dispatch(setAlert('Profile photo updated!', 'success'));
    dispatch(loadUser()); // refresh user so avatar updates everywhere
  } catch (err) {
    dispatch({ type: UPLOAD_PHOTO_FAIL });
    dispatch(setAlert('Photo upload failed', 'danger'));
  }
};

// Upload post image
export const uploadPostImage = async (formData) => {
  try {
    const config = { headers: { 'Content-Type': 'multipart/form-data' } };
    const res = await axios.post('/api/upload/post-image', formData, config);
    return res.data.imageUrl;
  } catch (err) {
    console.error(err.message);
    return null;
  }
};

// Upload resume
export const uploadResume = (formData) => async (dispatch) => {
  try {
    const config = { headers: { 'Content-Type': 'multipart/form-data' } };
    const res = await axios.post('/api/upload/resume', formData, config);
    dispatch({ type: UPLOAD_RESUME_SUCCESS, payload: res.data });
    dispatch(setAlert('Resume uploaded!', 'success'));
    dispatch(getCurrentProfile());
  } catch (err) {
    dispatch({ type: UPLOAD_RESUME_FAIL });
    dispatch(setAlert('Resume upload failed', 'danger'));
  }
};