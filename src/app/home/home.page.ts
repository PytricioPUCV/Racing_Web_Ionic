import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonGrid, IonRow, IonCol, IonCard, IonSpinner, IonButton, IonImg } from '@ionic/angular/standalone';
import { HeaderComponent } from '../components/header/header.component';
import { FooterComponent } from '../components/footer/footer.component';
import { ProductService, Product } from '../services/product';
import { AuthService } from '../services/auth.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [
    CommonModule, 
    FormsModule, 
    HeaderComponent, 
    FooterComponent, 
    IonContent, 
    IonGrid, 
    IonRow, 
    IonCol, 
    IonCard, 
    IonSpinner,
    IonButton,
    IonImg,  // ← AGREGADO
    RouterLink
  ],
})
export class HomePage implements OnInit {
  private authService = inject(AuthService);
  private productService = inject(ProductService);
  
  products: Product[] = [];
  currentUser: any = null;
  loading: boolean = true;

  ngOnInit() {
    this.loadAllProducts();
    this.currentUser = this.authService.getCurrentUser();
    console.log('✅ Usuario autenticado en Home:', this.currentUser);
  }

  loadAllProducts() {
    this.loading = true;

    this.productService.getAllProductsFromAPI().subscribe({
      next: (products: Product[]) => {
        this.products = products;
        this.loading = false;
        console.log('✅ Todos los productos cargados desde API:', this.products);
      },
      error: (error: any) => {
        console.error('❌ Error al cargar productos:', error);
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

  goToProfile() {
    window.location.href = '/profile';
  }

  onLogout() {
    this.authService.logout();
    console.log('✅ Sesión cerrada');
    window.location.href = '/login';
  }
}
