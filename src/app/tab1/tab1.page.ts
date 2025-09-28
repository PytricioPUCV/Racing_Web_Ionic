import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonContent, IonGrid, IonRow, IonCol, IonCard, IonButton } from '@ionic/angular/standalone';
import { HeaderComponent } from '../components/header/header.component';
import { ProductService } from '../services/product';
// 1. IMPORTA EL FOOTERCOMPONENT AQUÍ
import { FooterComponent } from '../components/footer/footer.component';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  standalone: true,
  // 2. AÑÁDELO A LA LISTA DE IMPORTS
  imports: [CommonModule, FormsModule, RouterModule, HeaderComponent, FooterComponent, IonContent, IonGrid, IonRow, IonCol, IonCard, IonButton],
})
export class Tab1Page implements OnInit {
  products: any[] = [];

  constructor(private productService: ProductService) {}

  ngOnInit() {
    this.products = this.productService.getAllProducts();
  }
}