import {
    HttpErrorResponse,
    HttpInterceptorFn,
    HttpStatusCode,
} from '@angular/common/http';
import { catchError, throwError } from 'rxjs';
import { inject } from '@angular/core';
import { ErrorHandlerService } from './error-handler.service';

export const errorHandlerInterceptor: HttpInterceptorFn = (req, next) => {
    const errorHandlerService = inject(ErrorHandlerService);
    return next(req).pipe(
        catchError((error) => {
            if (
                error instanceof HttpErrorResponse &&
                req.url.includes('register/identifier')
            ) {
                return throwError(() => error);
            }
            // Catch any error except 401
            if (
                error instanceof HttpErrorResponse &&
                error.status != HttpStatusCode.Unauthorized
            ) {
                errorHandlerService.error(error);
            }

            return throwError(() => error);
        }),
    );
};
