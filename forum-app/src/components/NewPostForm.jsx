import React, { useState, useRef, useEffect } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useSelector } from 'react-redux';
import { postsApi } from '../services/api';

// Form to create a new post
function NewPostForm({ onSuccess }) {
  const queryClient = useQueryClient();
  const currentUser = useSelector((state) => state.user.currentUser);
  
  // Local state for form inputs
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [tags, setTags] = useState('');
  
  // useRef to auto-focus title input when form opens
  const titleInputRef = useRef(null);

  // Auto-focus the title input when component mounts
  useEffect(() => {
    if (titleInputRef.current) {
      titleInputRef.current.focus();
    }
  }, []);

  // Mutation to create a new post
  const createPostMutation = useMutation({
    mutationFn: postsApi.createPost,
    onSuccess: (newPost) => {
      // Update the posts list in cache immediately
      queryClient.invalidateQueries({ queryKey: ['posts'] });
      
      // Reset form
      setTitle('');
      setContent('');
      setTags('');
      
      // Call success callback
      if (onSuccess) onSuccess();
    },
  });

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate inputs
    if (!title.trim() || !content.trim()) {
      alert('Please fill in title and content');
      return;
    }

    // Create post object
    const newPost = {
      title: title.trim(),
      content: content.trim(),
      authorId: currentUser.id,
      author: {
        id: currentUser.id,
        username: currentUser.username,
        displayName: currentUser.displayName,
        avatar: currentUser.avatar,
      },
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      likes: 0,
      likedBy: [],
      commentCount: 0,
      tags: tags.trim() ? tags.split(',').map(tag => tag.trim()) : [],
      views: 0,
    };

    // Submit the post
    createPostMutation.mutate(newPost);
  };

  return (
    <div className="new-post-form">
      <h3>Create New Post</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            ref={titleInputRef}
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter post title..."
            className="form-input"
            maxLength={200}
          />
        </div>

        <div className="form-group">
          <label htmlFor="content">Content</label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Write your post content..."
            className="form-textarea"
            rows={6}
          />
        </div>

        <div className="form-group">
          <label htmlFor="tags">Tags (comma-separated)</label>
          <input
            type="text"
            id="tags"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            placeholder="React, JavaScript, Tutorial"
            className="form-input"
          />
        </div>

        <button 
          type="submit" 
          className="btn btn-primary"
          disabled={createPostMutation.isLoading}
        >
          {createPostMutation.isLoading ? 'Posting...' : 'Post'}
        </button>
      </form>
    </div>
  );
}

export default NewPostForm;
