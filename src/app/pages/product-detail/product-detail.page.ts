import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { 
  IonContent, 
  IonGrid, 
  IonRow, 
  IonCol, 
  IonLabel, 
  IonButton, 
  IonAccordionGroup, 
  IonAccordion, 
  IonItem
} from '@ionic/angular/standalone';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { ProductService, Product } from '../../services/product';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.page.html',
  styleUrls: ['./product-detail.page.scss'],
  standalone: true,
  imports: [
    CommonModule, 
    HeaderComponent, 
    FooterComponent, 
    IonContent, 
    IonGrid, 
    IonRow, 
    IonCol, 
    IonLabel, 
    IonButton, 
    IonAccordionGroup, 
    IonAccordion, 
    IonItem
  ]
})
export class ProductDetailPage implements OnInit {
  product: Product | null = null;
  selectedSize: string = 'L';
  quantity: number = 1;
  loading: boolean = true;

  constructor(
    private route: ActivatedRoute, 
    private productService: ProductService,
    private cdr: ChangeDetectorRef
  ) {
    console.log('✅ ProductDetailPage constructor ejecutado');
  }

  ngOnInit() {
  console.log('🔍 ngOnInit ejecutado');
  
  this.route.paramMap.subscribe((params) => {
    const productId = params.get('id');
    console.log('📍 ID recibido:', productId);
    
    if (productId) {
      // ✅ Destruir y recrear el componente
      this.product = null;
      this.loading = true;
      this.quantity = 1;
      this.selectedSize = 'L';
      
      // ✅ Forzar render antes de cargar
      this.cdr.markForCheck();
      this.cdr.detectChanges();
      
      // ✅ Cargar con pequeño delay para asegurar que se renderiza
      setTimeout(() => {
        this.loadProduct(+productId);
      }, 100);
    }
  });
}

  loadProduct(id: number): void {
    console.log('🔍 loadProduct llamado con ID:', id);
    this.loading = true;
    this.product = null;
    this.cdr.detectChanges();

    if (this.productService.isUsingBackend()) {
      console.log('🌐 Cargando desde BACKEND');
      
      this.productService.getProductByIdFromAPI(id).subscribe({
        next: (product: Product) => {
          console.log('✅ Producto recibido:', product);
          this.product = product;
          this.selectedSize = this.product?.size || 'L';
          this.loading = false;
          this.cdr.detectChanges();
          console.log('✅ Estado actualizado - loading:', this.loading, 'product:', this.product);
        },
        error: (error: any) => {
          console.error('❌ Error en getProductByIdFromAPI:', error);
          this.loading = false;
          this.cdr.detectChanges();
        }
      });
    } else {
      console.log('📦 Cargando desde MOCK');
      
      const product = this.productService.getProductById(id);
      console.log('✅ Producto mock recibido:', product);
      
      if (product) {
        this.product = product;
        this.selectedSize = this.product?.size || 'L';
        this.loading = false;
        this.cdr.detectChanges();
        console.log('✅ Estado actualizado - loading:', this.loading);
      } else {
        console.error('❌ Producto no encontrado en MOCK');
        this.loading = false;
        this.cdr.detectChanges();
      }
    }
  }

  selectSize(size: string): void {
    this.selectedSize = size;
    console.log('📏 Talla seleccionada:', size);
  }

  changeQuantity(amount: number): void {
    const newQuantity = this.quantity + amount;
    if (newQuantity >= 1 && newQuantity <= 10) {
      this.quantity = newQuantity;
    }
  }

  addToCart(): void {
    if (this.product) {
      alert(`${this.product.name} agregado al carrito\nCantidad: ${this.quantity}\nTalla: ${this.selectedSize}`);
    }
  }
}
