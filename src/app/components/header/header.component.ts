import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { IonHeader, IonToolbar, IonButtons, IonButton, IonIcon } from '@ionic/angular/standalone';
import { ThemeService } from '../../services/theme';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  standalone: true,
  imports: [CommonModule, RouterModule, IonHeader, IonToolbar, IonButtons, IonButton, IonIcon]
})
export class HeaderComponent implements OnInit {
  private authService = inject(AuthService);
  
  isMobileMenuOpen = false;
  isLoggedIn = false;
  isAdmin = false;
  currentUser: any = null;

  constructor(private themeService: ThemeService) {}

  ngOnInit() {
    this.checkLoginStatus();
  }

  checkLoginStatus() {
    this.currentUser = this.authService.getCurrentUser();
    this.isLoggedIn = !!this.currentUser;
    this.isAdmin = this.currentUser?.role === 'admin';
  }

  toggleTheme() {
    this.themeService.toggleTheme();
  }

  toggleMobileMenu() {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }

  // ✅ MÉTODOS DE NAVEGACIÓN CON RECARGA
  goToHome() {
    window.location.href = '/home';
  }

  goToAccessories() {
    window.location.href = '/accessories';
  }

  goToJackets() {
    window.location.href = '/jackets';
  }

  goToCart() {
    window.location.href = '/shopcart';
  }

  goToProfile() {
    window.location.href = '/profile';
  }

  goToAdminUsers() {
    window.location.href = '/admin/users';
  }

  goToLogin() {
    window.location.href = '/login';
  }

  goToRegister() {
    window.location.href = '/register';
  }

  logout() {
    this.authService.logout();
    window.location.href = '/login';
  }
}
