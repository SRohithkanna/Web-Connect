import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import { getPost } from '../../actions/post';
import { addLike, removeLike, deletePost } from '../../actions/post';
import Spinner from '../layout/Spinner';
import CommentForm from './CommentForm';
import CommentItem from './CommentItem';

const Post = ({ getPost, post: { post, loading }, auth, deletePost, addLike, removeLike }) => {
  const { id } = useParams();

  useEffect(() => {
    getPost(id);
  }, [getPost, id]);

  return loading || post === null ? (
    <Spinner />
  ) : (
    <section className="container">
      <Link to="/posts" className="btn btn-light">
        Back To Posts
      </Link>

      {/* Single Post */}
      <div className="post bg-white p-1 my-1">
        <div>
          <Link to={`/profile/${post.user}`}>
            <img
              className="round-img"
              src={post.avatar}
              alt={post.name}
              style={{ width: '50px', height: '50px', objectFit: 'cover' }}
            />
            <h4>{post.name}</h4>
          </Link>
        </div>
        <div>
          <p className="my-1">{post.text}</p>
          <p className="post-date">
            Posted on {new Date(post.date).toLocaleDateString()}
          </p>
          <button
            onClick={() => addLike(post._id)}
            type="button"
            className="btn btn-light"
          >
            <i className="fas fa-thumbs-up" />{' '}
            {post.likes.length > 0 && <span>{post.likes.length}</span>}
          </button>
          <button
            onClick={() => removeLike(post._id)}
            type="button"
            className="btn btn-light"
          >
            <i className="fas fa-thumbs-down" />
          </button>
          <span className="btn btn-primary">
            Comments{' '}
            {post.comments.length > 0 && (
              <span className="comment-count">{post.comments.length}</span>
            )}
          </span>
          {!auth.loading && post.user === auth.user._id && (
            <button
              onClick={() => deletePost(post._id)}
              type="button"
              className="btn btn-danger"
            >
              <i className="fas fa-times" />
            </button>
          )}
        </div>
      </div>

      {/* Comment Form */}
      <CommentForm postId={post._id} />

      {/* Comments */}
      <div className="comments">
        <h2 className="text-primary my-1">Comments</h2>
        {post.comments.length === 0 ? (
          <p>No comments yet, be the first!</p>
        ) : (
          post.comments.map((comment) => (
            <CommentItem
              key={comment._id}
              comment={comment}
              postId={post._id}
            />
          ))
        )}
      </div>
    </section>
  );
};

const mapStateToProps = (state) => ({
  post: state.post,
  auth: state.auth
});

export default connect(mapStateToProps, { getPost, addLike, removeLike, deletePost })(Post);