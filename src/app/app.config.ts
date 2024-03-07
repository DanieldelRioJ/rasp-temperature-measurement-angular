import { ApplicationConfig, LOCALE_ID } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import {
    authRequiredInterceptor,
    setTokenInterceptor,
} from './core/interceptors/auth.interceptor';
import { registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/es';

registerLocaleData(localeEs);

export const appConfig: ApplicationConfig = {
    providers: [
        { provide: LOCALE_ID, useValue: 'es-ES' },
        provideRouter(routes),
        provideAnimationsAsync(),
        provideHttpClient(
            withInterceptors([authRequiredInterceptor, setTokenInterceptor]),
        ),
    ],
};
