// src/app/app.config.ts
import { ApplicationConfig, LOCALE_ID } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideEnvironmentNgxMask } from 'ngx-mask';
import { registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';
import { routes } from './app.routes';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { jwtInterceptor } from '../core/interceptors/jwt.interceptor';
import { httpErrorInterceptor } from '../core/interceptors/http-error.interceptor';

registerLocaleData(localePt);

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideAnimations(),
    provideHttpClient(
      withFetch(),
      withInterceptors([jwtInterceptor, httpErrorInterceptor])
    ),
    provideEnvironmentNgxMask(),
    { provide: LOCALE_ID, useValue: 'pt-BR' }
  ]
};
