#!/bin/bash

# Quick Start Script for Community Forum App
# This script starts both the backend and frontend servers

echo "🚀 Starting Community Forum App..."
echo ""

# Check if we're in the right directory
if [ ! -d "forum1" ] || [ ! -d "forum-app" ]; then
    echo "❌ Error: Please run this script from the socialwebsite directory"
    echo "Current directory: $(pwd)"
    exit 1
fi

# Start backend server in background
echo "📡 Starting backend server on http://localhost:3001..."
cd forum1
npm start &
BACKEND_PID=$!
cd ..

# Wait a bit for backend to start
sleep 3

# Start frontend server
echo "🎨 Starting frontend app on http://localhost:3000..."
cd forum-app
npm run dev

# Note: When you press Ctrl+C, it will stop the frontend
# To stop the backend, you may need to manually kill it:
# kill $BACKEND_PID
