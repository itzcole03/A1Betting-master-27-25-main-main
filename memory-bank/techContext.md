# A1Betting Platform - Technical Context

## Technology Stack

### Frontend Technologies
- **React 18**: Latest React version with concurrent features, lazy loading, and Suspense
- **TypeScript**: Full type safety for financial calculations with 41 TypeScript definitions
- **Vite**: Fast build tool achieving <30 second builds (271KB bundle, 87.83KB gzipped)
- **Component Library**: 245+ custom React components across 49 directories
- **State Management**: 33 store files with Redux/Context patterns plus 174 custom React hooks
- **Animation**: Framer Motion for sophisticated UI animations and transitions
- **Icons**: Lucide React for consistent iconography
- **Styling**: Modern CSS with component-scoped styles and gradient themes
- **Performance**: Lazy loading with error boundaries and fallback components

### Backend Technologies
- **FastAPI**: High-performance Python web framework with comprehensive API endpoints
- **Python 3.12**: Latest Python with enhanced performance (87+ backend files)
- **TensorFlow**: ML model training and inference with 96.4% accuracy
- **SQLite + PostgreSQL**: Database architecture with Redis for caching
- **Uvicorn**: ASGI server for FastAPI applications with SSL support
- **Async/Await**: Full async support for I/O operations and real-time processing
- **Docker**: Containerization with Nginx reverse proxy
- **Autonomous Operations**: Self-healing capabilities and intelligent monitoring

### External Integrations
- **SportsRadar API**: Live sports data with R10yQbjTO5fZF6BPkfxjOaftsyN9X4ImAJv95H7s key
- **TheOdds API**: Odds data with 8684be37505fc5ce63b0337d472af0ee key  
- **PrizePicks & ESPN**: Public APIs with rate limiting compliance
- **40+ Sportsbooks**: Monitored for arbitrage detection and value betting
- **Rate Limiting**: Intelligent quota management (SportsRadar: 75%, TheOdds: 45% usage)
- **WebSockets**: Real-time data streaming with sub-100ms latency
- **HTTP Clients**: Async HTTP with productionApiService for unified API access

### Development Tools
- **Git**: Version control with GitHub integration
- **ESLint**: JavaScript/TypeScript linting
- **Prettier**: Code formatting
- **Jest**: Testing framework
- **Docker**: Containerization support
- **VS Code/Cursor**: Primary development environment

## System Requirements

### Runtime Environment
- **Node.js**: v18+ for frontend development
- **Python**: 3.12+ for backend services
- **Memory**: 8GB+ recommended for ML model operations
- **Storage**: SSD recommended for database performance
- **Network**: Stable internet for API integrations

### Development Environment
- **OS**: Windows 10/11, macOS 12+, or Linux
- **RAM**: 16GB+ recommended for development
- **CPU**: Multi-core processor for build performance
- **IDE**: Cursor/VS Code with TypeScript support

## Dependencies

### Frontend Dependencies (Key)
```json
{
  "react": "^18.x",
  "typescript": "^5.x",
  "vite": "^5.x",
  "@types/react": "^18.x",
  "eslint": "^8.x"
}
```

### Backend Dependencies (Key)
```python
fastapi>=0.104.0
uvicorn>=0.24.0
tensorflow>=2.14.0
sqlite3 (built-in)
python-dotenv>=1.0.0
pydantic>=2.0.0
```

### ML/Data Dependencies
```python
numpy>=1.24.0
pandas>=2.0.0
scikit-learn>=1.3.0
tensorflow>=2.14.0
```

## Technical Constraints

### Performance Constraints
- **Build Time**: Target <30 seconds for production builds
- **API Response**: <2 seconds for prediction endpoints
- **ML Accuracy**: Maintain ≥96.4% model accuracy
- **Uptime**: Target ≥99.9% platform availability

### Security Constraints
- **Data Protection**: Financial-grade security for betting data
- **API Keys**: Environment variables only, no hardcoded secrets
- **User Data**: Compliance with data protection regulations
- **Audit Trails**: All financial operations must be logged

### Scalability Constraints
- **Concurrent Users**: Support 1000+ simultaneous users
- **Data Volume**: Handle large sports data datasets
- **Model Performance**: Real-time ML predictions at scale
- **Database**: SQLite limitations for high-concurrency scenarios

### Integration Constraints
- **PrizePicks API**: Rate limiting compliance required
- **Real-time Data**: WebSocket connection management
- **External Dependencies**: Graceful degradation on API failures
- **Cross-platform**: Support Windows, macOS, Linux deployment

## Development Setup

### Local Development
```bash
# Frontend setup
cd frontend
npm install
npm run dev  # Runs on port 8173

# Backend setup
cd backend
pip install -r requirements.txt
python main.py  # Runs on port 8001
```

### Environment Variables
```bash
# Required environment variables
PRIZEPICKS_API_KEY=your_api_key_here
DATABASE_URL=sqlite:///./prizepicks_data.db
ML_MODEL_PATH=./models/
SECRET_KEY=your_secret_key_here
```

### Build Configuration
```bash
# Production build
npm run build  # Frontend
python deploy_production.py  # Backend
```

## Architecture Constraints

### Code Organization
- **Component Limit**: Max 1500 lines per component file
- **Service Modularity**: Single responsibility per service
- **Type Safety**: All functions must have type hints
- **Documentation**: JSDoc for complex functions

### Database Constraints
- **SQLite Limitations**: Single-writer, file-based storage
- **Model Storage**: TensorFlow models integrated with database
- **Backup Strategy**: Regular database backups required
- **Migration Support**: Schema versioning for updates

### ML Model Constraints
- **Accuracy Threshold**: Minimum 96.4% accuracy required
- **Model Size**: Balance between accuracy and performance
- **Training Data**: Regular retraining with new sports data
- **Inference Time**: Real-time prediction requirements

## Known Technical Debt

### TypeScript Errors
- **Current State**: 26,797 errors across 1,218 files
- **Primary Cause**: `,`n corruption patterns in source files
- **Resolution Strategy**: Systematic surgical repair
- **Priority**: High - affects development experience

### Build Performance
- **Issue**: Large codebase impacts build times
- **Mitigation**: Code splitting and lazy loading
- **Target**: <30 second production builds
- **Monitoring**: Build time tracking and optimization

### Code Complexity
- **Issue**: Some components exceed recommended size limits
- **Approach**: Refactor without losing sophistication
- **Principle**: Maintain architectural integrity
- **Method**: Extract reusable patterns, not simplify

## Future Technology Considerations

### Potential Upgrades
- **React 19**: When stable, for enhanced concurrent features
- **TypeScript 5.x**: Latest type system improvements
- **FastAPI 1.0**: When released, for production stability
- **TensorFlow 3.0**: Next-generation ML framework

### Scalability Improvements
- **Database**: Consider PostgreSQL for high-concurrency
- **Caching**: Redis for distributed caching
- **Load Balancing**: Multiple backend instances
- **CDN**: Static asset distribution

### Security Enhancements
- **Authentication**: Enhanced user authentication systems
- **Encryption**: End-to-end encryption for sensitive data
- **Monitoring**: Advanced security monitoring tools
- **Compliance**: Additional regulatory compliance features

This technical context provides the foundation for all development decisions and must be considered when making any architectural changes to the A1Betting platform. 