# 🔧 Troubleshooting Guide

## Common Issues and Solutions

### 🚨 Backend Server Issues

#### Issue: "json-server-auth: not found"

**Problem:** Backend dependencies not installed

**Solution:**
```bash
cd /home/sama/Desktop/socialwebsite/forum1
rm -rf node_modules package-lock.json
npm install
npm start
```

#### Issue: "Port 3001 already in use"

**Problem:** Another process is using port 3001

**Solution:**
```bash
# Find process using port 3001
lsof -i :3001

# Kill the process (replace PID with actual process ID)
kill -9 PID

# Or use:
npx kill-port 3001

# Then restart
cd forum1
npm start
```

#### Issue: "Cannot read db.json"

**Problem:** Database file missing or corrupted

**Solution:**
```bash
# Check if file exists
ls -la forum1/db.json

# If missing, you need to recreate it with initial data
# The file should be there from the original setup
```

---

### 💻 Frontend App Issues

#### Issue: "Module not found" errors

**Problem:** Frontend dependencies not installed

**Solution:**
```bash
cd /home/sama/Desktop/socialwebsite/forum-app
rm -rf node_modules package-lock.json
npm install
npm run dev
```

#### Issue: "Port 3000 already in use"

**Problem:** Another app is using port 3000

**Solution 1: Kill the process**
```bash
npx kill-port 3000
```

**Solution 2: Change the port**

Edit `vite.config.js`:
```javascript
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3002, // Change to any available port
  },
})
```

#### Issue: Blank page or "Cannot GET /"

**Problem:** React app not built or routing issue

**Solution:**
```bash
# Clear cache and restart
cd forum-app
rm -rf node_modules/.vite
npm run dev
```

---

### 🌐 API Connection Issues

#### Issue: "Network Error" or "Failed to fetch"

**Problem:** Frontend can't connect to backend

**Checklist:**
1. ✅ Is backend running on port 3001?
2. ✅ Is URL correct in `services/api.js`?
3. ✅ Check browser console for errors
4. ✅ Check CORS settings

**Solution:**
```bash
# Terminal 1: Start backend
cd forum1
npm start

# Terminal 2: Start frontend
cd forum-app
npm run dev

# Verify backend is running
curl http://localhost:3001/posts
```

#### Issue: "CORS Error"

**Problem:** Cross-Origin Resource Sharing blocked

**Solution:**

JSON Server automatically handles CORS, but if issues persist:

Add to `forum1/package.json`:
```json
{
  "scripts": {
    "start": "json-server-auth --watch db.json --port 3001 --host 0.0.0.0"
  }
}
```

---

### 🎨 UI/Display Issues

#### Issue: Styles not loading or look broken

**Problem:** CSS not imported correctly

**Solution:**
```javascript
// Check App.jsx has:
import './App.css';

// Check main.jsx has:
import './index.css';
```

#### Issue: Theme toggle not working

**Problem:** Redux not connected properly

**Solution:**

Check Redux DevTools in browser (install extension):
- State should show `user` and `theme`
- Dispatching `toggleTheme` should change state

Debug:
```javascript
// In Layout.jsx
console.log('Current theme:', theme);
console.log('Redux state:', store.getState());
```

#### Issue: Dark theme colors are wrong

**Problem:** CSS variables not defined

**Solution:**

Check `App.css` has both:
```css
.app.light {
  --bg-primary: #ffffff;
  /* ... other variables */
}

.app.dark {
  --bg-primary: #1a1a1a;
  /* ... other variables */
}
```

---

### 📝 Data/State Issues

#### Issue: Posts not displaying

**Problem:** React Query not fetching or data format wrong

**Debug:**
```javascript
// In FeedPage.jsx
const { data: posts, isLoading, isError, error } = useQuery({
  queryKey: ['posts'],
  queryFn: postsApi.getAllPosts,
});

console.log('Loading:', isLoading);
console.log('Error:', isError, error);
console.log('Posts:', posts);
```

**Solution:**
1. Check backend is running and has data
2. Test API directly: `http://localhost:3001/posts`
3. Verify API function in `services/api.js`

#### Issue: New post doesn't appear after creating

**Problem:** Cache not invalidated

**Solution:**

Check `NewPostForm.jsx` has:
```javascript
const createPostMutation = useMutation({
  mutationFn: postsApi.createPost,
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ['posts'] });
  },
});
```

#### Issue: Like count not updating

**Problem:** Mutation not configured correctly

**Debug:**
```javascript
// In PostCard.jsx
const handleLike = () => {
  console.log('Before like:', post.likes);
  console.log('Is liked:', isLiked);
  
  // ... mutation code
  
  likePostMutation.mutate(updatedData, {
    onSuccess: (data) => {
      console.log('After like:', data);
    },
  });
};
```

---

### 🔀 Routing Issues

#### Issue: "Cannot GET /posts/1" on refresh

**Problem:** Server not configured for client-side routing

**Solution:**

This is normal in development. Vite handles it automatically.

For production, configure your server to serve `index.html` for all routes.

#### Issue: Links not working or page reloads

**Problem:** Using `<a>` instead of `<Link>`

**Solution:**
```javascript
// ❌ Wrong
<a href="/feed">Feed</a>

// ✅ Correct
import { Link } from 'react-router-dom';
<Link to="/feed">Feed</Link>
```

#### Issue: useParams returns undefined

**Problem:** Not inside a route or route not configured

**Solution:**

Ensure route is defined:
```javascript
<Route path="posts/:id" element={<PostDetailPage />} />
```

And component is rendered by this route.

---

### 🚀 Performance Issues

#### Issue: App feels slow or laggy

**Problem:** Too many re-renders or large bundle

**Solutions:**

1. **Check React Query is caching:**
```javascript
// React Query DevTools (install)
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

<QueryClientProvider client={queryClient}>
  <App />
  <ReactQueryDevtools />
</QueryClientProvider>
```

2. **Verify lazy loading:**
```javascript
// Should see "Loading..." when navigating
const CommentsSection = lazy(() => import('./CommentsSection'));
```

3. **Check bundle size:**
```bash
npm run build
# Check dist/ folder size
```

#### Issue: Comments take long to load

**Problem:** Comments not lazy loaded or too many comments

**Solution:**

Already implemented! Comments use:
```javascript
const CommentsSection = lazy(() => import('./CommentsSection'));
```

For many comments, consider pagination.

---

### 🔍 Development Tools

#### Browser DevTools Tips

**Console (F12 → Console):**
- See errors and warnings
- Log component state
- Test API calls

**Network Tab:**
- See all API requests
- Check request/response data
- Find slow requests

**React DevTools:**
- Inspect component props and state
- See component tree
- Debug re-renders

**Redux DevTools:**
- View Redux state
- See dispatched actions
- Time-travel debugging

---

### 📦 Dependency Issues

#### Issue: npm install fails

**Solution:**
```bash
# Clear npm cache
npm cache clean --force

# Remove lock file and node_modules
rm -rf node_modules package-lock.json

# Reinstall
npm install

# If still fails, try with legacy peer deps
npm install --legacy-peer-deps
```

#### Issue: Version conflicts

**Solution:**

Check `package.json` has compatible versions:
```json
{
  "react": "^18.2.0",
  "react-dom": "^18.2.0",
  "@tanstack/react-query": "^5.17.0",
  "@reduxjs/toolkit": "^2.0.1",
  "react-redux": "^9.0.4"
}
```

---

### 🐛 Runtime Errors

#### Error: "Cannot read property of undefined"

**Problem:** Accessing data before it loads

**Solution:**

Always check data exists:
```javascript
// ❌ Wrong
<div>{post.title}</div>

// ✅ Correct
{post && <div>{post.title}</div>}

// Or use optional chaining
<div>{post?.title}</div>
```

#### Error: "Hooks can only be called inside function components"

**Problem:** Hook used outside component or in wrong place

**Solution:**

Hooks must be at top level of component:
```javascript
// ✅ Correct
function MyComponent() {
  const [state, setState] = useState('');
  
  return <div>{state}</div>;
}

// ❌ Wrong
function MyComponent() {
  if (condition) {
    const [state, setState] = useState(''); // Can't be conditional
  }
}
```

#### Error: "Maximum update depth exceeded"

**Problem:** Infinite loop in useEffect or state update

**Solution:**

Check useEffect dependencies:
```javascript
// ❌ Wrong - causes infinite loop
useEffect(() => {
  fetchData();
}, [data]); // data changes, triggers effect, changes data...

// ✅ Correct
useEffect(() => {
  fetchData();
}, []); // Only run once on mount
```

---

### 🎯 Testing the Fix

After applying any fix:

1. **Clear browser cache:**
   - Hard refresh: `Ctrl + Shift + R` (Linux)
   - Or clear in DevTools → Network → Disable cache

2. **Restart servers:**
   ```bash
   # Stop both servers (Ctrl + C)
   # Restart backend
   cd forum1 && npm start
   # Restart frontend
   cd forum-app && npm run dev
   ```

3. **Check console:**
   - No errors in browser console
   - No errors in terminal

4. **Test feature:**
   - Try the specific feature that was broken
   - Test related features

---

## 🆘 Getting Help

### Information to Gather

When asking for help, provide:

1. **Error message:** Exact text from console
2. **Steps to reproduce:** What did you do?
3. **Expected vs actual:** What should happen vs what happens?
4. **Environment:**
   - Node version: `node --version`
   - npm version: `npm --version`
   - OS: Linux/Mac/Windows

### Debugging Checklist

- [ ] Backend server running on port 3001?
- [ ] Frontend server running on port 3000?
- [ ] Dependencies installed? (`node_modules` exists)
- [ ] Browser console errors?
- [ ] Terminal errors?
- [ ] Correct file paths?
- [ ] Imports correct?
- [ ] Data in db.json?

### Quick Reset

If everything is broken, try complete reset:

```bash
cd /home/sama/Desktop/socialwebsite

# Backend
cd forum1
rm -rf node_modules package-lock.json
npm install
npm start &

# Frontend
cd ../forum-app
rm -rf node_modules package-lock.json .vite
npm install
npm run dev
```

---

## 📚 Additional Resources

**React Query Issues:**
- [TanStack Query Docs](https://tanstack.com/query/latest/docs/react/guides/queries)
- [Common Mistakes](https://tkdodo.eu/blog/react-query-render-optimizations)

**Redux Issues:**
- [Redux Toolkit Docs](https://redux-toolkit.js.org/usage/usage-guide)
- [Redux DevTools](https://github.com/reduxjs/redux-devtools)

**React Router Issues:**
- [React Router Docs](https://reactrouter.com/en/main)
- [Common Patterns](https://reactrouter.com/en/main/start/tutorial)

**General React:**
- [React Docs](https://react.dev)
- [React DevTools](https://react.dev/learn/react-developer-tools)

---

## 💡 Prevention Tips

1. **Always check backend is running** before testing frontend
2. **Use console.log** liberally while developing
3. **Install React DevTools** and Redux DevTools
4. **Read error messages** carefully - they usually tell you what's wrong
5. **Test after each change** - don't make many changes at once
6. **Keep terminal visible** to see errors immediately
7. **Use git** to commit working versions

---

**Remember:** Most issues are simple fixes - don't panic! Check the basics first (servers running, dependencies installed, correct ports). 🚀
