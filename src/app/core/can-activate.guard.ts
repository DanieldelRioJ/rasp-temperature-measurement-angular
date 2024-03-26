import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from './services/auth.service';

export const canActivateGuard: CanActivateFn = () => {
    const authService = inject(AuthService);
    if (authService.user() != null) {
        return true;
    }
    const router = inject(Router);
    router.navigate(['login']);
    return false;
};

export const alreadyLogged: CanActivateFn = () => {
    const authService = inject(AuthService);
    if (authService.user() == null) {
        return true;
    }
    const router = inject(Router);
    router.navigate(['/']);
    return false;
};
