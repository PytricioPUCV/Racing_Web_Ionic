import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { IonHeader, IonToolbar, IonButtons, IonButton, IonIcon } from '@ionic/angular/standalone';
import { ThemeService } from '../../services/theme';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  standalone: true,
  imports: [CommonModule, IonHeader, IonToolbar, IonButtons, IonButton, IonIcon]
})
export class HeaderComponent  implements OnInit {

  isMobileMenuOpen = false;

  constructor(private themeService: ThemeService, private router: Router) { }

  ngOnInit() {}

  toggleTheme() {
    this.themeService.toggleTheme();
  }

  navigateTo(path: string) {
    this.router.navigate([path]);
  }

  toggleMobileMenu() {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }

  navigateToAndClose(path: string) {
    this.navigateTo(path);
    this.isMobileMenuOpen = false;
  }
}