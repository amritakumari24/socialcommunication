import React, { useState, lazy, Suspense } from 'react';
import { useQuery } from '@tanstack/react-query';
import { commentsApi } from '../services/api';
import CommentForm from './CommentForm';

// Lazy load individual comment component
const Comment = lazy(() => import('./Comment'));

// Comments section shows all comments for a post
function CommentsSection({ postId }) {
  const [showCommentForm, setShowCommentForm] = useState(false);

  // Fetch comments for this post using React Query
  const { data: comments, isLoading, isError } = useQuery({
    queryKey: ['comments', postId],
    queryFn: () => commentsApi.getCommentsByPostId(postId),
  });

  if (isLoading) {
    return <div className="loading">Loading comments...</div>;
  }

  if (isError) {
    return <div className="error">Error loading comments</div>;
  }

  // Filter top-level comments (no parent)
  const topLevelComments = comments.filter(c => !c.parentCommentId);

  // Find replies for a comment
  const getReplies = (commentId) => {
    return comments.filter(c => c.parentCommentId === commentId);
  };

  return (
    <div className="comments-section">
      <div className="comments-header">
        <h2>Comments ({comments.length})</h2>
        <button 
          onClick={() => setShowCommentForm(!showCommentForm)}
          className="btn btn-secondary"
        >
          {showCommentForm ? 'Cancel' : '💬 Add Comment'}
        </button>
      </div>

      {/* Comment form */}
      {showCommentForm && (
        <CommentForm 
          postId={postId}
          onSuccess={() => setShowCommentForm(false)}
        />
      )}

      {/* Comments list */}
      <div className="comments-list">
        {topLevelComments.length === 0 ? (
          <p className="no-comments">No comments yet. Be the first to comment!</p>
        ) : (
          <Suspense fallback={<div className="loading">Loading...</div>}>
            {topLevelComments.map((comment) => (
              <Comment 
                key={comment.id} 
                comment={comment}
                replies={getReplies(comment.id)}
                postId={postId}
              />
            ))}
          </Suspense>
        )}
      </div>
    </div>
  );
}

export default CommentsSection;
