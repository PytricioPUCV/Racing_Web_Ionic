import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { TimezoneService } from '../services/timezone.service';

export const timezoneInterceptor: HttpInterceptorFn = (req, next) => {
  const timezoneService = inject(TimezoneService);
  
  // Agregar header X-Timezone a todas las peticiones
  const clonedRequest = req.clone({
    setHeaders: {
      'X-Timezone': timezoneService.getUserTimezone()
    }
  });
  
  console.log('📤 Petición con timezone:', timezoneService.getUserTimezone());
  
  return next(clonedRequest);
};
