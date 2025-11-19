import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonContent, IonGrid, IonRow, IonCol, IonCard, IonSpinner, IonImg } from '@ionic/angular/standalone';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { ProductService, Product } from '../../services/product';

@Component({
  selector: 'app-accessories',
  templateUrl: './accessories.page.html',
  styleUrls: ['./accessories.page.scss'],
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
    IonSpinner,
    IonImg
  ],
})
export class AccessoriesPage implements OnInit {
  private productService = inject(ProductService);
  
  products: Product[] = [];
  loading: boolean = true;

  ngOnInit() {
    this.loadAccessoriesFromAPI();
  }

  loadAccessoriesFromAPI() {
    this.loading = true;

    this.productService.getAccessoryProducts().subscribe({
      next: (products: Product[]) => {
        this.products = products;
        this.loading = false;
        console.log('✅ Accesorios cargados desde API:', this.products);
      },
      error: (error: any) => {
        console.error('❌ Error al cargar accesorios:', error);
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
