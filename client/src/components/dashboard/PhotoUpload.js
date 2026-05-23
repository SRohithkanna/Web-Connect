import React, { useState } from 'react';
import { connect } from 'react-redux';
import { uploadProfilePhoto } from '../../actions/upload';

const PhotoUpload = ({ uploadProfilePhoto, currentAvatar }) => {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [uploading, setUploading] = useState(false);

  const onChange = (e) => {
    const selected = e.target.files[0];
    if (selected) {
      setFile(selected);
      setPreview(URL.createObjectURL(selected));
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!file) return;
    setUploading(true);
    const formData = new FormData();
    formData.append('photo', file);
    await uploadProfilePhoto(formData);
    setUploading(false);
    setFile(null);
    setPreview(null);
  };

  return (
    <div className="photo-upload my-2">
      <h3 className="text-primary">Profile Photo</h3>
      <div className="photo-preview">
        <img
          src={preview || currentAvatar}
          alt="Profile"
          style={{
            width: '100px',
            height: '100px',
            borderRadius: '50%',
            objectFit: 'cover',
            border: '3px solid var(--primary-color)',
            marginBottom: '1rem'
          }}
        />
      </div>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <input
            type="file"
            accept="image/*"
            onChange={onChange}
            style={{ marginBottom: '0.5rem' }}
          />
          <small className="form-text">
            Accepted formats: JPG, PNG, GIF. Max size: 5MB.
          </small>
        </div>
        {file && (
          <button
            type="submit"
            className="btn btn-primary"
            disabled={uploading}
          >
            {uploading ? 'Uploading...' : 'Upload Photo'}
          </button>
        )}
      </form>
    </div>
  );
};

const mapStateToProps = (state) => ({
  currentAvatar: state.auth.user?.avatar
});

export default connect(mapStateToProps, { uploadProfilePhoto })(PhotoUpload);