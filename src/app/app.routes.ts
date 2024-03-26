import { Routes } from '@angular/router';
import { alreadyLogged, canActivateGuard } from './core/can-activate.guard';

export const routes: Routes = [
    {
        path: '',
        loadChildren: () =>
            import('./modules/main/main.routes').then((m) => m.MAIN_ROUTES),
        canActivate: [canActivateGuard],
    },
    {
        path: 'login',
        loadChildren: () =>
            import('./modules/login/login.routes').then((m) => m.LOGIN_ROUTES),
        canActivate: [alreadyLogged],
    },
];
