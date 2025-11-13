import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { IonContent, IonGrid, IonRow, IonCol, IonButton, IonCard, IonCardHeader, IonCardTitle, IonCardContent } from '@ionic/angular/standalone';
import { HeaderComponent } from '../../components/header/header.component';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.page.html',
  styleUrls: ['./admin.page.scss'],
  standalone: true,
  imports: [
    CommonModule, 
    RouterModule, 
    HeaderComponent, 
    IonContent, 
    IonGrid, 
    IonRow, 
    IonCol, 
    IonButton, 
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent
  ]
})
export class AdminPage {
  ngOnInit() {
    console.log('✅ Admin Panel Cargado');
  }
}
