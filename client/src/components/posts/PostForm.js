import React, { useState } from 'react';
import { connect } from 'react-redux';
import { addPost } from '../../actions/post';
import { uploadPostImage } from '../../actions/upload';

const PostForm = ({ addPost }) => {
  const [text, setText] = useState('');
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [uploading, setUploading] = useState(false);

  const onImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const removeImage = () => {
    setImage(null);
    setPreview(null);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setUploading(true);
    let imageUrl = null;

    if (image) {
      const formData = new FormData();
      formData.append('image', image);
      imageUrl = await uploadPostImage(formData);
    }

    addPost({ text, image: imageUrl });
    setText('');
    setImage(null);
    setPreview(null);
    setUploading(false);
  };

  return (
    <div className="post-form">
      <div className="bg-primary p">
        <h3>Say Something...</h3>
      </div>
      <form className="form my-1" onSubmit={onSubmit}>
        <textarea
          name="text"
          cols="30"
          rows="5"
          placeholder="Create a post"
          value={text}
          onChange={(e) => setText(e.target.value)}
          required
        />
        {preview && (
          <div style={{ position: 'relative', display: 'inline-block', marginBottom: '1rem' }}>
            <img
              src={preview}
              alt="Preview"
              style={{ maxWidth: '100%', maxHeight: '300px', borderRadius: '4px' }}
            />
            <button
              type="button"
              onClick={removeImage}
              style={{
                position: 'absolute', top: '5px', right: '5px',
                background: 'red', color: '#fff', border: 'none',
                borderRadius: '50%', width: '25px', height: '25px',
                cursor: 'pointer', fontSize: '0.8rem'
              }}
            >
              ✕
            </button>
          </div>
        )}
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <input
            type="submit"
            className="btn btn-dark my-1"
            value={uploading ? 'Posting...' : 'Submit'}
            disabled={uploading}
          />
          <label
            htmlFor="post-image"
            className="btn btn-light my-1"
            style={{ cursor: 'pointer' }}
          >
            📷 Add Image
          </label>
          <input
            id="post-image"
            type="file"
            accept="image/*"
            onChange={onImageChange}
            style={{ display: 'none' }}
          />
        </div>
      </form>
    </div>
  );
};

export default connect(null, { addPost })(PostForm);