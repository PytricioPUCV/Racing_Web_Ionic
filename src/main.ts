import { DEFAULT_CURRENCY_CODE, LOCALE_ID } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import localeEsCl from '@angular/common/locales/es-CL';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter, RouteReuseStrategy } from '@angular/router';
import { IonicRouteStrategy, provideIonicAngular } from '@ionic/angular/standalone';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { addIcons } from 'ionicons';
import * as allIcons from 'ionicons/icons';

import { routes } from './app/app.routes';
import { AppComponent } from './app/app.component';
import { authInterceptor } from './app/services/auth.interceptor';
import { timezoneInterceptor } from './app/interceptors/timezone.interceptor';

registerLocaleData(localeEsCl);

addIcons(allIcons);

bootstrapApplication(AppComponent, {
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    { provide: LOCALE_ID, useValue: 'es-CL' },
    { provide: DEFAULT_CURRENCY_CODE, useValue: 'CLP' },
    provideIonicAngular(),
    provideRouter(routes),
    provideHttpClient(
      withInterceptors([
        timezoneInterceptor,
        authInterceptor
      ])
    )
  ],
});
