import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getPost } from '../../actions/post';
import PostItem from './PostItem';
import CommentForm from './CommentForm';
import CommentItem from './CommentItem';
import Spinner from '../layout/Spinner';

const Post = ({ getPost, post: { post }, match }) => {
  const { id } = useParams();
  useEffect(() => {
    getPost(id);
  }, [getPost, id]);

  return (
    <div className="post-page">
      <Link to="/posts" className="btn btn-light my-1">
        Back To Posts
      </Link>
      {post === null ? (
        <Spinner />
      ) : (
        <>
          <PostItem post={post} />
          <div className="post-comments my-2">
            <CommentForm postId={post._id} />
            <div className="comments">
              {post.comments && post.comments.map((comment) => (
                <CommentItem key={comment._id} comment={comment} postId={post._id} />
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

Post.propTypes = {
  getPost: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  post: state.post
});

export default connect(mapStateToProps, { getPost })(Post);
