import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { IonContent, IonGrid, IonRow, IonCol, IonCard } from '@ionic/angular/standalone';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { ProductService, Product } from '../../services/product';

@Component({
  selector: 'app-accessories',
  templateUrl: './accessories.page.html',
  styleUrls: ['./accessories.page.scss'],
  standalone: true,
  imports: [CommonModule, RouterModule, HeaderComponent, FooterComponent, IonContent, IonGrid, IonRow, IonCol, IonCard]
})
export class AccessoriesPage implements OnInit {
  accessories: Product[] = [];
  loading = true;

  constructor(private productService: ProductService) {}

  ngOnInit() {
    this.loadAccessories();
  }

  loadAccessories() {
    this.loading = true;

    this.productService.getAccessoryProducts().subscribe({
      next: (products) => {
        this.accessories = products;
        this.loading = false;
        console.log('✅ Accesorios cargados:', this.accessories);
      },
      error: (error) => {
        console.error('❌ Error al cargar accesorios:', error);
        this.loading = false;
      }
    });
  }

  // ✅ NUEVO MÉTODO: Navegar al producto con recarga de página
  navegarAlProducto(id: number | undefined) {
  if (id) {
    console.log('🔗 Navegando al producto:', id);
    window.location.href = `/product/${id}`;
  }
}
}
