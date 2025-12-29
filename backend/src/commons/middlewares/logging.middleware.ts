/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { logger } from '../logger/logger.wiston';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const userAgent: string | undefined = req.headers['user-agent'];

    if (req.headers['x-health-check'] === 'cron') {
      console.log(
        '🆗🆗🆗🆗🆗🆗 [Health Check] Ping received, skipping session context setup.',
      );
      return next(); // skip session checks or socket cleanup
    }

    const xForwardedFor = req.headers['x-forwarded-for'] || '';
    const xRequestId = req.headers['x-request-id'] || '';
    const requestData: Record<string, any> = {
      timestamp: new Date().toISOString(),
      userAgent,
      userIp: req.ip,
      xForwardedFor: Array.isArray(xForwardedFor)
        ? xForwardedFor
        : xForwardedFor.split(',')[0],
      path: req.path,
      params: req.query,
      method: req.method,
      body: req.body ? JSON.stringify(this.obfuscate(req.body)) : {},
      xRequestId,
    };
    logger.info('InBound Request ✅✅✅✅✅✅✅✅✅', requestData);

    res.on('finish', () => {
      const responseData: Record<string, any> = {
        timestamp: new Date().toISOString(),
        path: req.path,
        method: req.method,
        statusCode: res.statusCode,
        userId: (req['user'] as Record<string, string>)?._id || 'Guest',
        role: (req['user'] as Record<string, string>)?.role || null,
        xRequestId,
      };
      logger.info('OutBound Response ⏩⏩⏩⏩⏩⏩⏩⏩⏩⏩⏩⏩', responseData);
    });

    next();
  }

  private obfuscate(body: unknown) {
    // if (JSON.stringify(maskedBody).length > 1000) { ... }
    if (!body || typeof body !== 'object') return body;

    const sensitiveFields = [
      'password',
      'token',
      'refreshToken',
      'secret',
      'creditCard',
    ];

    const newBody = { ...body };

    for (const key of Object.keys(newBody)) {
      if (sensitiveFields.includes(key)) {
        newBody[key] = '*************';
      } else if (typeof newBody[key] === 'object') {
        newBody[key] = this.obfuscate(newBody[key]);
      }
    }

    return newBody;
  }
}
