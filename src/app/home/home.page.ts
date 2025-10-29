import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { IonContent, IonGrid, IonRow, IonCol, IonCard, IonButton } from '@ionic/angular/standalone';
import { HeaderComponent } from '../components/header/header.component';
import { FooterComponent } from '../components/footer/footer.component';
import { ProductService } from '../services/product';
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
    IonButton,
    RouterLink
  ],
})
export class HomePage implements OnInit {
  private authService = inject(AuthService);
  private router = inject(Router);
  
  products: any[] = [];
  currentUser: any = null;

  constructor(private productService: ProductService) {}

  ngOnInit() {
    this.products = this.productService.getAllProducts();
    this.currentUser = this.authService.getCurrentUser();
    console.log('✅ Usuario autenticado en Home:', this.currentUser);
  }

  // Método para cerrar sesión y recargar
  onLogout() {
    this.authService.logout();
    console.log('✅ Sesión cerrada');
    
    // Redirigir a login y recargar la página
    this.router.navigate(['/login']).then(() => {
      window.location.reload(); // ✅ Recarga la página después de navegar
    });
  }
}
