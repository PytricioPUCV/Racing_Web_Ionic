import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const loginGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  // Si ya está autenticado, redirigir a home
  if (authService.isAuthenticated()) {
    console.log('✅ Ya estás autenticado - Redirigiendo a /home');
    router.navigate(['/home']);
    return false; // No permitir acceso a login
  }

  return true; // Permitir acceso a login
};
