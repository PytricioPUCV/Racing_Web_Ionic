<<<<<<< Updated upstream
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonGrid, IonRow, IonCol, IonCard, IonButton } from '@ionic/angular/standalone';
=======
import { Component, OnInit, inject, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonGrid, IonRow, IonCol, IonCard, IonSpinner, IonButton, IonIcon } from '@ionic/angular/standalone';
>>>>>>> Stashed changes
import { HeaderComponent } from '../components/header/header.component';
import { ProductService } from '../services/product';
import { FooterComponent } from '../components/footer/footer.component';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
<<<<<<< Updated upstream
  imports: [CommonModule, FormsModule, HeaderComponent, FooterComponent, IonContent, IonGrid, IonRow, IonCol, IonCard, IonButton],
=======
  imports: [IonIcon, 
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
    RouterLink
  ],
>>>>>>> Stashed changes
})
export class HomePage implements OnInit {
  products: any[] = [];

  constructor(private productService: ProductService) {}

  // ✅ NUEVO: ViewChild para hacer scroll a la sección de productos
  @ViewChild('productsSection', { read: ElementRef }) productsSection!: ElementRef;

  ngOnInit() {
    this.products = this.productService.getAllProducts();
  }
<<<<<<< Updated upstream
}
=======

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

  // ✅ NUEVO: Scroll suave a la sección de productos
  scrollToProducts() {
    if (this.productsSection) {
      this.productsSection.nativeElement.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  }

  // ✅ MÉTODOS DE NAVEGACIÓN CON RECARGA
  goToProfile() {
    window.location.href = '/profile';
  }

  onLogout() {
    this.authService.logout();
    console.log('✅ Sesión cerrada');
    window.location.href = '/login';
  }
// Método para agregar a favoritos
toggleFavorite(product: any, event: Event) {
  event.stopPropagation(); // Evitar que se active el click del card
  console.log('💖 Favorito:', product.name);
  // Aquí puedes agregar lógica para guardar en favoritos
}

// Método para agregar al carrito rápidamente
addToCartQuick(product: any, event: Event) {
  event.stopPropagation(); // Evitar que se active el click del card
  console.log('🛒 Agregado al carrito:', product.name);
  // Aquí puedes agregar lógica para el carrito
}

}
>>>>>>> Stashed changes
