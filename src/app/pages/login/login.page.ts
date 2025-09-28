import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonList, IonItem, IonInput, IonButton } from '@ionic/angular/standalone';
import { HeaderComponent } from '../../components/header/header.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, HeaderComponent, IonContent, IonHeader, IonTitle, IonToolbar, IonList, IonItem, IonInput, IonButton]
})
export class LoginPage implements OnInit {
  constructor() { }
  ngOnInit() { }
}