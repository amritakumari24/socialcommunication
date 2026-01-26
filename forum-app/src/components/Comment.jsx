import React, { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useSelector } from 'react-redux';
import { commentsApi } from '../services/api';
import CommentForm from './CommentForm';

// Individual comment component
function Comment({ comment, replies, postId }) {
  const queryClient = useQueryClient();
  const currentUser = useSelector((state) => state.user.currentUser);
  const [showReplyForm, setShowReplyForm] = useState(false);
  const [showReplies, setShowReplies] = useState(false);

  const isLiked = comment.likedBy?.includes(currentUser.id);

  // Mutation to like/unlike comment
  const likeCommentMutation = useMutation({
    mutationFn: (updatedComment) => commentsApi.updateComment(comment.id, updatedComment),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['comments', postId] });
    },
  });

  // Handle like button click
  const handleLike = () => {
    let newLikedBy;
    let newLikes;

    if (isLiked) {
      newLikedBy = comment.likedBy.filter(id => id !== currentUser.id);
      newLikes = comment.likes - 1;
    } else {
      newLikedBy = [...(comment.likedBy || []), currentUser.id];
      newLikes = comment.likes + 1;
    }

    likeCommentMutation.mutate({
      likes: newLikes,
      likedBy: newLikedBy,
    });
  };

  // Format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now - date) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    return date.toLocaleDateString();
  };

  return (
    <div className="comment">
      <div className="comment-header">
        <img 
          src={comment.author.avatar} 
          alt={comment.author.displayName}
          className="avatar-small"
        />
        <div className="comment-meta">
          <span className="comment-author">{comment.author.displayName}</span>
          <span className="comment-username">@{comment.author.username}</span>
          <span className="comment-date">{formatDate(comment.createdAt)}</span>
        </div>
      </div>

      <div className="comment-content">
        <p>{comment.content}</p>
      </div>

      <div className="comment-actions">
        <button 
          onClick={handleLike}
          className={`comment-btn ${isLiked ? 'liked' : ''}`}
        >
          {isLiked ? '❤️' : '🤍'} {comment.likes}
        </button>
        
        <button 
          onClick={() => setShowReplyForm(!showReplyForm)}
          className="comment-btn"
        >
          💬 Reply
        </button>

        {replies && replies.length > 0 && (
          <button 
            onClick={() => setShowReplies(!showReplies)}
            className="comment-btn"
          >
            {showReplies ? '▼' : '▶'} {replies.length} {replies.length === 1 ? 'reply' : 'replies'}
          </button>
        )}
      </div>

      {/* Reply form */}
      {showReplyForm && (
        <div className="reply-form">
          <CommentForm 
            postId={postId}
            parentCommentId={comment.id}
            onSuccess={() => setShowReplyForm(false)}
          />
        </div>
      )}

      {/* Replies */}
      {showReplies && replies && replies.length > 0 && (
        <div className="replies">
          {replies.map((reply) => (
            <Comment 
              key={reply.id} 
              comment={reply}
              replies={[]}
              postId={postId}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default Comment;
