import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { AuthService } from './auth.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const token = authService.getToken();

  // Agregar token a la petición si existe
  if (token) {
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
  }

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      // Manejo de errores de autenticación
      if (error.status === 401) {
        console.log('⚠️ Token expirado o inválido - Cerrando sesión');
        
        // Limpiar sesión y redirigir a login
        authService.logout();
        router.navigate(['/login']);
        
        // Opcional: Mostrar mensaje al usuario
        alert('Tu sesión ha expirado. Por favor, inicia sesión nuevamente.');
      }
      
      return throwError(() => error);
    })
  );
};
