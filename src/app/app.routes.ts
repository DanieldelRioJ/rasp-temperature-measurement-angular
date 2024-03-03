import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        loadChildren: () =>
            import('./modules/main/main.routes').then((m) => m.MAIN_ROUTES),
    },
    {
        path: 'login',
        loadChildren: () =>
            import('./modules/login/login.routes').then((m) => m.LOGIN_ROUTES),
    },
];
