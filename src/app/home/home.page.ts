import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonGrid, IonRow, IonCol, IonCard, IonButton } from '@ionic/angular/standalone';
import { HeaderComponent } from '../components/header/header.component';
import { ProductService } from '../services/product';
import { FooterComponent } from '../components/footer/footer.component';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, HeaderComponent, FooterComponent, IonContent, IonGrid, IonRow, IonCol, IonCard, IonButton],
})
export class HomePage implements OnInit {
  products: any[] = [];

  constructor(private productService: ProductService) {}

  ngOnInit() {
    this.products = this.productService.getAllProducts();
  }
}