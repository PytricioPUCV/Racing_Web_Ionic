import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { IonHeader, IonIcon } from '@ionic/angular/standalone';
import { ThemeService } from '../../services/theme';
import { AuthService } from '../../services/auth.service';
import { CartService } from '../../services/cart.service';
import { TimezoneService } from '../../services/timezone.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  standalone: true,
  imports: [CommonModule, RouterModule, IonHeader, IonIcon]
})
export class HeaderComponent implements OnInit, OnDestroy {
  private authService = inject(AuthService);
  private timezoneService = inject(TimezoneService);
  private cartService = inject(CartService);
  private router = inject(Router);

  cartCount$ = this.cartService.cartItemCount$;
  
  isMobileMenuOpen = false;
  isLoggedIn = false;
  isAdmin = false;
  currentUser: any = null;

  currentTime: string = '';
  countryFlag: string = '🌍';
  showTime: boolean = false;
  private timeInterval: any;
  private authSubscription?: Subscription;

  private timezoneToFlag: { [key: string]: string } = {
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
    
    'Asia/Tokyo': '🇯🇵',
    'Asia/Shanghai': '🇨🇳',
    'Asia/Seoul': '🇰🇷',
    'Asia/Dubai': '🇦🇪',
    'Asia/Singapore': '🇸🇬',
    'Asia/Bangkok': '🇹🇭',
    'Asia/Manila': '🇵🇭',
    'Asia/Jakarta': '🇮🇩',
    
    'Australia/Sydney': '🇦🇺',
    'Pacific/Auckland': '🇳🇿'
  };

  constructor(private themeService: ThemeService) {}

  ngOnInit() {
    this.authSubscription = this.authService.isAuthenticated$.subscribe(() => this.checkLoginStatus());
    this.updateTime();
    this.setCountryFlag();
    this.timeInterval = setInterval(() => {
      this.updateTime();
    }, 1000);
  }

  ngOnDestroy() {
    this.authSubscription?.unsubscribe();
    if (this.timeInterval) {
      clearInterval(this.timeInterval);
    }
  }

  updateTime() {
    const now = this.timezoneService.getCurrentTime();
    this.currentTime = now.toFormat('HH:mm:ss');
  }

  setCountryFlag() {
    const timezone = this.timezoneService.getUserTimezone();
    this.countryFlag = this.timezoneToFlag[timezone] || '🌍';
  }

  toggleTimeDisplay() {
    this.showTime = !this.showTime;
  }

  checkLoginStatus() {
    this.currentUser = this.authService.getCurrentUser();
    this.isLoggedIn = !!this.currentUser;
    this.isAdmin = this.currentUser?.role === 'admin';
  }

  get isDark(): boolean {
    return this.themeService.isDark();
  }

  toggleTheme() {
    this.themeService.toggleTheme();
  }

  toggleMobileMenu() {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }

  closeMobileMenu() {
    this.isMobileMenuOpen = false;
  }

  logout() {
    this.closeMobileMenu();
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
