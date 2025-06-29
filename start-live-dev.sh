#!/bin/bash

echo "🚀 Starting A1Betting Live Development Environment..."
echo "==============================================="

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to check if port is available
check_port() {
    local port=$1
    if netstat -an | grep ":$port" > /dev/null; then
        return 1
    else
        return 0
    fi
}

# Function to wait for server to be ready
wait_for_server() {
    local url=$1
    local name=$2
    echo -e "${YELLOW}Waiting for $name to start...${NC}"
    
    for i in {1..30}; do
        if curl -s $url > /dev/null; then
            echo -e "${GREEN}✓ $name is ready!${NC}"
            return 0
        fi
        sleep 2
        echo -n "."
    done
    
    echo -e "${RED}✗ $name failed to start within 60 seconds${NC}"
    return 1
}

# Check if required tools are installed
echo -e "${BLUE}Checking prerequisites...${NC}"

if ! command -v node &> /dev/null; then
    echo -e "${RED}✗ Node.js is not installed${NC}"
    exit 1
fi

if ! command -v npm &> /dev/null; then
    echo -e "${RED}✗ npm is not installed${NC}"
    exit 1
fi

if ! command -v python &> /dev/null && ! command -v python3 &> /dev/null; then
    echo -e "${RED}✗ Python is not installed${NC}"
    exit 1
fi

echo -e "${GREEN}✓ All prerequisites are installed${NC}"

# Check if ports are available
echo -e "${BLUE}Checking port availability...${NC}"

if ! check_port 5173; then
    echo -e "${YELLOW}⚠ Port 5173 is already in use (Frontend Dev Server)${NC}"
fi

if ! check_port 5000; then
    echo -e "${YELLOW}⚠ Port 5000 is already in use (Backend API)${NC}"
fi

if ! check_port 3001; then
    echo -e "${YELLOW}⚠ Port 3001 is already in use (Live Server)${NC}"
fi

# Install frontend dependencies if needed
if [ ! -d "frontend/node_modules" ]; then
    echo -e "${BLUE}Installing frontend dependencies...${NC}"
    cd frontend && npm install && cd ..
    echo -e "${GREEN}✓ Frontend dependencies installed${NC}"
fi

# Install backend dependencies if needed
if [ ! -d "backend/venv" ] && [ -f "backend/requirements.txt" ]; then
    echo -e "${BLUE}Setting up Python virtual environment...${NC}"
    cd backend
    python -m venv venv
    source venv/bin/activate
    pip install -r requirements.txt
    cd ..
    echo -e "${GREEN}✓ Backend environment set up${NC}"
fi

# Create live development startup script
echo -e "${BLUE}Starting development servers...${NC}"

# Start backend server in background
echo -e "${YELLOW}Starting backend server...${NC}"
cd backend
if [ -d "venv" ]; then
    source venv/bin/activate
fi
python app.py &
BACKEND_PID=$!
cd ..

# Wait a moment for backend to start
sleep 3

# Start frontend development server
echo -e "${YELLOW}Starting frontend development server...${NC}"
cd frontend
npm run dev &
FRONTEND_PID=$!
cd ..

# Wait for servers to be ready
wait_for_server "http://localhost:5000/api/health" "Backend API"
wait_for_server "http://localhost:5173" "Frontend Dev Server"

echo ""
echo -e "${GREEN}🎉 Live Development Environment is Ready!${NC}"
echo "============================================="
echo -e "${BLUE}Frontend:${NC} http://localhost:5173"
echo -e "${BLUE}Backend API:${NC} http://localhost:5000"
echo -e "${BLUE}Live Server:${NC} http://localhost:3001"
echo ""
echo -e "${YELLOW}Development Features:${NC}"
echo "• Hot Module Replacement (HMR) enabled"
echo "• Real-time backend data integration"
echo "• Live Share ready for collaboration"
echo "• TypeScript type checking"
echo "• ESLint code quality checks"
echo ""
echo -e "${YELLOW}Collaboration Features:${NC}"
echo "• Use Live Share extension for real-time collaboration"
echo "• Share your workspace with: Ctrl+Shift+P → 'Live Share: Start Collaboration Session'"
echo "• CodeTour available for guided code walkthroughs"
echo ""
echo -e "${BLUE}To stop all servers, press Ctrl+C${NC}"

# Function to cleanup on exit
cleanup() {
    echo -e "\n${YELLOW}Shutting down development servers...${NC}"
    kill $BACKEND_PID $FRONTEND_PID 2>/dev/null
    echo -e "${GREEN}✓ All servers stopped${NC}"
    exit 0
}

# Set trap to cleanup on script exit
trap cleanup INT TERM

# Keep script running and show logs
echo -e "\n${BLUE}Development servers are running. Press Ctrl+C to stop.${NC}"
echo "======================================================"

# Wait for user interrupt
wait
