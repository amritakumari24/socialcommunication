import React, { useState, useRef } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useSelector } from 'react-redux';
import { postsApi } from '../services/api';
import PostCard from '../components/PostCard';
import NewPostForm from '../components/NewPostForm';

// Feed page shows list of all posts and form to create new post
function FeedPage() {
  const queryClient = useQueryClient();
  const [showNewPostForm, setShowNewPostForm] = useState(false);

  // Fetch all posts using React Query
  const { data: posts, isLoading, isError, error } = useQuery({
    queryKey: ['posts'], // Unique key for this query
    queryFn: postsApi.getAllPosts, // Function to fetch data
  });

  // Show loading state
  if (isLoading) {
    return <div className="loading">Loading posts...</div>;
  }

  // Show error state
  if (isError) {
    return <div className="error">Error loading posts: {error.message}</div>;
  }

  // Sort posts by date (newest first)
  const sortedPosts = [...posts].sort((a, b) => 
    new Date(b.createdAt) - new Date(a.createdAt)
  );

  return (
    <div className="feed-page">
      <div className="feed-header">
        <h2>Latest Posts</h2>
        <button 
          onClick={() => setShowNewPostForm(!showNewPostForm)}
          className="btn btn-primary"
        >
          {showNewPostForm ? 'Cancel' : '✏️ New Post'}
        </button>
      </div>

      {/* Show new post form when button is clicked */}
      {showNewPostForm && (
        <NewPostForm onSuccess={() => setShowNewPostForm(false)} />
      )}

      {/* List of posts */}
      <div className="posts-list">
        {sortedPosts.length === 0 ? (
          <p className="no-posts">No posts yet. Be the first to post!</p>
        ) : (
          sortedPosts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))
        )}
      </div>
    </div>
  );
}

export default FeedPage;
