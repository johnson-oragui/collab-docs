/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { logger } from '../logger/logger.wiston';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const req = ctx.getRequest<Request>();

    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const resMessage =
      exception instanceof HttpException
        ? exception.message
        : 'Internal server error';

    logger.error('Unhandled exception', {
      path: req.originalUrl,
      method: req.method,
      status,
      error: exception instanceof Error ? exception.message : String(exception),
    });

    response.status(status).json({
      statusCode: status,
      message: resMessage,
      sucess: false,
    });
  }
}
