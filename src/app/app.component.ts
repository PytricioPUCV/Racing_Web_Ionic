import { Component } from '@angular/core';
import { IonApp, IonRouterOutlet } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { personOutline, searchOutline, bagHandleOutline, sunnyOutline, moonOutline } from 'ionicons/icons';
import { ThemeService } from './services/theme';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: true,
  imports: [IonApp, IonRouterOutlet],
})
export class AppComponent {
  constructor(private themeService: ThemeService) {
    addIcons({ personOutline, searchOutline, bagHandleOutline, sunnyOutline, moonOutline });
    this.themeService.checkAndApplyTheme();
  }
}