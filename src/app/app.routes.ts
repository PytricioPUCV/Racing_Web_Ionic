import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then( m => m.HomePage)
  },
  {
    path: 'product/:id',
    loadComponent: () => import('./pages/product-detail/product-detail.page').then((m) => m.ProductDetailPage),
  },
  {
    path: 'register',
    loadComponent: () => import('./pages/register/register.page').then( m => m.RegisterPage)
  },
  {
    path: 'login',
    loadComponent: () => import('./pages/login/login.page').then( m => m.LoginPage)
  },
  {
    path: 'accessories',
    loadComponent: () => import('./pages/accessories/accessories.page').then( m => m.AccessoriesPage)
  },
  {
    path: 'jackets',
    loadComponent: () => import('./pages/jackets/jackets.page').then( m => m.JacketsPage)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
];