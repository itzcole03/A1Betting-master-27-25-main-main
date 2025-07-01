const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🔨 Building A1Betting React App...');

try {
  // Change to frontend directory
  process.chdir('./frontend');
  
  // Build the React app
  console.log('📦 Running npm run build...');
  execSync('npm run build', { stdio: 'inherit' });
  
  // Copy built files to root of frontend for Python server
  console.log('📁 Copying built files...');
  
  if (fs.existsSync('./dist')) {
    // Copy index.html to root
    if (fs.existsSync('./dist/index.html')) {
      fs.copyFileSync('./dist/index.html', './index.html');
      console.log('✅ Copied index.html');
    }
    
    // Copy assets directory
    if (fs.existsSync('./dist/assets')) {
      if (fs.existsSync('./assets')) {
        fs.rmSync('./assets', { recursive: true, force: true });
      }
      fs.cpSync('./dist/assets', './assets', { recursive: true });
      console.log('✅ Copied assets directory');
    }
    
    console.log('🎉 Build completed successfully!');
    console.log('📍 React app is now available at: http://localhost:3000/index.html');
    console.log('📍 Test page still available at: http://localhost:3000/test.html');
  } else {
    console.error('❌ Build directory not found');
  }
  
} catch (error) {
  console.error('❌ Build failed:', error.message);
  process.exit(1);
} 