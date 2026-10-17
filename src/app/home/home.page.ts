import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { IonContent, IonSpinner, IonButton, IonImg, IonIcon } from '@ionic/angular/standalone';
import { HeaderComponent } from '../components/header/header.component';
import { FooterComponent } from '../components/footer/footer.component';
import { ProductCardComponent } from '../components/product-card/product-card.component';
import { ProductService, Product } from '../services/product';

const PREVIEW_SIZE = 4;

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    HeaderComponent,
    FooterComponent,
    ProductCardComponent,
    IonContent,
    IonSpinner,
    IonButton,
    IonImg,
    IonIcon
  ],
})
export class HomePage implements OnInit {
  private productService = inject(ProductService);

  jackets: Product[] = [];
  accessories: Product[] = [];
  jacketCount = 0;
  accessoryCount = 0;
  loading = true;
  loadError = false;

  ngOnInit() {
    this.loadProducts();
  }

  loadProducts() {
    this.loading = true;
    this.loadError = false;

    this.productService.getCatalog().subscribe({
      next: (products) => {
        const jackets = products.filter(p => p.category?.name === 'Chaquetas');
        const accessories = products.filter(p => p.category?.name === 'Accesorios');
        this.jacketCount = jackets.length;
        this.accessoryCount = accessories.length;
        this.jackets = jackets.slice(0, PREVIEW_SIZE);
        this.accessories = accessories.slice(0, PREVIEW_SIZE);
        this.loading = false;
      },
      error: () => {
        this.loading = false;
        this.loadError = true;
      }
    });
  }
}
