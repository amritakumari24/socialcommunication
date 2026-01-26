# 🌐 Community Forum App

A modern, beginner-friendly community forum application built with React, Redux Toolkit, and React Query.

## ✨ Features

- **Feed Page**: Browse all posts with title, content, author, and timestamp
- **Post Detail Page**: View full post with comments and replies
- **Create Posts**: Add new posts with title, content, and tags
- **Like/Reply**: Interact with posts and comments
- **Comments System**: Nested comments with reply functionality
- **Dark/Light Theme**: Toggle between themes using Redux
- **React Query**: Smart data fetching and caching
- **Lazy Loading**: Components load only when needed for better performance
- **Routing**: Navigate between pages with React Router

## 🛠️ Technologies Used

- **React 18**: UI library
- **React Router v6**: Client-side routing
- **Redux Toolkit**: Global state management (user, theme)
- **React Query (TanStack Query)**: Server state management
- **Axios**: HTTP client for API calls
- **Vite**: Fast build tool and dev server
- **JSON Server**: Mock REST API backend

## 📁 Project Structure

```
forum-app/
├── src/
│   ├── components/          # Reusable components
│   │   ├── Comment.jsx      # Individual comment component
│   │   ├── CommentForm.jsx  # Form to add comments/replies
│   │   ├── CommentsSection.jsx  # Comments list (lazy loaded)
│   │   ├── Layout.jsx       # App layout with header
│   │   ├── NewPostForm.jsx  # Form to create new posts
│   │   └── PostCard.jsx     # Post card in feed
│   ├── pages/               # Page components
│   │   ├── FeedPage.jsx     # Main feed with all posts
│   │   └── PostDetailPage.jsx  # Single post detail view
│   ├── services/            # API service layer
│   │   └── api.js           # API functions for posts/comments
│   ├── store/               # Redux store
│   │   ├── slices/
│   │   │   ├── userSlice.js    # User state (logged-in user)
│   │   │   └── themeSlice.js   # Theme state (light/dark)
│   │   └── store.js         # Redux store configuration
│   ├── App.jsx              # Main app component
│   ├── App.css              # App styles
│   ├── main.jsx             # App entry point
│   └── index.css            # Global styles
├── index.html               # HTML template
├── package.json             # Dependencies
└── vite.config.js           # Vite configuration
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. **Install dependencies for the forum app:**

```bash
cd forum-app
npm install
```

2. **Install dependencies for the backend server:**

```bash
cd ../forum1
npm install
```

### Running the Application

You need to run **both** the backend server and the frontend app:

#### 1. Start the Backend Server (Terminal 1)

```bash
cd forum1
npm start
```

This starts the JSON Server on **http://localhost:3001**

#### 2. Start the Frontend App (Terminal 2)

```bash
cd forum-app
npm run dev
```

This starts the React app on **http://localhost:3000**

#### 3. Open the App

Open your browser and go to: **http://localhost:3000**

## 📚 Understanding the Code (Beginner-Friendly Guide)

### React Query (TanStack Query)

React Query handles fetching and caching data from the server. Here's how it works:

```javascript
// Fetching posts from the API
const { data: posts, isLoading, isError } = useQuery({
  queryKey: ['posts'],      // Unique key for this data
  queryFn: postsApi.getAllPosts,  // Function to fetch data
});
```

**Benefits:**
- Automatic caching (no duplicate requests)
- Loading and error states built-in
- Automatic refetching when data becomes stale
- Optimistic updates

### Redux Toolkit

Redux manages global state that needs to be shared across components:

```javascript
// Reading from Redux store
const currentUser = useSelector((state) => state.user.currentUser);
const theme = useSelector((state) => state.theme.mode);

// Updating Redux store
const dispatch = useDispatch();
dispatch(toggleTheme());  // Changes light/dark mode
```

**What we store in Redux:**
- `user`: Current logged-in user information
- `theme`: Dark or light mode preference

### useState Hook

Local component state for forms and UI:

```javascript
const [title, setTitle] = useState('');  // Post title
const [content, setContent] = useState('');  // Post content

// Update state when user types
<input value={title} onChange={(e) => setTitle(e.target.value)} />
```

### useRef Hook

Reference DOM elements directly:

```javascript
const titleInputRef = useRef(null);

// Auto-focus input when form opens
useEffect(() => {
  titleInputRef.current.focus();
}, []);
```

### Lazy Loading

Load components only when needed to improve performance:

```javascript
// Component will load only when user navigates to the page
const FeedPage = lazy(() => import('./pages/FeedPage'));

// Show loading fallback while component loads
<Suspense fallback={<div>Loading...</div>}>
  <FeedPage />
</Suspense>
```

### React Router

Navigate between pages:

```javascript
<Routes>
  <Route path="/feed" element={<FeedPage />} />
  <Route path="/posts/:id" element={<PostDetailPage />} />
</Routes>

// Link to navigate
<Link to="/feed">Go to Feed</Link>

// Get URL parameter
const { id } = useParams();  // Gets :id from URL
```

## 🎯 Key Features Explained

### 1. Feed Page (`FeedPage.jsx`)
- Displays all posts in a scrollable list
- Each post shows title, content preview, author, and stats
- Click "New Post" button to create a post
- Uses React Query to fetch posts from API

### 2. Post Detail Page (`PostDetailPage.jsx`)
- Shows full post content
- Displays all comments (lazy loaded)
- Like button updates instantly
- Uses URL parameter to fetch specific post

### 3. New Post Form (`NewPostForm.jsx`)
- useState manages form inputs (title, content, tags)
- useRef auto-focuses title input
- useMutation posts data to server
- Updates feed immediately after posting

### 4. Comments System
- **CommentsSection**: Displays all comments (lazy loaded)
- **Comment**: Individual comment with like/reply buttons
- **CommentForm**: Form to add comments or replies
- Supports nested replies (comments can have replies)

### 5. Like Functionality
- Click heart icon to like/unlike
- Updates count instantly (optimistic update)
- Stores which users liked each post/comment

## 🎨 Styling

The app uses CSS custom properties (CSS variables) for theming:

```css
.app.light {
  --bg-primary: #ffffff;
  --text-primary: #333333;
  /* ... */
}

.app.dark {
  --bg-primary: #1a1a1a;
  --text-primary: #e0e0e0;
  /* ... */
}
```

Toggle theme by clicking the sun/moon icon in the header.

## 🔧 API Endpoints

The backend provides these endpoints:

- `GET /posts` - Get all posts
- `GET /posts/:id` - Get single post
- `POST /posts` - Create new post
- `PATCH /posts/:id` - Update post (like)
- `GET /comments?postId=:id` - Get comments for post
- `POST /comments` - Create new comment
- `PATCH /comments/:id` - Update comment (like)

## 📝 Common Tasks

### Adding a New Post
1. Click "New Post" button on feed page
2. Fill in title and content
3. Optionally add tags (comma-separated)
4. Click "Post" button
5. New post appears at top of feed

### Commenting on a Post
1. Click on a post to open detail page
2. Click "Add Comment" button
3. Type your comment
4. Click "Post" button
5. Comment appears in the list

### Replying to a Comment
1. Click "Reply" button on any comment
2. Type your reply
3. Click "Post" button
4. Reply appears nested under parent comment

### Liking Posts/Comments
- Click the heart icon (🤍/❤️)
- Count updates immediately
- Click again to unlike

## 🐛 Troubleshooting

**Posts not loading?**
- Make sure the backend server is running on port 3001
- Check browser console for errors

**Theme not changing?**
- Redux DevTools can help debug state changes
- Make sure Redux store is properly configured

**Comments not showing?**
- Check that postId matches in the URL
- Verify backend is returning comments

## 🎓 Learning Resources

- [React Documentation](https://react.dev)
- [Redux Toolkit](https://redux-toolkit.js.org)
- [TanStack Query](https://tanstack.com/query)
- [React Router](https://reactrouter.com)

## 📄 License

This is a learning project - feel free to use and modify as needed!

## 🙏 Acknowledgments

Built as a beginner-friendly example of modern React development with:
- Redux Toolkit for global state
- React Query for server state
- Lazy loading for performance
- Clean, commented code for learning

---

**Happy Coding! 🚀**
