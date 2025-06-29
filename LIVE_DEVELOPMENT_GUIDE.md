# A1Betting Live Development & Collaboration Guide

## 🚀 Quick Start

### Option 1: Automated Setup (Recommended)
1. **Windows**: Double-click `start-live-dev.bat`
2. **Linux/Mac**: Run `./start-live-dev.sh`
3. **VS Code**: Use `Ctrl+Shift+P` → "Tasks: Run Task" → "Start Live Development"

### Option 2: Manual Setup
1. Open terminal in project root
2. Backend: `cd backend && python app.py`
3. Frontend: `cd frontend && npm run dev`
4. Access: http://localhost:5173

## 🎯 Development URLs

| Service | URL | Purpose |
|---------|-----|---------|
| Frontend Dev | http://localhost:5173 | React app with HMR |
| Backend API | http://localhost:5000 | Python Flask API |
| Live Server | http://localhost:3001 | Static file serving |
| Live Preview | Built into VS Code | Integrated preview |

## 🤝 Collaboration Features

### Live Share (Real-time Collaboration)
1. **Start Session**: `Ctrl+Shift+P` → "Live Share: Start Collaboration Session"
2. **Share Link**: Copy the session URL and send to collaborators
3. **Features Available**:
   - Real-time code editing
   - Shared terminals
   - Collaborative debugging
   - Voice chat (with audio extension)
   - Shared servers (automatic port forwarding)

### CodeTour (Guided Walkthroughs)
1. **Create Tour**: `Ctrl+Shift+P` → "CodeTour: Record Tour"
2. **Take Tour**: Click on tour in explorer
3. **Use Cases**:
   - Onboarding new developers
   - Explaining complex features
   - Code review walkthroughs

### Live Share Whiteboard
1. **Start Whiteboard**: `Ctrl+Shift+P` → "Live Share Whiteboard: Start Whiteboard Session"
2. **Collaborate**: Draw diagrams, explain architecture
3. **Perfect for**: System design discussions, bug analysis

## 🔥 Builder.io-Style Features

### Real-time Preview
- **Hot Module Replacement**: Changes reflect instantly
- **Live Reload**: Automatic browser refresh on save
- **Error Overlay**: In-browser error display
- **Network Sync**: Share preview across devices

### Component Development
- **Component Isolation**: Test components in isolation
- **Props Playground**: Modify props in real-time
- **Style Tweaking**: Live CSS/SCSS editing
- **State Inspection**: Real-time state debugging

### Collaborative Debugging
- **Shared Breakpoints**: Debug together in real-time
- **Console Sharing**: See each other's console logs
- **Network Inspector**: Shared network request monitoring
- **Performance Profiling**: Collaborative performance analysis

## 🛠️ Available Tasks

Access via `Ctrl+Shift+P` → "Tasks: Run Task"

| Task | Description |
|------|-------------|
| **Full Stack Development** | Start both backend and frontend servers |
| **Start Live Development Server** | Frontend only (Vite dev server) |
| **Start Backend Server** | Backend only (Python Flask) |
| **Build for Production** | Create production build |
| **TypeScript Check** | Run type checking |
| **Lint Frontend** | Run ESLint |
| **Preview Production Build** | Test production build locally |

## 🎨 Live Styling & Assets

### Sass/SCSS Live Compilation
- **Auto-compile**: Sass files compile automatically
- **Source Maps**: Debug compiled CSS easily  
- **Live Injection**: Style changes without page reload

### Asset Hot Reloading
- **Images**: Replace images without refresh
- **Fonts**: Live font swapping
- **Icons**: SVG hot reloading
- **Static Assets**: Automatic asset versioning

## 🔍 Debugging Configuration

### Frontend Debugging
- **Chrome DevTools**: Integrated debugging
- **Source Maps**: Debug TypeScript directly
- **React DevTools**: Component inspection
- **Redux DevTools**: State management debugging

### Backend Debugging
- **Python Debugger**: Integrated Python debugging
- **API Testing**: Test endpoints directly
- **Database Inspection**: Query database in real-time
- **Log Monitoring**: Live log streaming

### Full-Stack Debugging
- **Compound Launch**: Debug frontend and backend simultaneously
- **Request Tracing**: Follow requests from frontend to backend
- **Error Correlation**: Match frontend errors to backend logs

## 📱 Mobile & Responsive Development

### Device Testing
- **Live Server**: Access from mobile devices on same network
- **Network Sync**: Test across multiple devices simultaneously
- **Responsive Mode**: Built-in responsive design tools
- **Touch Events**: Test mobile interactions

### Cross-Browser Testing
- **Multiple Browsers**: Launch in different browsers
- **BrowserStack Integration**: Test on various devices/browsers
- **Screenshot Comparison**: Visual regression testing

## 🚀 Performance Optimization

### Live Performance Monitoring
- **Bundle Analysis**: Real-time bundle size monitoring
- **Memory Usage**: Live memory profiling
- **Network Performance**: Request timing analysis
- **Core Web Vitals**: Real-time performance metrics

### Optimization Tools
- **Code Splitting**: Automatic chunk optimization
- **Tree Shaking**: Dead code elimination
- **Asset Optimization**: Image and asset compression
- **Caching Strategy**: Service worker integration

## 🔒 Security & Best Practices

### Development Security
- **HTTPS Development**: Secure local development
- **CORS Configuration**: Proper cross-origin setup
- **Environment Variables**: Secure secret management
- **CSP Headers**: Content Security Policy testing

### Code Quality
- **ESLint**: Real-time code quality checks
- **Prettier**: Automatic code formatting
- **TypeScript**: Static type checking
- **Husky**: Pre-commit hooks

## 📊 Analytics & Monitoring

### Real-time Analytics
- **User Interactions**: Live interaction tracking
- **Performance Metrics**: Real-time performance data
- **Error Tracking**: Live error monitoring
- **Feature Usage**: Track feature adoption

### Development Insights
- **Code Coverage**: Live test coverage
- **Build Performance**: Build time optimization
- **Dependency Analysis**: Package usage insights
- **Technical Debt**: Code quality metrics

## 🎯 Advanced Collaboration

### Team Workflows
- **Feature Branching**: Git integration with Live Share
- **Code Reviews**: Collaborative code review sessions
- **Pair Programming**: Real-time pair programming
- **Knowledge Sharing**: Interactive documentation

### Remote Development
- **Cloud Development**: VS Code in browser
- **Container Development**: Consistent dev environments
- **Remote SSH**: Develop on remote machines
- **Codespaces**: GitHub Codespaces integration

## 🆘 Troubleshooting

### Common Issues
1. **Port Conflicts**: Change ports in settings.json
2. **Extension Conflicts**: Disable conflicting extensions
3. **Network Issues**: Check firewall settings
4. **Performance Issues**: Increase memory allocation

### Getting Help
1. **VS Code Issues**: Check Output panel
2. **Live Share Problems**: Restart collaboration session
3. **Build Errors**: Check terminal output
4. **Network Problems**: Verify localhost access

## 📝 Customization

### Personalizing Your Environment
- **Themes**: Install preferred color themes
- **Keybindings**: Customize keyboard shortcuts
- **Extensions**: Add project-specific extensions
- **Settings**: Sync settings across machines

### Team Standards
- **Code Style**: Shared ESLint/Prettier config
- **Git Hooks**: Consistent commit standards
- **Extension Pack**: Required extensions list
- **Workspace Settings**: Shared team settings

---

## 🎉 Ready to Collaborate!

Your A1Betting development environment is now configured for real-time, collaborative development similar to builder.io. The setup includes:

✅ **Real-time preview** with hot reloading  
✅ **Live collaboration** with VS Code Live Share  
✅ **Integrated debugging** for full-stack development  
✅ **Professional tooling** with TypeScript, ESLint, and Prettier  
✅ **Performance monitoring** and optimization tools  
✅ **Mobile-friendly testing** environment  

Start collaborating by sharing your Live Share session URL with team members!
