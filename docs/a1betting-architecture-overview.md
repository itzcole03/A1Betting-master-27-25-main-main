# A1Betting Platform Architecture Overview

## System Architecture

### Frontend Architecture
**Main Component**: `QuantumSportsPlatform.tsx` (1320 lines)
- **Technology**: React 18 + TypeScript + Vite
- **Structure**: Sophisticated sidebar navigation with six core pages
- **Build Status**: Production builds succeed (271KB bundle, 87.83KB gzipped)
- **Current Issue**: 26,797 TypeScript errors from `,`n corruption patterns

#### Core Pages
1. **Dashboard** - Main overview and analytics
2. **PropOllama** - Prop betting analysis
3. **MoneyMakerPro** - Revenue optimization tools
4. **PrizePicks Pro** - PrizePicks integration and analysis
5. **Analytics** - Data visualization and insights
6. **ML Dashboard** - Machine learning model management

#### Component Structure
```
frontend/src/
├── components/ (245 components across 49 directories)
├── services/ (166 service files across 30 directories)
├── hooks/ (174 custom React hooks)
├── types/ (41 TypeScript definitions)
├── utils/ (161 utility functions)
├── stores/ (33 state management files)
└── QuantumSportsPlatform.tsx (main entry point)
```

### Backend Architecture
**Main Entry**: `main.py` (FastAPI application)
- **Technology**: FastAPI + SQLite + TensorFlow
- **Status**: Fully operational on port 8001
- **ML Models**: 96.4% accuracy, trained and initialized
- **Database**: SQLite with TensorFlow model integration

#### Key Components
```
backend/
├── main.py (FastAPI application entry)
├── models/ (ML model definitions and data structures)
├── services/ (Business logic and ML services)
├── routes/ (API endpoints)
├── auth/ (Authentication and security)
└── utils/ (Utility functions and helpers)
```

### Data Pipeline
- **Real-time PrizePicks API integration** with rate limiting
- **TensorFlow models** for prediction and analysis
- **SQLite database** for data persistence
- **WebSocket connections** for live data updates

## Current State Assessment

### Working Components ✅
- Backend fully operational (health checks passing)
- Build system functional (Vite production builds succeed)
- ML models trained and operational (96.4% accuracy)
- Real-time data pipeline functional
- API endpoints responding correctly

### Issues Requiring Repair ❌
- **26,797 TypeScript errors** across 1,218 files
- **`,`n character corruption** throughout codebase
- **Template literal malformation** in multiple components
- **Import path issues** for missing component directories
- **JSX syntax errors** in components like SavedLineups.tsx

## Architectural Principles

### 1. Preserve Sophistication
- **QuantumSportsPlatform.tsx** is intentionally complex (1320 lines)
- **Sophisticated navigation** and state management
- **Advanced ML integration** with real-time updates
- **Complex data visualization** components

### 2. Security-First Design
- **Environment variables** for all sensitive configuration
- **API key protection** and secure authentication
- **Financial data validation** and audit trails
- **Betting algorithm protection** (never expose)

### 3. Real-time Performance
- **WebSocket connections** for live data
- **Efficient state management** for large datasets
- **Optimized rendering** for complex dashboards
- **ML model caching** for fast predictions

## Technology Stack

### Frontend Stack
- **React 18** with functional components and hooks
- **TypeScript** for type safety and developer experience
- **Vite** for fast development and optimized builds
- **CSS Modules** and styled-components for styling
- **Real-time WebSocket** connections

### Backend Stack
- **FastAPI** for high-performance API development
- **SQLite** for lightweight, embedded database
- **TensorFlow** for machine learning models
- **Python 3.9+** with async/await patterns
- **Environment-based configuration**

### Development Tools
- **Cursor AI** with background agents for development
- **TypeScript compiler** for type checking
- **ESLint/Prettier** for code quality
- **Jest/Pytest** for testing
- **Git** for version control

## Integration Points

### PrizePicks API Integration
- **Rate limiting** to respect API quotas
- **Real-time data synchronization**
- **Error handling** for API failures
- **Caching strategy** for performance

### ML Model Integration
- **TensorFlow models** with 96.4% accuracy
- **Real-time prediction pipeline**
- **Model performance monitoring**
- **Fallback mechanisms** for model failures

### Database Integration
- **SQLite** for lightweight persistence
- **TensorFlow model storage**
- **User data and betting history**
- **Audit trails** for financial operations

## Development Workflow

### Current Priority
1. **Fix TypeScript errors** (26,797 → < 100)
2. **Repair `,`n corruption** patterns
3. **Restore component functionality**
4. **Maintain ML model performance**
5. **Preserve sophisticated architecture**

### Repair Strategy
- **Surgical approach**: Fix corruption without rewriting
- **Incremental testing**: Validate each repair step
- **Architecture preservation**: Maintain complexity and sophistication
- **Security validation**: Ensure no sensitive data exposure

This architecture overview provides context for understanding the A1Betting platform's sophisticated design and current repair requirements. 