import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
  RequestTimeoutException,
} from '@nestjs/common';
import { catchError, Observable } from 'rxjs';
import { EntityNotFoundError } from '../errors/entity-not-found.errors';
import { ResultNotAvailableError } from '../errors/result-not-available.error';

@Injectable()
export class ResultNotAvailableInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      catchError((error) => {
        if (error instanceof ResultNotAvailableError) {
          throw new RequestTimeoutException(error.message);
        } else {
          throw error;
        }
      }),
    );
  }
}
