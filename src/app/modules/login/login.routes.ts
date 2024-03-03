import { Routes } from '@angular/router';
import { LoginContainerComponent } from './login-container/login-container.component';
import { RequestPasswordRecoverComponent } from './request-password-recover/request-password-recover.component';
import { LoginComponent } from './login/login.component';
import { PasswordRecoverComponent } from './password-recover/password-recover.component';
import { RegisterComponent } from './register/register.component';

export const LOGIN_ROUTES: Routes = [
    {
        path: '',
        component: LoginContainerComponent,
        children: [
            {
                path: '',
                component: LoginComponent,
            },
            {
                path: 'request-password-recover',
                component: RequestPasswordRecoverComponent,
            },
            {
                path: 'password-recover',
                component: PasswordRecoverComponent,
            },
            {
                path: 'register',
                component: RegisterComponent,
            },
        ],
    },
];
