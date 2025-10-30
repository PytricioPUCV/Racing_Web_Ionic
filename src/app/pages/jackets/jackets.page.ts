import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { IonContent, IonGrid, IonRow, IonCol, IonCard } from '@ionic/angular/standalone';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { ProductService, Product } from '../../services/product';

@Component({
  selector: 'app-jackets',
  templateUrl: './jackets.page.html',
  styleUrls: ['./jackets.page.scss'],
  standalone: true,
  imports: [CommonModule, RouterModule, HeaderComponent, FooterComponent, IonContent, IonGrid, IonRow, IonCol, IonCard]
})
export class JacketsPage implements OnInit {
  jackets: Product[] = [];
  loading = true;

  constructor(private productService: ProductService) {}

  ngOnInit() {
    this.loadJackets();
  }

  loadJackets() {
    this.loading = true;

    this.productService.getJacketProducts().subscribe({
      next: (products) => {
        this.jackets = products;
        this.loading = false;
        console.log('✅ Chaquetas cargadas:', this.jackets);
      },
      error: (error) => {
        console.error('❌ Error al cargar chaquetas:', error);
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
