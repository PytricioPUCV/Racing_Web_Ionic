import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
<<<<<<< Updated upstream
import { IonHeader, IonToolbar, IonButtons, IonButton, IonIcon } from '@ionic/angular/standalone';
=======
import { RouterModule } from '@angular/router';
import { IonHeader, IonToolbar, IonButtons, IonButton, IonIcon, IonImg } from '@ionic/angular/standalone';
>>>>>>> Stashed changes
import { ThemeService } from '../../services/theme';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  standalone: true,
<<<<<<< Updated upstream
  imports: [CommonModule, IonHeader, IonToolbar, IonButtons, IonButton, IonIcon]
=======
  imports: [IonImg, CommonModule, RouterModule, IonHeader, IonToolbar, IonButtons, IonButton, IonIcon]
>>>>>>> Stashed changes
})
export class HeaderComponent  implements OnInit {

  isMobileMenuOpen = false;

  constructor(private themeService: ThemeService) { }

  ngOnInit() {}

  toggleTheme() {
    this.themeService.toggleTheme();
  }

  toggleMobileMenu() {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }
}