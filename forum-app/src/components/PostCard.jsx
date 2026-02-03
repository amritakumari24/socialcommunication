import React from 'react';
import { Link } from 'react-router-dom';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useSelector } from 'react-redux';
import { postsApi } from '../services/api';

// PostCard component displays a single post in the feed
function PostCard({ post }) {
  const queryClient = useQueryClient();
  const currentUser = useSelector((state) => state.user.currentUser);
  
  // Check if current user has liked this post
  const isLiked = post.likedBy?.includes(currentUser.id);

  // Mutation to update post (for liking)
  const likePostMutation = useMutation({
    mutationFn: (updatedPost) => postsApi.updatePost(post.id, updatedPost),
    onSuccess: () => {
      // Refresh posts list after like
      queryClient.invalidateQueries({ queryKey: ['posts'] });
    },
  });

  // Handle like button click
  const handleLike = (e) => {
    e.preventDefault(); // Prevent navigation to post detail
    
    let newLikedBy;
    let newLikes;

    if (isLiked) {
      // Unlike: remove user from likedBy array
      newLikedBy = post.likedBy.filter(id => id !== currentUser.id);
      newLikes = post.likes - 1;
    } else {
      // Like: add user to likedBy array
      newLikedBy = [...(post.likedBy || []), currentUser.id];
      newLikes = post.likes + 1;
    }

    // Update the post
    likePostMutation.mutate({
      likes: newLikes,
      likedBy: newLikedBy,
    });
  };

  // Format date to readable format
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now - date) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    if (diffInHours < 48) return 'Yesterday';
    return date.toLocaleDateString();
  };

  return (
    <Link to={`/posts/${post.id}`} className="post-card">
      <div className="post-header">
        <img 
          src={post.author?.avatar || 'https://api.dicebear.com/7.x/avataaars/svg?seed=default'} 
          alt={post.author?.displayName || 'Anonymous'}
          className="avatar"
        />
        <div className="post-meta">
          <h3 className="post-author">{post.author?.displayName || 'Anonymous User'}</h3>
          <span className="post-username">@{post.author?.username || 'anonymous'}</span>
          <span className="post-date">{formatDate(post.createdAt)}</span>
        </div>
      </div>

      <div className="post-content">
        <h2 className="post-title">{post.title}</h2>
        <p className="post-text">
          {post.content.length > 200 
            ? `${post.content.substring(0, 200)}...` 
            : post.content
          }
        </p>

        {/* Tags */}
        {post.tags && post.tags.length > 0 && (
          <div className="post-tags">
            {post.tags.map((tag, index) => (
              <span key={index} className="tag">#{tag}</span>
            ))}
          </div>
        )}
      </div>

      <div className="post-footer">
        <button 
          onClick={handleLike}
          className={`post-action ${isLiked ? 'liked' : ''}`}
        >
          {isLiked ? '❤️' : '🤍'} {post.likes}
        </button>
        
        <span className="post-action">
          💬 {post.commentCount || 0}
        </span>
        
        <span className="post-action">
          👁️ {post.views || 0}
        </span>
      </div>
    </Link>
  );
}

export default PostCard;
