# 🌐 Community Forum - Quick Start Guide

## ✅ Current Status

**Your forum app is now RUNNING!** 🎉

- **Backend API**: http://localhost:3001
- **Frontend App**: http://localhost:3000

## 🎯 How to Use the App

### 1. View the Feed
- Open http://localhost:3000 in your browser
- You'll see a list of all posts
- Click on any post to view details

### 2. Create a New Post
- Click the "✏️ New Post" button on the feed page
- Fill in:
  - **Title**: Your post title
  - **Content**: The main post content
  - **Tags**: Optional comma-separated tags (e.g., React, JavaScript)
- Click "Post" to publish

### 3. Like Posts
- Click the heart icon (🤍) on any post
- It will turn red (❤️) when liked
- Click again to unlike

### 4. View Post Details
- Click on any post card to view full content
- See all comments and replies
- View complete post with all details

### 5. Add Comments
- On a post detail page, click "💬 Add Comment"
- Type your comment
- Click "Post" to publish

### 6. Reply to Comments
- Click "💬 Reply" on any comment
- Type your reply
- Your reply will appear nested under the parent comment

### 7. Like Comments
- Click the heart icon on any comment
- Works the same as liking posts

### 8. Toggle Theme
- Click the sun ☀️ or moon 🌙 icon in the header
- Switches between light and dark mode
- Theme preference is stored in Redux

## 📂 Project Structure

```
socialwebsite/
├── forum1/              # Backend server
│   ├── db.json         # Database with posts, comments, users
│   ├── package.json    # Backend dependencies
│   └── api.rest        # API testing file
│
├── forum-app/           # Frontend React app
│   ├── src/
│   │   ├── components/  # React components
│   │   ├── pages/       # Page components
│   │   ├── services/    # API service layer
│   │   ├── store/       # Redux store
│   │   └── App.jsx      # Main app
│   ├── package.json     # Frontend dependencies
│   └── README.md        # Detailed documentation
│
└── start.sh            # Quick start script
```

## 🔧 Available Commands

### Starting the App (Manual)

**Terminal 1 - Backend:**
```bash
cd forum1
npm start
```

**Terminal 2 - Frontend:**
```bash
cd forum-app
npm run dev
```

### Using the Start Script
```bash
chmod +x start.sh
./start.sh
```

### Stopping the Servers
- Press `Ctrl + C` in each terminal window
- Or close the terminal windows

## 🎓 Key Concepts (For Learning)

### React Query (TanStack Query)
- Handles data fetching from the API
- Automatically caches data
- Manages loading and error states
- Example: Fetching posts in `FeedPage.jsx`

### Redux Toolkit
- Manages global state (user, theme)
- `userSlice.js`: Current logged-in user
- `themeSlice.js`: Light/dark mode
- Example: Theme toggle in `Layout.jsx`

### useState Hook
- Manages local component state
- Used in forms for inputs
- Example: Post form in `NewPostForm.jsx`

### useRef Hook
- References DOM elements
- Auto-focuses input fields
- Example: Title input focus in `NewPostForm.jsx`

### Lazy Loading
- Components load only when needed
- Improves app performance
- Example: Comments lazy loaded in `PostDetailPage.jsx`

### React Router
- Handles navigation between pages
- `/feed` - Shows all posts
- `/posts/:id` - Shows single post detail

## 🐛 Troubleshooting

### Backend not starting?
```bash
cd forum1
rm -rf node_modules
npm install
npm start
```

### Frontend not starting?
```bash
cd forum-app
rm -rf node_modules
npm install
npm run dev
```

### Port already in use?
- Kill processes using ports 3000 or 3001
- Or change ports in `vite.config.js` (frontend) and `package.json` (backend)

### Data not loading?
- Make sure backend is running on port 3001
- Check browser console (F12) for errors
- Verify API calls in Network tab

## 📚 Understanding the Code

### Data Flow
1. **User Action** → Click on post
2. **React Router** → Navigate to `/posts/:id`
3. **React Query** → Fetch post data from API
4. **Component** → Display post with data
5. **Redux** → Get current user/theme from store

### File Organization
- **Components**: Reusable UI pieces (buttons, cards, forms)
- **Pages**: Full page views (Feed, Post Detail)
- **Services**: API communication functions
- **Store**: Redux state management

### Best Practices Used
- ✅ Component composition
- ✅ Separation of concerns
- ✅ Custom hooks for reusability
- ✅ Error handling
- ✅ Loading states
- ✅ Optimistic updates
- ✅ Code comments for learning

## 🎨 Customization Ideas

### Add New Features
- User profiles page
- Search functionality
- Filter posts by tags
- Edit/delete posts
- Notifications system

### Styling
- All styles in `App.css`
- Uses CSS custom properties (variables)
- Easy to modify colors and spacing
- Responsive design included

### Data
- Edit `forum1/db.json` to add more posts/users
- Follows JSON Server format
- Changes persist in the file

## 📖 Learn More

- **Full Documentation**: See `forum-app/README.md`
- **React Docs**: https://react.dev
- **Redux Toolkit**: https://redux-toolkit.js.org
- **React Query**: https://tanstack.com/query
- **React Router**: https://reactrouter.com

## ✨ Features Checklist

- ✅ Feed page with post list
- ✅ Post detail page
- ✅ Create new posts
- ✅ Like posts and comments
- ✅ Comment system with replies
- ✅ React Query for data fetching
- ✅ Redux for global state
- ✅ React Router for navigation
- ✅ useRef for input focus
- ✅ Lazy loading for performance
- ✅ Light/dark theme
- ✅ Responsive design
- ✅ Beginner-friendly code comments

## 🙌 You're All Set!

The app is running and ready to use. Explore the code, make changes, and learn!

**Happy Coding! 🚀**

---

**Need Help?**
- Check the browser console (F12) for errors
- Review the detailed README in `forum-app/README.md`
- Look at code comments for explanations
