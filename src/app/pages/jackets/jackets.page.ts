import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonContent, IonGrid, IonRow, IonCol, IonCard, IonSpinner } from '@ionic/angular/standalone';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { ProductService, Product } from '../../services/product';

@Component({
  selector: 'app-jackets',
  templateUrl: './jackets.page.html',
  styleUrls: ['./jackets.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    HeaderComponent,
    FooterComponent,
    IonContent,
    IonGrid,
    IonRow,
    IonCol,
    IonCard,
    IonSpinner
  ],
})
export class JacketsPage implements OnInit {
  private productService = inject(ProductService);
  
  products: Product[] = [];
  loading: boolean = true;

  ngOnInit() {
    this.loadJacketsFromAPI();
  }

  loadJacketsFromAPI() {
    this.loading = true;

    this.productService.getJacketProducts().subscribe({
      next: (products: Product[]) => {
        this.products = products;
        this.loading = false;
        console.log('✅ Chaquetas cargadas desde API:', this.products);
      },
      error: (error: any) => {
        console.error('❌ Error al cargar chaquetas:', error);
        this.loading = false;
      }
    });
  }

  navegarAlProducto(id: number | undefined) {
    if (id) {
      console.log('🔗 Navegando al producto:', id);
      window.location.href = `/product/${id}`;
    }
  }
}
