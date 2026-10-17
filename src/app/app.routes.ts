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
    path: 'jackets',
    loadComponent: () => import('./pages/catalog/catalog.page').then(m => m.CatalogPage),
    data: {
      category: 'Chaquetas',
      title: 'Chaquetas',
      lead: 'Chaquetas racing con parches de escudería, para usar todos los días.'
    }
  },
  {
    path: 'accessories',
    loadComponent: () => import('./pages/catalog/catalog.page').then(m => m.CatalogPage),
    data: {
      category: 'Accesorios',
      title: 'Accesorios',
      lead: 'Gorras, guantes, mochilas y más para completar el look.'
    }
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
    path: 'checkout',
    loadComponent: () => import('./pages/checkout/checkout.page').then(m => m.CheckoutPage),
    canActivate: [authGuard]
  },

  {
    path: 'admin',
    loadComponent: () => import('./pages/admin/admin.page').then(m => m.AdminPage),
    canActivate: [adminGuard]
  },
  {
    path: 'admin/users',
    loadComponent: () => import('./pages/admin/admin-users/admin-users.page').then(m => m.AdminUsersPage),
    canActivate: [adminGuard]
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
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: 'home',
  },
];
