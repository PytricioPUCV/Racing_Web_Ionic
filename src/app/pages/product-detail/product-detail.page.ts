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
  IonItem,
  ToastController
} from '@ionic/angular/standalone';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { ProductService, Product } from '../../services/product';
import { CartService, CartItem } from '../../services/cart.service';
import { firstValueFrom } from 'rxjs';


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
  private userCartId: number | null = null;

  constructor(
    private route: ActivatedRoute, 
    private productService: ProductService,
    private cartService: CartService,
    private toastController: ToastController,
    private cdr: ChangeDetectorRef
  ) {
    console.log('✅ ProductDetailPage constructor ejecutado');
  }

  ngOnInit() {
    console.log('🔍 ngOnInit ejecutado');
    
    // Cargar el carrito del usuario para obtener el cartId
    //this.loadUserCart();
    
    this.route.paramMap.subscribe((params) => {
      const productId = params.get('id');
      console.log('📍 ID recibido:', productId);
      
      if (productId) {
        this.product = null;
        this.loading = true;
        this.quantity = 1;
        this.selectedSize = 'L';
        
        this.cdr.markForCheck();
        this.cdr.detectChanges();
        
        setTimeout(() => {
          this.loadProduct(+productId);
        }, 100);
      }
    });
  }

  loadUserCart(): void {
    this.cartService.getUserCart().subscribe({
      next: (cart) => {
        this.userCartId = cart.id;
        console.log('🛒 Cart ID cargado:', this.userCartId);
      },
      error: (err) => {
        console.error('❌ Error cargando carrito:', err);
        // Si no existe carrito, crear uno nuevo
        this.cartService.createCart().subscribe({
          next: (newCart) => {
            this.userCartId = newCart.id;
            console.log('✅ Nuevo carrito creado:', this.userCartId);
          }
        });
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

  async addToCart(): Promise<void> {
  if (!this.product) {
    await this.presentToast('❌ Error: Producto no disponible', 'danger');
    return;
  }

  // ✅ Si no hay cartId, crear o cargar carrito primero
  if (!this.userCartId) {
    console.log('⏳ Carrito no inicializado, cargando...');
    
    try {
      // Intentar obtener carrito existente
      const response = await firstValueFrom(this.cartService.getUserCart());
      
      // ✅ CORRECCIÓN: Acceder a response.cart.id en lugar de response.id
      this.userCartId = response.cart.id;
      console.log('✅ Carrito cargado, ID:', this.userCartId);
    } catch (err) {
      // Si falla, crear nuevo carrito
      console.log('📦 Creando nuevo carrito...');
      try {
        const newCartResponse = await firstValueFrom(this.cartService.createCart());
        
        // ✅ También aquí, acceder a .cart.id
        this.userCartId = newCartResponse.cart?.id || newCartResponse.id;
        console.log('✅ Nuevo carrito creado, ID:', this.userCartId);
      } catch (createErr) {
        console.error('❌ Error creando carrito:', createErr);
        await this.presentToast('❌ Error al inicializar carrito', 'danger');
        return;
      }
    }
  }

  // Validar productId
  const productId = this.product.id;
  
  if (!productId) {
    await this.presentToast('❌ Error: ID de producto inválido', 'danger');
    return;
  }

  // Crear el item del carrito
  const cartItem: CartItem = {
    cartId: this.userCartId!,
    productId: productId,
    quantity: this.quantity,
    size: this.selectedSize
  };

  console.log('🛒 Añadiendo al carrito:', cartItem);

  // Añadir al carrito
  this.cartService.addCartItem(cartItem).subscribe({
    next: async () => {
      await this.presentToast(
        `✅ ${this.product!.name} añadido (x${this.quantity}, ${this.selectedSize})`, 
        'success'
      );
      this.cartService.loadUserCart(); // Actualizar estado del carrito
      this.quantity = 1;
    },
    error: async (err) => {
      console.error('❌ Error añadiendo al carrito:', err);
      await this.presentToast('❌ Error al añadir producto', 'danger');
    }
  });
}




  private async presentToast(message: string, color: 'success' | 'danger' = 'success'): Promise<void> {
    const toast = await this.toastController.create({
      message: message,
      duration: 2500,
      position: 'top',
      color: color,
      cssClass: 'custom-toast'
    });
    await toast.present();
  }
}
