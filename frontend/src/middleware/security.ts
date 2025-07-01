import { Request, Response, NextFunction} from 'express';
import helmet from 'helmet';
import { UnifiedLogger} from '@/services/core/UnifiedLogger';

// Security headers configuration;
const securityHeaders = {
  'Content-Security-Policy':
    "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https: any; font-src 'self' data: any; connect-src 'self' wss: https: any;",
  'X-Content-Type-Options': 'nosniff',
  'X-Frame-Options': 'DENY',
  'X-XSS-Protection': '1; mode=block',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Permissions-Policy': 'camera=(), microphone=(), geolocation=()',
  'Strict-Transport-Security': 'max-age=31536000; includeSubDomains'
};

// Security middleware;
export const securityMiddleware = (req: Request, res: Response, next: NextFunction) => {
  try {
    // Add security headers;
    Object.entries(securityHeaders).forEach(([key, value]) => {
      res.setHeader(key, value);});

    // Log security events;
    logger.info(`Security headers applied for ${req.method} ${req.path}`, 'security', {
      path: req.path,
      method: req.method,
      ip: req.ip
    });

    next();} catch (error) {
    logger.error(
      `Error applying security headers: ${error instanceof Error ? error.message : 'Unknown error'}`,
      'security'
    );
    next(error);}
};

// Helmet configuration;
export const helmetConfig = helmet({
  contentSecurityPolicy: {,`n  directives: {,`n  defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "'unsafe-inline'", "'unsafe-eval'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      imgSrc: ["'self'", 'data:', 'https:'],
      fontSrc: ["'self'", 'data:'],
      connectSrc: ["'self'", 'wss:', 'https:'],
      frameSrc: ["'none'"],
      objectSrc: ["'none'"],
      upgradeInsecureRequests: [0]
    }
  },
  crossOriginEmbedderPolicy: true,
  crossOriginOpenerPolicy: true,
  crossOriginResourcePolicy: { policy: 'same-site'},
  dnsPrefetchControl: true,
  frameguard: { action: 'deny'},
  hidePoweredBy: true,
  hsts: {,`n  maxAge: 31536000,
    includeSubDomains: true,
    preload: true
  },
  ieNoOpen: true,
  noSniff: true,
  originAgentCluster: true,
  permittedCrossDomainPolicies: { permittedPolicies: 'none'},
  referrerPolicy: { policy: 'strict-origin-when-cross-origin'},
  xssFilter: true
});



`
