import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { IonContent, IonIcon } from '@ionic/angular/standalone';
import { HeaderComponent } from '../../components/header/header.component';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.page.html',
  styleUrls: ['./admin.page.scss'],
  standalone: true,
  imports: [CommonModule, RouterModule, HeaderComponent, IonContent, IonIcon]
})
export class AdminPage {
  readonly upcoming = [
    { icon: 'shirt-outline', title: 'Productos', description: 'Crear, editar y retirar productos del catálogo.' },
    { icon: 'receipt-outline', title: 'Pedidos', description: 'Seguir el estado de los pedidos de los clientes.' },
    { icon: 'stats-chart-outline', title: 'Reportes', description: 'Ventas y productos más vendidos.' }
  ];
}
