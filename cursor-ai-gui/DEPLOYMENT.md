# Cursor AI GUI - Deployment Guide

## 🚀 Quick Start

### Development

```bash
# Option 1: Use the startup script
./start.sh

# Option 2: Manual setup
npm install
npm run dev
```

The application will be available at `http://localhost:3002`

### Production Build

```bash
npm run build
npm run preview
```

## 🌐 Production Deployment

### Option 1: Docker (Recommended)

```bash
# Build the Docker image
npm run docker:build

# Run the container
npm run docker:run
```

The application will be available at `http://localhost`

### Option 2: Static Hosting

```bash
# Build for production
npm run build

# The dist/ folder contains the static files
# Deploy to any static hosting service:
# - Netlify
# - Vercel
# - AWS S3 + CloudFront
# - GitHub Pages
```

### Option 3: Manual Server Setup

```bash
# Build the application
npm run build

# Serve with nginx, apache, or any web server
# Make sure to configure client-side routing
```

## ⚙️ Environment Configuration

### Required Environment Variables

Create a `.env` file based on `.env.example`:

```env
# API Configuration
VITE_API_URL=http://your-backend-url:8000
VITE_WS_URL=ws://your-backend-url:8000

# Application Configuration
VITE_APP_TITLE=Cursor AI GUI
VITE_APP_VERSION=1.0.0
```

### Backend Integration

The GUI expects a backend API running on the configured `VITE_API_URL`. The backend should provide:

- `/api/system/metrics` - System metrics
- `/api/typescript/stats` - TypeScript error stats
- `/api/agents` - Agent management
- `/api/commands/execute` - Command execution
- `/api/memory-bank/status` - Memory bank status
- `/ws` - WebSocket endpoint for real-time updates

If no backend is available, the GUI will fall back to mock data and simulated updates.

## 🔧 Build Configuration

### Custom Vite Configuration

The application uses Vite with the following optimizations:

- **Code Splitting**: Automatic route-based splitting
- **Tree Shaking**: Removes unused code
- **Asset Optimization**: Compresses images and fonts
- **Bundle Analysis**: Use `npm run analyze` to inspect bundle size

### Environment-Specific Builds

```bash
# Development build (includes debugging)
npm run dev

# Production build (optimized)
npm run build

# Preview production build locally
npm run preview
```

## 🐳 Docker Deployment

### Using Docker Compose

Create a `docker-compose.yml`:

```yaml
version: "3.8"
services:
  cursor-ai-gui:
    build: .
    ports:
      - "80:80"
    environment:
      - VITE_API_URL=http://backend:8000
      - VITE_WS_URL=ws://backend:8000
    depends_on:
      - backend

  backend:
    # Your backend service configuration
    image: your-backend-image
    ports:
      - "8000:8000"
```

### Kubernetes Deployment

Example Kubernetes manifests:

```yaml
# deployment.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: cursor-ai-gui
spec:
  replicas: 3
  selector:
    matchLabels:
      app: cursor-ai-gui
  template:
    metadata:
      labels:
        app: cursor-ai-gui
    spec:
      containers:
        - name: cursor-ai-gui
          image: cursor-ai-gui:latest
          ports:
            - containerPort: 80
          env:
            - name: VITE_API_URL
              value: "http://backend-service:8000"
---
# service.yaml
apiVersion: v1
kind: Service
metadata:
  name: cursor-ai-gui-service
spec:
  selector:
    app: cursor-ai-gui
  ports:
    - port: 80
      targetPort: 80
  type: LoadBalancer
```

## 🌍 CDN and Performance

### Recommended CDN Configuration

For optimal performance, configure your CDN to:

- Cache static assets (JS, CSS, images) for 1 year
- Set proper MIME types
- Enable gzip/brotli compression
- Configure cache-busting for `index.html`

### Performance Monitoring

The application includes built-in performance monitoring:

- **Bundle Size**: Monitor with `npm run analyze`
- **Load Times**: Check browser dev tools
- **Real-time Metrics**: View in the Performance page
- **Error Tracking**: Monitor in the Logs page

## 🔒 Security Considerations

### HTTPS Configuration

Always use HTTPS in production:

```nginx
server {
    listen 443 ssl http2;
    ssl_certificate /path/to/certificate.crt;
    ssl_certificate_key /path/to/private.key;

    # Security headers (included in nginx.conf)
    add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;
}
```

### Content Security Policy

The default CSP is permissive for development. In production, restrict it:

```
Content-Security-Policy: default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'; img-src 'self' data:; font-src 'self';
```

### API Security

- Use authentication tokens for API access
- Implement rate limiting
- Validate all inputs
- Use CORS appropriately

## 📊 Monitoring and Maintenance

### Health Checks

The Docker image includes health checks:

- HTTP endpoint: `GET /`
- Expected response: 200 OK
- Timeout: 3 seconds

### Log Management

Application logs are available in:

- **Browser Console**: Development debugging
- **Application Logs Page**: User-facing logs
- **Server Logs**: Nginx/container logs

### Updates and Maintenance

```bash
# Update dependencies
npm update

# Security audit
npm audit

# Clean rebuild
npm run clean
npm install
npm run build
```

## 🚨 Troubleshooting

### Common Issues

**Build Fails**

```bash
# Clear cache and rebuild
npm run clean
rm -rf node_modules package-lock.json
npm install
npm run build
```

**API Connection Issues**

- Verify `VITE_API_URL` is correct
- Check CORS configuration on backend
- Confirm backend is running and accessible

**WebSocket Connection Fails**

- Verify `VITE_WS_URL` is correct
- Check firewall/proxy WebSocket support
- Ensure backend WebSocket endpoint is working

**Performance Issues**

```bash
# Analyze bundle size
npm run analyze

# Check for large dependencies
npx bundlephobia package-name
```

### Development Debug Mode

```bash
# Enable debug mode
echo "VITE_DEBUG_MODE=true" >> .env

# View detailed logs in browser console
npm run dev
```

## 📞 Support

For deployment issues:

1. Check the logs in the Logs page
2. Verify environment configuration
3. Test API endpoints manually
4. Check browser developer console
5. Review Docker/container logs if applicable

---

**Built for Production** ✨

This deployment guide ensures your Cursor AI GUI runs reliably in production environments with proper security, performance, and monitoring.
