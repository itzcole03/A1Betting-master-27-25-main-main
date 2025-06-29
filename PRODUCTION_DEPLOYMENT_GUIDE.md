# A1Betting Backend Production Deployment Guide

## Overview

This guide covers the complete production deployment of the A1Betting backend, including all specialist API integrations, real-time data feeds, and monitoring systems.

## Architecture Overview

The A1Betting backend follows a "Specialist & Strategist" architecture:

- **Specialist APIs**: Direct integrations with Sportradar, TheOdds API, PrizePicks, and ESPN
- **Unified Data Layer**: Aggregates and normalizes data from all sources
- **Production-Grade Features**: Comprehensive logging, monitoring, caching, and error handling
- **Real-Time Processing**: Live data feeds and background data fetching

## Prerequisites

### System Requirements
- **OS**: Linux (Ubuntu 20.04+ recommended) or macOS
- **Python**: 3.9+ (3.11 recommended)
- **Memory**: 4GB+ RAM (8GB+ recommended)
- **Storage**: 20GB+ available space
- **Network**: Reliable internet connection for API calls

### Required Services
- **Database**: PostgreSQL 13+ (SQLite for development)
- **Cache**: Redis 6+ (optional but recommended)
- **Process Manager**: systemd, supervisor, or PM2

## API Keys Setup

### Required API Keys

1. **Sportradar API** (Premium sports data)
   - Sign up at: https://developer.sportradar.com/
   - Required for: Live game data, player statistics, team information
   - Daily limit: 1,000 requests (configurable)

2. **TheOdds API** (Live betting odds)
   - Sign up at: https://the-odds-api.com/
   - Required for: Live betting odds from multiple sportsbooks
   - Daily limit: 500 requests (configurable)

3. **PrizePicks API** (Player props)
   - Contact PrizePicks for API access
   - Required for: Player prop betting data
   - Daily limit: 1,000 requests (configurable)

4. **ESPN API** (Sports news)
   - Mostly public endpoints
   - Required for: Sports news and additional statistics
   - No strict limits for basic endpoints

### Environment Configuration

Copy the `.env.production` template and configure your API keys:

```bash
cp backend/.env.production backend/.env
```

Edit the `.env` file with your actual API keys and configuration:

```bash
# Required for production
ENVIRONMENT=production
SPORTRADAR_API_KEY=your_sportradar_api_key_here
THE_ODDS_API_KEY=your_theodds_api_key_here
PRIZEPICKS_API_KEY=your_prizepicks_api_key_here

# Database (use PostgreSQL for production)
DATABASE_URL=postgresql://username:password@localhost:5432/a1betting_prod

# Security (generate a secure key)
JWT_SECRET_KEY=$(openssl rand -hex 32)

# CORS (restrict to your domain)
CORS_ORIGINS=https://yourdomain.com,https://www.yourdomain.com
```

## Quick Deployment

### Option 1: Automated Deployment Script

The easiest way to deploy is using the provided deployment script:

```bash
cd backend
chmod +x deploy_production.sh
./deploy_production.sh
```

Options:
- `--skip-tests`: Skip running tests during deployment
- `--docker`: Use Docker deployment instead of direct deployment

### Option 2: Manual Deployment

1. **Setup Python Environment**
   ```bash
   cd backend
   python3 -m venv venv
   source venv/bin/activate
   pip install -r requirements_production.txt
   ```

2. **Configure Environment**
   ```bash
   cp .env.production .env
   # Edit .env with your configuration
   ```

3. **Run Database Migrations**
   ```bash
   python -m alembic upgrade head
   ```

4. **Start the Server**
   ```bash
   uvicorn main_enhanced_prod:app \
     --host 0.0.0.0 \
     --port 8000 \
     --workers 4 \
     --log-level info
   ```

## Docker Deployment

### Using Docker Compose (Recommended)

```bash
# Build and start all services
docker-compose -f docker-compose.prod.yml up -d

# View logs
docker-compose -f docker-compose.prod.yml logs -f

# Stop services
docker-compose -f docker-compose.prod.yml down
```

### Using Docker Directly

```bash
# Build the image
docker build -t a1betting-backend .

# Run the container
docker run -d \
  --name a1betting-backend \
  --env-file .env \
  -p 8000:8000 \
  a1betting-backend
```

## Production Configuration

### Database Setup

**PostgreSQL (Recommended)**
```bash
# Install PostgreSQL
sudo apt update
sudo apt install postgresql postgresql-contrib

# Create database and user
sudo -u postgres createuser --interactive a1betting
sudo -u postgres createdb a1betting_prod
sudo -u postgres psql -c "ALTER USER a1betting PASSWORD 'your_password';"
sudo -u postgres psql -c "GRANT ALL PRIVILEGES ON DATABASE a1betting_prod TO a1betting;"

# Update DATABASE_URL in .env
DATABASE_URL=postgresql://a1betting:your_password@localhost:5432/a1betting_prod
```

### Redis Setup (Optional but Recommended)

```bash
# Install Redis
sudo apt install redis-server

# Configure Redis
sudo systemctl enable redis-server
sudo systemctl start redis-server

# Update REDIS_URL in .env
REDIS_URL=redis://localhost:6379/0
```

### Process Management with systemd

Create a systemd service file:

```bash
sudo nano /etc/systemd/system/a1betting.service
```

```ini
[Unit]
Description=A1Betting Backend API
After=network.target

[Service]
Type=forking
User=ubuntu
WorkingDirectory=/path/to/A1Betting-master-27-25-main/backend
Environment=PATH=/path/to/A1Betting-master-27-25-main/backend/venv/bin
ExecStart=/path/to/A1Betting-master-27-25-main/backend/venv/bin/uvicorn main_enhanced_prod:app --host 0.0.0.0 --port 8000 --workers 4
ExecReload=/bin/kill -s HUP $MAINPID
Restart=always

[Install]
WantedBy=multi-user.target
```

Enable and start the service:

```bash
sudo systemctl daemon-reload
sudo systemctl enable a1betting
sudo systemctl start a1betting
sudo systemctl status a1betting
```

## Monitoring and Logging

### Health Checks

The backend provides multiple health check endpoints:

- **Simple Health**: `GET /health` - Quick status for load balancers
- **Detailed Health**: `GET /health/detailed` - Comprehensive system status
- **Legacy Health**: `GET /api/v1/health` - Compatibility endpoint

### Log Monitoring

Logs are written to:
- Console output (for Docker/systemd)
- `backend/server.log` (when using deployment script)
- Syslog (when configured)

Monitor logs in real-time:
```bash
# Direct deployment
tail -f backend/server.log

# Docker deployment
docker logs -f a1betting-backend

# systemd service
sudo journalctl -u a1betting -f
```

### Performance Monitoring

The backend includes built-in performance monitoring:
- Request/response times
- Memory and CPU usage
- Database connection status
- External API response times
- Cache hit/miss ratios

Access monitoring data:
```bash
# Performance metrics
curl http://localhost:8000/health/detailed

# API performance
curl http://localhost:8000/api/v1/analytics/performance
```

## API Endpoints

### Unified Data Endpoints

- `GET /api/v1/data/unified-games/{sport}` - Live games from all sources
- `GET /api/v1/data/player-props/{sport}` - Player props from PrizePicks
- `GET /api/v1/data/unified-odds/{sport}` - Betting odds from all sources
- `GET /api/v1/data/player-stats/{game_id}` - Player statistics
- `GET /api/v1/data/sports-news/{sport}` - Sports news from ESPN

### Prediction Endpoints

- `POST /api/v1/predict` - Generate predictions
- `GET /api/v1/betting-opportunities` - Get value betting opportunities
- `GET /api/v1/arbitrage-opportunities` - Get arbitrage opportunities

### Analytics Endpoints

- `GET /api/v1/analytics/performance` - Model performance metrics
- `GET /api/v1/news` - Sports news with betting impact analysis

## Security Considerations

### Environment Variables
- Use strong, unique JWT secrets
- Rotate API keys regularly
- Store sensitive data in environment variables, not code

### Network Security
- Use HTTPS in production (configure reverse proxy)
- Restrict CORS origins to your domain only
- Implement rate limiting (built-in)

### API Rate Limiting
- Default: 100 requests per minute per IP
- Configurable per endpoint
- Automatic throttling and error handling

## Troubleshooting

### Common Issues

1. **API Key Errors**
   ```bash
   # Check API key configuration
   curl http://localhost:8000/health/detailed
   ```

2. **Database Connection Issues**
   ```bash
   # Test database connection
   python -c "from config_manager import get_config; print(get_config().database.url)"
   ```

3. **High Memory Usage**
   ```bash
   # Monitor memory usage
   curl http://localhost:8000/health/detailed | jq '.checks.memory'
   ```

4. **External API Failures**
   ```bash
   # Check external API status
   curl http://localhost:8000/health/detailed | jq '.checks.external_apis'
   ```

### Performance Tuning

1. **Increase Worker Processes**
   ```bash
   # For high-traffic deployments
   uvicorn main_enhanced_prod:app --workers 8
   ```

2. **Optimize Cache Settings**
   ```env
   # In .env file
   CACHE_TTL=600  # Increase cache duration
   MAX_CACHE_SIZE=2000  # Increase cache size
   ```

3. **Database Connection Pooling**
   ```env
   # In .env file
   DB_POOL_SIZE=30
   DB_MAX_OVERFLOW=50
   ```

## Backup and Recovery

### Database Backups
```bash
# PostgreSQL backup
pg_dump a1betting_prod > backup_$(date +%Y%m%d_%H%M%S).sql

# Restore from backup
psql a1betting_prod < backup_file.sql
```

### Configuration Backups
```bash
# Backup environment configuration
cp .env .env.backup_$(date +%Y%m%d)
```

## Scaling Considerations

### Horizontal Scaling
- Use load balancer (nginx, HAProxy)
- Deploy multiple backend instances
- Shared Redis cache for session data

### Vertical Scaling
- Increase server resources
- Optimize database queries
- Implement caching strategies

## Support and Maintenance

### Regular Maintenance Tasks
1. Monitor API quotas and usage
2. Review and rotate API keys
3. Update dependencies regularly
4. Monitor system performance
5. Review error logs

### Monitoring Checklist
- [ ] Health checks responding
- [ ] API response times < 500ms
- [ ] Memory usage < 80%
- [ ] Database connections healthy
- [ ] External APIs responding
- [ ] Error rates < 1%

## Contact and Support

For issues and questions:
- Check the health monitoring endpoints first
- Review logs for error details
- Verify API key configurations
- Test external API connectivity

The production backend is designed to be self-healing and provides comprehensive monitoring to help identify and resolve issues quickly.
