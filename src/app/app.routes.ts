import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';
import { loginGuard } from './guards/login.guard';
import { adminGuard } from './guards/admin.guard';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then(m => m.HomePage),
  },
  {
    path: 'accessories',
    loadComponent: () => import('./pages/accessories/accessories.page').then(m => m.AccessoriesPage),
  },
  {
    path: 'jackets',
    loadComponent: () => import('./pages/jackets/jackets.page').then(m => m.JacketsPage),
  },
  {
    path: 'product/:id',
    loadComponent: () => import('./pages/product-detail/product-detail.page').then((m) => m.ProductDetailPage),
  },

  {
    path: 'profile',
    loadComponent: () => import('./pages/profile/profile.page').then(m => m.ProfilePage),
    canActivate: [authGuard]
  },
  {
    path: 'shopcart',
    loadComponent: () => import('./pages/shopcart/shopcart').then(m => m.ShopcartPage),
    canActivate: [authGuard]
  },

  {
    path: 'admin',
    loadComponent: () => import('./pages/admin/admin.page').then(m => m.AdminPage),
    canActivate: [adminGuard]
  },
  {
    path: 'register',
    loadComponent: () => import('./pages/register/register.page').then(m => m.RegisterPage),
  },
  {
    path: 'login',
    loadComponent: () => import('./pages/login/login.page').then(m => m.LoginPage),
  },

  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
];
