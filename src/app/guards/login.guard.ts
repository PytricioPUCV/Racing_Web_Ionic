import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const loginGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isAuthenticated()) {
    console.log('✅ Ya estás autenticado - Redirigiendo a /home');
    router.navigate(['/home']);
    return false;
  }

  return true;
};
