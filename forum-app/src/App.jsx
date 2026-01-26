import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Provider } from 'react-redux';
import { store } from './store/store';
import Layout from './components/Layout';
import './App.css';

// Lazy load pages for better performance
const FeedPage = lazy(() => import('./pages/FeedPage'));
const PostDetailPage = lazy(() => import('./pages/PostDetailPage'));

// Create React Query client with default options
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // Data stays fresh for 5 minutes
      cacheTime: 10 * 60 * 1000, // Cache data for 10 minutes
      refetchOnWindowFocus: false, // Don't refetch when window regains focus
    },
  },
});

function App() {
  return (
    // Wrap app with Redux Provider for global state
    <Provider store={store}>
      {/* Wrap app with React Query Provider for data fetching */}
      <QueryClientProvider client={queryClient}>
        {/* Wrap app with Router for navigation */}
        <BrowserRouter>
          {/* Suspense shows loading fallback while lazy components load */}
          <Suspense fallback={<div className="loading">Loading...</div>}>
            <Routes>
              {/* Layout wrapper for header and navigation */}
              <Route path="/" element={<Layout />}>
                {/* Redirect root to /feed */}
                <Route index element={<Navigate to="/feed" replace />} />
                {/* Feed page shows all posts */}
                <Route path="feed" element={<FeedPage />} />
                {/* Post detail page shows single post with comments */}
                <Route path="posts/:id" element={<PostDetailPage />} />
              </Route>
            </Routes>
          </Suspense>
        </BrowserRouter>
      </QueryClientProvider>
    </Provider>
  );
}

export default App;
