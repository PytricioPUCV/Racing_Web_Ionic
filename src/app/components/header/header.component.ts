import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonHeader, IonToolbar, IonButtons, IonButton, IonIcon } from '@ionic/angular/standalone';
import { ThemeService } from '../../services/theme';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  standalone: true,
  imports: [CommonModule, IonHeader, IonToolbar, IonButtons, IonButton, IonIcon]
})
export class HeaderComponent implements OnInit {
  private authService = inject(AuthService);
  
  isMobileMenuOpen = false;
  isLoggedIn = false;

  constructor(private themeService: ThemeService) { }

  ngOnInit() {
    this.checkLoginStatus();
  }

  checkLoginStatus() {
    const user = this.authService.getCurrentUser();
    this.isLoggedIn = !!user;
  }

  toggleTheme() {
    this.themeService.toggleTheme();
  }

  toggleMobileMenu() {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }
}
