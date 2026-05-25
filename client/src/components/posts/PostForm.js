import React, { useState } from 'react';
import { connect } from 'react-redux';
import { addPost } from '../../actions/post';
import { getPosts } from '../../actions/post';   // ADD THIS
import axios from 'axios';

const PostForm = ({ addPost, getPosts }) => {   // ADD getPosts here
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
      try {
        const formData = new FormData();
        formData.append('image', image);
        const config = { headers: { 'Content-Type': 'multipart/form-data' } };
        const res = await axios.post('/api/upload/post-image', formData, config);
        imageUrl = res.data.imageUrl;
      } catch (err) {
        console.error('Upload failed:', err);
      }
    }

    await addPost({ text, image: imageUrl });
    await getPosts();   // ADD THIS — refetch all posts so image shows immediately

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
              style={{
                maxWidth: '100%',
                maxHeight: '300px',
                borderRadius: '4px',
                display: 'block'
              }}
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

        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap' }}>
          <input
            type="submit"
            className="btn btn-dark my-1"
            value={uploading ? 'Posting...' : 'Submit'}
            disabled={uploading}
          />
          <label
            htmlFor="post-image"
            className="btn btn-light my-1"
            style={{ cursor: 'pointer', marginBottom: '0' }}
          >
            📷 {image ? image.name.substring(0, 15) + '...' : 'Add Image'}
          </label>
          <input
            id="post-image"
            type="file"
            accept="image/*"
            onChange={onImageChange}
            style={{ display: 'none' }}
          />
          {image && (
            <button
              type="button"
              className="btn btn-danger my-1"
              onClick={removeImage}
            >
              Remove
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default connect(null, { addPost, getPosts })(PostForm);   // ADD getPosts