import { bootstrapApplication } from '@angular/platform-browser';
import { RouteReuseStrategy, provideRouter, withPreloading, PreloadAllModules } from '@angular/router';
import { IonicRouteStrategy, provideIonicAngular } from '@ionic/angular/standalone';
<<<<<<< Updated upstream
=======
import { IonicStorageModule } from '@ionic/storage-angular';  // ← NUEVO
import { importProvidersFrom } from '@angular/core';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { addIcons } from 'ionicons';
import * as allIcons from 'ionicons/icons';
>>>>>>> Stashed changes

import { routes } from './app/app.routes';
import { AppComponent } from './app/app.component';

bootstrapApplication(AppComponent, {
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    provideIonicAngular(),
<<<<<<< Updated upstream
    provideRouter(routes, withPreloading(PreloadAllModules)),
=======
    provideRouter(routes),
    importProvidersFrom(IonicStorageModule.forRoot()),
    provideHttpClient(withInterceptors([authInterceptor])) 
>>>>>>> Stashed changes
  ],
});
