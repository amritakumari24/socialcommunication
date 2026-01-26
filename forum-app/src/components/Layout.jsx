import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { toggleTheme } from '../store/slices/themeSlice';

// Layout component wraps all pages with header and navigation
function Layout() {
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.theme.mode);
  const currentUser = useSelector((state) => state.user.currentUser);

  // Handle theme toggle button click
  const handleThemeToggle = () => {
    dispatch(toggleTheme());
  };

  return (
    <div className={`app ${theme}`}>
      {/* Header with navigation */}
      <header className="header">
        <div className="container">
          <div className="header-content">
            <Link to="/feed" className="logo">
              <h1>🌐 Community Forum</h1>
            </Link>
            
            <nav className="nav">
              <Link to="/feed" className="nav-link">
                Feed
              </Link>
              
              {/* Theme toggle button */}
              <button onClick={handleThemeToggle} className="theme-toggle">
                {theme === 'light' ? '🌙' : '☀️'}
              </button>
              
              {/* User info */}
              <div className="user-info">
                <img 
                  src={currentUser.avatar} 
                  alt={currentUser.displayName} 
                  className="user-avatar-small"
                />
                <span>{currentUser.displayName}</span>
              </div>
            </nav>
          </div>
        </div>
      </header>

      {/* Main content area - pages render here */}
      <main className="main">
        <div className="container">
          <Outlet />
        </div>
      </main>
    </div>
  );
}

export default Layout;
