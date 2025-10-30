import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';
import { loginGuard } from './guards/login.guard';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then(m => m.HomePage),
    canActivate: [authGuard]
  },
  {
    path: 'profile',
    loadComponent: () => import('./pages/profile/profile.page').then(m => m.ProfilePage),
    canActivate: [authGuard]
  },
  {
    path: 'product/:id',
    loadComponent: () => import('./pages/product-detail/product-detail.page').then((m) => m.ProductDetailPage),
    canActivate: [authGuard]
  },
  {
    path: 'accessories',
    loadComponent: () => import('./pages/accessories/accessories.page').then(m => m.AccessoriesPage),
    canActivate: [authGuard]
  },
  {
    path: 'jackets',
    loadComponent: () => import('./pages/jackets/jackets.page').then(m => m.JacketsPage),
    canActivate: [authGuard]
  },
  {
    path: 'register',
    loadComponent: () => import('./pages/register/register.page').then(m => m.RegisterPage),
    canActivate: [loginGuard]
  },
  {
    path: 'login',
    loadComponent: () => import('./pages/login/login.page').then(m => m.LoginPage),
    canActivate: [loginGuard]
  },
  {
    path: 'shopcart',
    loadComponent: () => import('./pages/shopcart/shopcart').then(m => m.ShopcartPage),
    canActivate: [authGuard]
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
];
