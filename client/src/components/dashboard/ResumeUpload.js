import React, { useState } from 'react';
import { connect } from 'react-redux';
import { uploadResume } from '../../actions/upload';

const ResumeUpload = ({ uploadResume, currentResume }) => {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  const onChange = (e) => setFile(e.target.files[0]);

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!file) return;
    setUploading(true);
    const formData = new FormData();
    formData.append('resume', file);
    await uploadResume(formData);
    setUploading(false);
    setFile(null);
  };

  return (
    <div className="resume-upload my-2">
      <h3 className="text-primary">Resume</h3>
      {currentResume && (
        <p className="my-1">
          Current Resume:{' '}
          <a
            href={currentResume}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-light"
          >
            📄 View Resume
          </a>
        </p>
      )}
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <input
            type="file"
            accept=".pdf"
            onChange={onChange}
            style={{ marginBottom: '0.5rem' }}
          />
          <small className="form-text">
            PDF format only. Max size: 5MB.
          </small>
        </div>
        {file && (
          <button
            type="submit"
            className="btn btn-primary"
            disabled={uploading}
          >
            {uploading ? 'Uploading...' : 'Upload Resume'}
          </button>
        )}
      </form>
    </div>
  );
};

const mapStateToProps = (state) => ({
  currentResume: state.profile.profile?.resume
});

export default connect(mapStateToProps, { uploadResume })(ResumeUpload);