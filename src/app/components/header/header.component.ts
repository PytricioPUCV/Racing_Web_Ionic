import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { IonHeader, IonToolbar, IonButtons, IonButton, IonIcon } from '@ionic/angular/standalone';
import { ThemeService } from '../../services/theme';
import { AuthService } from '../../services/auth.service';
import { TimezoneService } from '../../services/timezone.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  standalone: true,
  imports: [CommonModule, RouterModule, IonHeader, IonToolbar, IonButtons, IonButton, IonIcon]
})
export class HeaderComponent implements OnInit, OnDestroy {
  private authService = inject(AuthService);
  private timezoneService = inject(TimezoneService);
  
  isMobileMenuOpen = false;
  isLoggedIn = false;
  isAdmin = false;
  currentUser: any = null;

  currentTime: string = '';
  countryFlag: string = '🌍'; // ← AGREGAR: emoji por defecto
  showTime: boolean = false;
  private timeInterval: any;

  // ✅ NUEVO: Mapa de timezones a banderas
  private timezoneToFlag: { [key: string]: string } = {
    // América
    'America/Santiago': '🇨🇱',
    'America/Argentina/Buenos_Aires': '🇦🇷',
    'America/Sao_Paulo': '🇧🇷',
    'America/Mexico_City': '🇲🇽',
    'America/Lima': '🇵🇪',
    'America/Bogota': '🇨🇴',
    'America/Caracas': '🇻🇪',
    'America/New_York': '🇺🇸',
    'America/Los_Angeles': '🇺🇸',
    'America/Chicago': '🇺🇸',
    'America/Denver': '🇺🇸',
    'America/Toronto': '🇨🇦',
    'America/Vancouver': '🇨🇦',
    
    // Europa
    'Europe/Madrid': '🇪🇸',
    'Europe/London': '🇬🇧',
    'Europe/Paris': '🇫🇷',
    'Europe/Berlin': '🇩🇪',
    'Europe/Rome': '🇮🇹',
    'Europe/Amsterdam': '🇳🇱',
    'Europe/Brussels': '🇧🇪',
    'Europe/Lisbon': '🇵🇹',
    'Europe/Athens': '🇬🇷',
    'Europe/Moscow': '🇷🇺',
    
    // Asia
    'Asia/Tokyo': '🇯🇵',
    'Asia/Shanghai': '🇨🇳',
    'Asia/Seoul': '🇰🇷',
    'Asia/Dubai': '🇦🇪',
    'Asia/Singapore': '🇸🇬',
    'Asia/Bangkok': '🇹🇭',
    'Asia/Manila': '🇵🇭',
    'Asia/Jakarta': '🇮🇩',
    
    // Oceanía
    'Australia/Sydney': '🇦🇺',
    'Pacific/Auckland': '🇳🇿'
  };

  constructor(private themeService: ThemeService) {}

  ngOnInit() {
    this.checkLoginStatus();
    this.updateTime();
    this.setCountryFlag(); // ← AGREGAR
    this.timeInterval = setInterval(() => {
      this.updateTime();
    }, 1000);
  }

  ngOnDestroy() {
    if (this.timeInterval) {
      clearInterval(this.timeInterval);
    }
  }

  updateTime() {
    const now = this.timezoneService.getCurrentTime();
    this.currentTime = now.toFormat('HH:mm:ss');
  }

  // ✅ NUEVO: Obtener bandera según timezone
  setCountryFlag() {
    const timezone = this.timezoneService.getUserTimezone();
    this.countryFlag = this.timezoneToFlag[timezone] || '🌍';
    console.log(`🌍 Timezone: ${timezone} | Bandera: ${this.countryFlag}`);
  }

  toggleTimeDisplay() {
    this.showTime = !this.showTime;
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
