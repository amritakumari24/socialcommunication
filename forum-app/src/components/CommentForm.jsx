import React, { useState, useRef, useEffect } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useSelector } from 'react-redux';
import { commentsApi } from '../services/api';

// Form to add a new comment or reply
function CommentForm({ postId, parentCommentId = null, onSuccess }) {
  const queryClient = useQueryClient();
  const currentUser = useSelector((state) => state.user.currentUser);
  const [content, setContent] = useState('');
  
  // useRef to auto-focus textarea
  const textareaRef = useRef(null);

  // Auto-focus textarea when form opens
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.focus();
    }
  }, []);

  // Mutation to create comment
  const createCommentMutation = useMutation({
    mutationFn: commentsApi.createComment,
    onSuccess: () => {
      // Refresh comments list
      queryClient.invalidateQueries({ queryKey: ['comments', postId] });
      // Reset form
      setContent('');
      // Call success callback
      if (onSuccess) onSuccess();
    },
  });

  // Handle form submit
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!content.trim()) {
      alert('Please enter a comment');
      return;
    }

    const newComment = {
      postId: parseInt(postId),
      parentCommentId: parentCommentId,
      authorId: currentUser.id,
      author: {
        id: currentUser.id,
        username: currentUser.username,
        displayName: currentUser.displayName,
        avatar: currentUser.avatar,
      },
      content: content.trim(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      likes: 0,
      likedBy: [],
      replies: 0,
    };

    createCommentMutation.mutate(newComment);
  };

  return (
    <form onSubmit={handleSubmit} className="comment-form">
      <textarea
        ref={textareaRef}
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder={parentCommentId ? "Write a reply..." : "Write a comment..."}
        className="comment-textarea"
        rows={3}
      />
      <button 
        type="submit" 
        className="btn btn-primary"
        disabled={createCommentMutation.isLoading}
      >
        {createCommentMutation.isLoading ? 'Posting...' : 'Post'}
      </button>
    </form>
  );
}

export default CommentForm;
