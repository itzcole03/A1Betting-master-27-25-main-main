#!/bin/bash

# A1Betting PrizePicks Full Stack Startup Script
# Unix/Linux shell script version

echo "================================================================"
echo "🚀 A1BETTING PRIZEPICKS FULL STACK STARTUP"
echo "================================================================"
echo "Starting Backend (FastAPI) + Frontend (React) concurrently..."
echo "Backend will run on: http://localhost:8000"
echo "Frontend will run on: http://localhost:8173"
echo "================================================================"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

# Function to check if command exists
command_exists() {
    command -v "$1" >/dev/null 2>&1
}

# Check dependencies
echo -e "${YELLOW}🔍 Checking dependencies...${NC}"

if ! command_exists python3; then
    echo -e "${RED}❌ ERROR: Python 3 is not installed or not in PATH${NC}"
    echo -e "${RED}Please install Python 3.11+ and try again${NC}"
    exit 1
fi

if ! command_exists node; then
    echo -e "${RED}❌ ERROR: Node.js is not installed or not in PATH${NC}"
    echo -e "${RED}Please install Node.js 18+ and try again${NC}"
    exit 1
fi

if ! command_exists npm; then
    echo -e "${RED}❌ ERROR: npm is not installed or not in PATH${NC}"
    echo -e "${RED}Please install npm and try again${NC}"
    exit 1
fi

echo -e "${GREEN}✅ Dependencies check passed!${NC}"
echo ""

# Create logs directory if it doesn't exist
mkdir -p logs

# Setup backend
echo -e "${YELLOW}📦 Setting up backend...${NC}"
cd backend

if [ ! -d ".venv" ]; then
    echo -e "${BLUE}🔧 Creating Python virtual environment...${NC}"
    python3 -m venv .venv
fi

echo -e "${BLUE}🔧 Activating virtual environment...${NC}"
source .venv/bin/activate

echo -e "${BLUE}📦 Installing/updating Python dependencies...${NC}"
pip install --upgrade pip
pip install -r requirements.txt

echo -e "${GREEN}✅ Backend dependencies ready!${NC}"
cd ..

# Setup frontend
echo -e "${YELLOW}📦 Setting up frontend...${NC}"
cd frontend

if [ ! -d "node_modules" ]; then
    echo -e "${BLUE}🔧 Installing Node.js dependencies...${NC}"
    npm install
else
    echo -e "${GREEN}✅ Frontend dependencies already installed${NC}"
fi

cd ..

echo ""
echo -e "${YELLOW}🎯 Starting services...${NC}"
echo "================================================================"

# Function to cleanup on exit
cleanup() {
    echo ""
    echo -e "${RED}🛑 Stopping services...${NC}"
    if [ ! -z "$BACKEND_PID" ]; then
        kill $BACKEND_PID 2>/dev/null
    fi
    if [ ! -z "$FRONTEND_PID" ]; then
        kill $FRONTEND_PID 2>/dev/null
    fi
    echo -e "${GREEN}✅ All services stopped.${NC}"
    exit 0
}

# Set up signal handlers
trap cleanup SIGINT SIGTERM

# Start backend in background
echo -e "${YELLOW}🚀 Starting Backend (FastAPI)...${NC}"
cd backend
source .venv/bin/activate
python3 main.py > ../logs/backend.log 2>&1 &
BACKEND_PID=$!
cd ..

# Wait for backend to start
sleep 5

# Start frontend in background
echo -e "${YELLOW}🚀 Starting Frontend (React)...${NC}"
cd frontend
npm run dev > ../logs/frontend.log 2>&1 &
FRONTEND_PID=$!
cd ..

# Wait for frontend to start
sleep 3

echo ""
echo "================================================================"
echo -e "${GREEN}✅ BOTH SERVICES STARTED SUCCESSFULLY!${NC}"
echo "================================================================"
echo ""
echo -e "${GREEN}🌐 Frontend (React):     http://localhost:8173${NC}"
echo -e "${GREEN}🎯 PrizePicks Page:      http://localhost:8173#prizepicks${NC}"
echo ""
echo -e "${GREEN}⚡ Backend (FastAPI):    http://localhost:8000${NC}"
echo -e "${GREEN}📚 API Documentation:   http://localhost:8000/docs${NC}"
echo -e "${GREEN}💚 Health Check:        http://localhost:8000/api/health/all${NC}"
echo -e "${GREEN}🎲 PrizePicks API:      http://localhost:8000/api/prizepicks/comprehensive-projections${NC}"
echo ""
echo "================================================================"
echo -e "${YELLOW}🔧 DEVELOPMENT TOOLS:${NC}"
echo "================================================================"
echo "📊 Real-time Logs:      tail -f logs/backend.log OR tail -f logs/frontend.log"
echo "🐛 Debug Mode:          Backend runs with auto-reload"
echo "🔄 Hot Reload:          Frontend has live reload enabled"
echo "📱 Network Access:      Both services accessible on local network"
echo ""
echo "================================================================"
echo -e "${YELLOW}🧪 TESTING PRIZEPICKS INTEGRATION:${NC}"
echo "================================================================"
echo "1. Wait for both services to fully start (usually 10-30 seconds)"
echo "2. Open http://localhost:8173#prizepicks"
echo "3. Check if real PrizePicks data loads"
echo "4. If you see 'Loading...' or errors, check backend logs"
echo "5. Backend logs will show API calls and data fetching status"
echo ""
echo -e "${CYAN}✨ Expected behavior:${NC}"
echo "   - Real PrizePicks projections from 30+ sports"
echo "   - Dynamic filters populated from live data"
echo "   - ML predictions with confidence scores"
echo "   - SHAP explanations for AI transparency"
echo "   - Kelly optimization for bet sizing"
echo ""

# Function to check service status
check_status() {
    echo -e "${YELLOW}📊 Service Status:${NC}"
    if kill -0 $BACKEND_PID 2>/dev/null; then
        echo -e "${GREEN}Backend: Running (PID: $BACKEND_PID)${NC}"
    else
        echo -e "${RED}Backend: Stopped${NC}"
    fi
    
    if kill -0 $FRONTEND_PID 2>/dev/null; then
        echo -e "${GREEN}Frontend: Running (PID: $FRONTEND_PID)${NC}"
    else
        echo -e "${RED}Frontend: Stopped${NC}"
    fi
}

echo "================================================================"
echo -e "${GREEN}🚀 READY FOR TESTING!${NC}"
echo "================================================================"
echo ""

# Show initial status
check_status
echo ""

# Interactive menu
while true; do
    echo ""
    echo "================================================================"
    echo -e "${YELLOW}🔧 Management Options:${NC}"
    echo "================================================================"
    echo "[s] Show service status"
    echo "[l] Show backend logs (last 20 lines)"
    echo "[f] Show frontend logs (last 20 lines)"
    echo "[o] Open PrizePicks page"
    echo "[q] Quit and stop all services"
    echo ""
    
    read -p "Enter your choice: " choice
    
    case $choice in
        s|S)
            check_status
            ;;
        l|L)
            echo -e "${YELLOW}Backend Logs (last 20 lines):${NC}"
            tail -20 logs/backend.log
            ;;
        f|F)
            echo -e "${YELLOW}Frontend Logs (last 20 lines):${NC}"
            tail -20 logs/frontend.log
            ;;
        o|O)
            if command_exists open; then
                open http://localhost:8173#prizepicks
            elif command_exists xdg-open; then
                xdg-open http://localhost:8173#prizepicks
            else
                echo "Please open http://localhost:8173#prizepicks in your browser"
            fi
            ;;
        q|Q)
            cleanup
            ;;
        *)
            echo -e "${RED}Invalid choice. Please try again.${NC}"
            ;;
    esac
done
