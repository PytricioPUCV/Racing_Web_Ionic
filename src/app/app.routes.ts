import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';
import { loginGuard } from './guards/login.guard';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then(m => m.HomePage),
    canActivate: [authGuard] // ✅ Proteger: requiere login
  },
  {
    path: 'product/:id',
    loadComponent: () => import('./pages/product-detail/product-detail.page').then((m) => m.ProductDetailPage),
    canActivate: [authGuard] // ✅ Proteger: requiere login
  },
  {
    path: 'accessories',
    loadComponent: () => import('./pages/accessories/accessories.page').then(m => m.AccessoriesPage),
    canActivate: [authGuard] // ✅ Proteger: requiere login
  },
  {
    path: 'jackets',
    loadComponent: () => import('./pages/jackets/jackets.page').then(m => m.JacketsPage),
    canActivate: [authGuard] // ✅ Proteger: requiere login
  },
  {
    path: 'register',
    loadComponent: () => import('./pages/register/register.page').then(m => m.RegisterPage),
    canActivate: [loginGuard] // ✅ Si ya está autenticado → redirigir a home
  },
  {
    path: 'login',
    loadComponent: () => import('./pages/login/login.page').then(m => m.LoginPage),
    canActivate: [loginGuard] // ✅ Si ya está autenticado → redirigir a home
  },
  {
    path: '',
    redirectTo: 'login', // ✅ CAMBIO: redirigir a login por defecto
    pathMatch: 'full',
  },
];
