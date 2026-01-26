import axios from 'axios';

// Base URL for the API (json-server backend)
const API_BASE_URL = 'http://localhost:3001';

// Create axios instance with base configuration
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// API service functions for posts
export const postsApi = {
  // Fetch all posts
  getAllPosts: async () => {
    const response = await api.get('/posts');
    return response.data;
  },

  // Fetch a single post by ID
  getPostById: async (id) => {
    const response = await api.get(`/posts/${id}`);
    return response.data;
  },

  // Create a new post
  createPost: async (postData) => {
    const response = await api.post('/posts', postData);
    return response.data;
  },

  // Update a post (like)
  updatePost: async (id, postData) => {
    const response = await api.patch(`/posts/${id}`, postData);
    return response.data;
  },
};

// API service functions for comments
export const commentsApi = {
  // Fetch comments for a specific post
  getCommentsByPostId: async (postId) => {
    const response = await api.get(`/comments?postId=${postId}`);
    return response.data;
  },

  // Create a new comment
  createComment: async (commentData) => {
    const response = await api.post('/comments', commentData);
    return response.data;
  },

  // Update a comment (like)
  updateComment: async (id, commentData) => {
    const response = await api.patch(`/comments/${id}`, commentData);
    return response.data;
  },
};
