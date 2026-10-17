import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular/standalone';
import { catchError, throwError } from 'rxjs';
import { AuthService } from './auth.service';

// En estos endpoints un 401 significa credenciales incorrectas, no una sesión vencida
const CREDENTIAL_ENDPOINTS = ['/auth/login', '/auth/register'];

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const toastController = inject(ToastController);
  const token = authService.getToken();

  if (token) {
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
  }

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      const isCredentialRequest = CREDENTIAL_ENDPOINTS.some(path => req.url.endsWith(path));
      // Si varias peticiones fallan a la vez, solo la primera cierra la sesión:
      // las siguientes ya no encuentran el mismo token guardado.
      const sessionStillActive = !!token && authService.getToken() === token;

      if (error.status === 401 && !isCredentialRequest && sessionStillActive) {
        authService.logout();
        router.navigate(['/login']);

        toastController.create({
          message: 'Tu sesión ha expirado. Por favor, inicia sesión nuevamente.',
          duration: 3000,
          position: 'top',
          color: 'danger',
          cssClass: 'custom-toast'
        }).then(toast => toast.present());
      }

      return throwError(() => error);
    })
  );
};
