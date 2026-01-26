import React, { Suspense, lazy } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useSelector } from 'react-redux';
import { postsApi } from '../services/api';

// Lazy load Comments component - it will only load when needed
const CommentsSection = lazy(() => import('../components/CommentsSection'));

// Post Detail page shows full post with comments
function PostDetailPage() {
  const { id } = useParams(); // Get post ID from URL
  const queryClient = useQueryClient();
  const currentUser = useSelector((state) => state.user.currentUser);

  // Fetch single post by ID
  const { data: post, isLoading, isError } = useQuery({
    queryKey: ['post', id],
    queryFn: () => postsApi.getPostById(id),
  });

  // Mutation to like/unlike post
  const likePostMutation = useMutation({
    mutationFn: (updatedPost) => postsApi.updatePost(id, updatedPost),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['post', id] });
      queryClient.invalidateQueries({ queryKey: ['posts'] });
    },
  });

  if (isLoading) {
    return <div className="loading">Loading post...</div>;
  }

  if (isError || !post) {
    return (
      <div className="error">
        <p>Post not found</p>
        <Link to="/feed" className="btn">← Back to Feed</Link>
      </div>
    );
  }

  const isLiked = post.likedBy?.includes(currentUser.id);

  // Handle like button click
  const handleLike = () => {
    let newLikedBy;
    let newLikes;

    if (isLiked) {
      newLikedBy = post.likedBy.filter(id => id !== currentUser.id);
      newLikes = post.likes - 1;
    } else {
      newLikedBy = [...(post.likedBy || []), currentUser.id];
      newLikes = post.likes + 1;
    }

    likePostMutation.mutate({
      likes: newLikes,
      likedBy: newLikedBy,
    });
  };

  // Format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="post-detail-page">
      <Link to="/feed" className="back-link">← Back to Feed</Link>

      <div className="post-detail">
        {/* Post header with author info */}
        <div className="post-detail-header">
          <img 
            src={post.author.avatar} 
            alt={post.author.displayName}
            className="avatar-large"
          />
          <div className="author-info">
            <h3>{post.author.displayName}</h3>
            <p className="username">@{post.author.username}</p>
            <p className="date">{formatDate(post.createdAt)}</p>
          </div>
        </div>

        {/* Post content */}
        <div className="post-detail-content">
          <h1>{post.title}</h1>
          <p className="post-full-content">{post.content}</p>

          {/* Tags */}
          {post.tags && post.tags.length > 0 && (
            <div className="post-tags">
              {post.tags.map((tag, index) => (
                <span key={index} className="tag">#{tag}</span>
              ))}
            </div>
          )}
        </div>

        {/* Post actions */}
        <div className="post-detail-actions">
          <button 
            onClick={handleLike}
            className={`action-btn ${isLiked ? 'liked' : ''}`}
          >
            {isLiked ? '❤️' : '🤍'} {post.likes} Likes
          </button>
          
          <span className="stat">
            💬 {post.commentCount || 0} Comments
          </span>
          
          <span className="stat">
            👁️ {post.views || 0} Views
          </span>
        </div>
      </div>

      {/* Comments section - lazy loaded */}
      <Suspense fallback={<div className="loading">Loading comments...</div>}>
        <CommentsSection postId={id} />
      </Suspense>
    </div>
  );
}

export default PostDetailPage;
