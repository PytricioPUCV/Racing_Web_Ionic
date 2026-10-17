import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { IonContent, IonSpinner, IonButton, IonIcon } from '@ionic/angular/standalone';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { ProductCardComponent } from '../../components/product-card/product-card.component';
import { ProductService, Product } from '../../services/product';

export interface CatalogRouteData {
  category: string;
  title: string;
  lead: string;
}

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.page.html',
  standalone: true,
  imports: [
    CommonModule,
    HeaderComponent,
    FooterComponent,
    ProductCardComponent,
    IonContent,
    IonSpinner,
    IonButton,
    IonIcon
  ],
})
export class CatalogPage implements OnInit {
  private productService = inject(ProductService);
  private route = inject(ActivatedRoute);

  config = this.route.snapshot.data as CatalogRouteData;
  products: Product[] = [];
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
        this.products = products.filter(p => p.category?.name === this.config.category);
        this.loading = false;
      },
      error: () => {
        this.loading = false;
        this.loadError = true;
      }
    });
  }
}
