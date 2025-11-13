import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const adminGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const user = authService.getCurrentUser();

  if (user && user.role === 'admin') {
    console.log('✅ Admin autenticado - Acceso permitido');
    return true;
  }

  console.log('❌ No eres admin - Redirigiendo a /home');
  router.navigate(['/home']);
  return false;
};
