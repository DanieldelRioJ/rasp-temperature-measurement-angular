import {
    HttpErrorResponse,
    HttpHandlerFn,
    HttpInterceptorFn,
    HttpRequest,
} from '@angular/common/http';
import { catchError, throwError } from 'rxjs';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const authRequiredInterceptor: HttpInterceptorFn = (
    req: HttpRequest<unknown>,
    next: HttpHandlerFn,
) => {
    const router = inject(Router);
    const authService = inject(AuthService);
    return next(req).pipe(
        catchError((error: HttpErrorResponse) => {
            if (error.status == 401) {
                authService.token = null;
                authService.user.set(null);
                router.navigateByUrl('/login');
            }
            return throwError(() => error);
        }),
    );
};

export const setTokenInterceptor: HttpInterceptorFn = (
    req: HttpRequest<unknown>,
    next: HttpHandlerFn,
) => {
    const authService = inject(AuthService);
    const token = authService.token;

    let request = req;

    if (token) {
        request = req.clone({
            setHeaders: {
                authorization: `Bearer ${token}`,
            },
        });
    }

    return next(request);
};
