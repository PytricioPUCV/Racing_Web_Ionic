import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isAuthenticated()) {
    console.log('✅ Usuario autenticado - Acceso permitido');
    return true;
  }

  console.log('❌ Usuario NO autenticado - Redirigiendo a /login');
  router.navigate(['/login']);
  return false;
};
