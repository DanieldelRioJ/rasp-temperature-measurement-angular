import { ApplicationConfig, LOCALE_ID } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import {
    authRequiredInterceptor,
    setTokenInterceptor,
} from './core/interceptors/auth.interceptor';
import { registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/es';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { NotificationService } from './shared/notification/notification.service';
import { errorHandlerInterceptor } from './core/error-handling/error-handler.interceptor';

registerLocaleData(localeEs);

export const appConfig: ApplicationConfig = {
    providers: [
        NotificationService,
        { provide: LOCALE_ID, useValue: 'es-ES' },
        provideRouter(routes, withComponentInputBinding()),
        provideAnimationsAsync(),
        provideHttpClient(
            withInterceptors([
                authRequiredInterceptor,
                setTokenInterceptor,
                errorHandlerInterceptor,
            ]),
        ),
        {
            provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
            useValue: {
                subscriptSizing: 'dynamic',
            },
        },
    ],
};
