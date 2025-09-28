import { Component } from '@angular/core';
// 1. AÑADE IonRouterOutlet AQUÍ
import { IonTabs, IonRouterOutlet } from '@ionic/angular/standalone';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss'],
  standalone: true,
  // 2. AÑÁDELO TAMBIÉN A LA LISTA DE IMPORTS
  imports: [IonTabs, IonRouterOutlet],
})
export class TabsPage {
  constructor() {
    // Ya no necesitamos registrar íconos aquí
  }
}