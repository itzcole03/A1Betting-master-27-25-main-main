#!/bin/bash

# Cursor AI GUI Startup Script
echo "🚀 Starting Cursor AI GUI..."

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install
fi

# Check if .env exists, create from example if not
if [ ! -f ".env" ]; then
    echo "⚙️  Creating environment configuration..."
    cp .env.example .env
    echo "✅ Created .env file from template"
fi

# Start the development server
echo "🌐 Starting development server..."
npm run dev

echo "✨ Cursor AI GUI is now running!"
echo "🔗 Open your browser to http://localhost:3002"
