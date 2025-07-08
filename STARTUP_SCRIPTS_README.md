# 🚀 A1BETTING PRIZEPICKS FULL STACK STARTUP SCRIPTS

## 📋 **Available Startup Scripts**

### **Windows (.bat)**

```bash
start-prizepicks-full-stack.bat
```

- **Platform**: Windows Command Prompt
- **Features**: Full dependency checking, virtual environment setup, concurrent service startup
- **Opens**: New console windows for each service

### **Windows/Cross-platform (PowerShell)**

```bash
start-prizepicks-full-stack.ps1
```

- **Platform**: Windows PowerShell / PowerShell Core (cross-platform)
- **Features**: Advanced job management, colored output, interactive management menu
- **Requirement**: PowerShell execution policy must allow scripts

### **Unix/Linux/macOS (.sh)**

```bash
./start-prizepicks-full-stack.sh
```

- **Platform**: Unix/Linux/macOS with Bash
- **Features**: Background processes, log file management, signal handling
- **Setup**: Make executable first: `chmod +x start-prizepicks-full-stack.sh`

---

## 🎯 **What These Scripts Do**

### **Dependency Checking**

- ✅ Verifies Python 3.11+ is installed
- ✅ Verifies Node.js 18+ is installed
- ✅ Verifies npm is available
- ✅ Shows clear error messages if anything is missing

### **Environment Setup**

- 🐍 Creates Python virtual environment (`.venv`)
- 📦 Installs/updates Python dependencies from `requirements.txt`
- 🟢 Installs/updates Node.js dependencies (`npm install`)
- 📁 Creates logs directory for output

### **Service Startup**

- ⚡ **Backend**: FastAPI server on `http://localhost:8000`
- 🌐 **Frontend**: React dev server on `http://localhost:8173`
- 🔄 Both services run with hot reload/auto-restart
- 📊 Logs are captured and accessible

---

## 🌐 **Service URLs**

### **Frontend (React)**

- **Main Application**: http://localhost:8173
- **PrizePicks Page**: http://localhost:8173#prizepicks
- **All Pages**: Accessible through navigation

### **Backend (FastAPI)**

- **API Base**: http://localhost:8000
- **API Documentation**: http://localhost:8000/docs
- **Health Check**: http://localhost:8000/api/health/all
- **PrizePicks API**: http://localhost:8000/api/prizepicks/comprehensive-projections

---

## 🧪 **Testing PrizePicks Integration**

### **Expected Behavior**

1. **Real Data Loading**: PrizePicks projections from 30+ sports
2. **Dynamic Filters**: Filter options populated from live API data
3. **ML Predictions**: Confidence scores and value ratings
4. **SHAP Explanations**: AI transparency features
5. **Kelly Optimization**: Optimal bet sizing recommendations

### **Troubleshooting**

| Issue                 | Solution                                          |
| --------------------- | ------------------------------------------------- |
| "Loading..." persists | Check backend logs for API errors                 |
| 500 errors            | Ensure backend is fully started (wait 30 seconds) |
| No data showing       | Check network connection and API endpoints        |
| Backend won't start   | Check Python dependencies and virtual environment |
| Frontend won't start  | Check Node.js dependencies and port availability  |

---

## 📊 **Log Management**

### **Windows (.bat)**

- Backend logs: Displayed in backend console window
- Frontend logs: Displayed in frontend console window
- **Access**: Check the opened console windows

### **PowerShell (.ps1)**

- Backend logs: Available via job system
- Frontend logs: Available via job system
- **Access**: Use interactive menu options [L] and [F]

### **Unix/Linux (.sh)**

- Backend logs: `logs/backend.log`
- Frontend logs: `logs/frontend.log`
- **Real-time**: `tail -f logs/backend.log` or `tail -f logs/frontend.log`

---

## 🔧 **Development Features**

### **Auto-reload**

- ✅ **Backend**: FastAPI auto-reloads on Python file changes
- ✅ **Frontend**: React hot reload on component changes
- ✅ **Type Safety**: TypeScript compilation with error reporting

### **Network Access**

- 🌐 **Local Network**: Both services accessible on local network
- 📱 **Mobile Testing**: Access from phones/tablets on same network
- 🔗 **External Access**: Can be configured for external access if needed

### **Debug Support**

- 🐛 **Backend**: Full FastAPI debug mode with detailed error traces
- 🔍 **Frontend**: React dev tools compatible
- 📈 **Performance**: Hot reload minimizes restart time

---

## 🚀 **Quick Start Guide**

### **1. Choose Your Platform**

```bash
# Windows Command Prompt
start-prizepicks-full-stack.bat

# Windows PowerShell (Recommended)
.\start-prizepicks-full-stack.ps1

# Unix/Linux/macOS
chmod +x start-prizepicks-full-stack.sh
./start-prizepicks-full-stack.sh
```

### **2. Wait for Startup**

- ⏱️ **Backend**: Usually starts in 10-20 seconds
- ⏱️ **Frontend**: Usually starts in 5-15 seconds
- 📊 **Total**: Full stack ready in 30-60 seconds

### **3. Open PrizePicks**

- 🌐 Navigate to: http://localhost:8173#prizepicks
- 🎯 Or click the auto-open link in the script

### **4. Verify Real Data**

- ✅ Check for real sports projections
- ✅ Test filter functionality
- ✅ Verify ML predictions are working
- ✅ Confirm SHAP explanations load

---

## 💡 **Pro Tips**

### **For Development**

- Keep both console windows open to monitor logs
- Use browser dev tools to inspect API calls
- Check Network tab for API request/response details
- Monitor backend logs for API integration status

### **For Testing**

- Test with different sports filters
- Verify real-time data updates
- Check confidence scores and ML predictions
- Test lineup optimization features

### **For Production**

- Scripts are for development only
- Production deployment requires different configuration
- API keys and environment variables need proper setup
- Consider containerization for production deployment

---

## 🔒 **Security Notes**

- ✅ Scripts run locally only
- ✅ No sensitive data exposed in scripts
- ✅ Virtual environments isolate dependencies
- ✅ API keys should be configured separately in `.env` files

---

## 📞 **Support**

If you encounter issues:

1. **Check logs** using the script management options
2. **Verify dependencies** are correctly installed
3. **Check network connectivity** for API calls
4. **Review console output** for specific error messages
5. **Ensure ports 8000 and 8173** are not in use by other applications

**The scripts provide comprehensive error checking and helpful diagnostic information to troubleshoot any startup issues.**
