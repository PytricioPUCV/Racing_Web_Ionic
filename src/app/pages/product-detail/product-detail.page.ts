import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { 
  IonContent, 
  IonIcon,
  IonButton, 
  IonImg,
  IonAccordionGroup, 
  IonAccordion, 
  IonItem,
  IonLabel,
  ToastController
} from '@ionic/angular/standalone';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { ProductService, Product } from '../../services/product';
import { CartService, CartItem } from '../../services/cart.service';
import { AuthService } from '../../services/auth.service';
import { firstValueFrom } from 'rxjs';

const JACKET_SIZES = ['M', 'L', 'XL', 'XXL'];
const ONE_SIZE = 'Único';
const MAX_PER_ORDER = 10;
const LOW_STOCK = 5;

const CATEGORY_ROUTES: Record<string, string> = {
  Chaquetas: '/jackets',
  Accesorios: '/accessories'
};

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.page.html',
  styleUrls: ['./product-detail.page.scss'],
  standalone: true,
  imports: [
    CommonModule, 
    RouterLink,
    HeaderComponent, 
    FooterComponent, 
    IonContent, 
    IonIcon,
    IonButton,
    IonImg,
    IonAccordionGroup, 
    IonAccordion, 
    IonItem,
    IonLabel
  ]
})
export class ProductDetailPage implements OnInit {
  product: Product | null = null;
  selectedSize: string = 'L';
  quantity: number = 1;
  loading: boolean = true;
  readonly sizes = JACKET_SIZES;
  readonly lowStock = LOW_STOCK;
  private userCartId: number | null = null;

  constructor(
    private route: ActivatedRoute, 
    private router: Router,
    private productService: ProductService,
    private cartService: CartService,
    private authService: AuthService,
    private toastController: ToastController,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      const productId = params.get('id');
      if (productId) {
        this.product = null;
        this.loading = true;
        this.quantity = 1;
        this.loadProduct(+productId);
      }
    });
  }

  get isOneSize(): boolean {
    return this.product?.size === ONE_SIZE || this.product?.category?.name === 'Accesorios';
  }

  get categoryName(): string {
    return this.product?.category?.name || 'Productos';
  }

  get categoryRoute(): string {
    return CATEGORY_ROUTES[this.categoryName] || '/home';
  }

  get isSoldOut(): boolean {
    return this.product?.stock === 0;
  }

  get maxQuantity(): number {
    const stock = this.product?.stock;
    return typeof stock === 'number' ? Math.min(stock, MAX_PER_ORDER) : MAX_PER_ORDER;
  }

  loadProduct(id: number): void {
    this.loading = true;
    this.product = null;

    const onLoaded = (product: Product | undefined) => {
      this.product = product ?? null;
      this.selectedSize = this.isOneSize ? ONE_SIZE : (JACKET_SIZES.includes(product?.size || '') ? product!.size! : 'L');
      this.loading = false;
      this.cdr.detectChanges();
    };

    if (this.productService.isUsingBackend()) {
      this.productService.getProductByIdFromAPI(id).subscribe({
        next: onLoaded,
        error: () => onLoaded(undefined)
      });
    } else {
      onLoaded(this.productService.getProductById(id));
    }
  }

  selectSize(size: string): void {
    this.selectedSize = size;
  }

  changeQuantity(amount: number): void {
    const newQuantity = this.quantity + amount;
    if (newQuantity >= 1 && newQuantity <= this.maxQuantity) {
      this.quantity = newQuantity;
    }
  }

  async addToCart(goToCheckout = false): Promise<void> {
    if (!this.product) {
      await this.presentToast('❌ Error: Producto no disponible', 'danger');
      return;
    }

    if (!this.authService.isAuthenticated()) {
      await this.presentToast('Inicia sesión para añadir productos al carrito', 'danger');
      this.router.navigate(['/login']);
      return;
    }

    if (!this.userCartId) {
      console.log('⏳ Carrito no inicializado, cargando...');
      
      try {
        const response = await firstValueFrom(this.cartService.getUserCart());
        this.userCartId = response.cart.id;
        console.log('✅ Carrito cargado, ID:', this.userCartId);
      } catch (err) {
        console.log('📦 Creando nuevo carrito...');
        try {
          const newCartResponse = await firstValueFrom(this.cartService.createCart());
          this.userCartId = newCartResponse.cart?.id || newCartResponse.id;
          console.log('✅ Nuevo carrito creado, ID:', this.userCartId);
        } catch (createErr) {
          console.error('❌ Error creando carrito:', createErr);
          await this.presentToast('❌ Error al inicializar carrito', 'danger');
          return;
        }
      }
    }

    const productId = this.product.id;
    
    if (!productId) {
      await this.presentToast('❌ Error: ID de producto inválido', 'danger');
      return;
    }

    const cartItem: CartItem = {
      cartId: this.userCartId!,
      productId: productId,
      quantity: this.quantity,
      size: this.selectedSize
    };

    console.log('🛒 Añadiendo al carrito:', cartItem);

    this.cartService.addCartItem(cartItem).subscribe({
      next: async () => {
        if (goToCheckout) {
          this.cartService.loadUserCart();
          this.router.navigate(['/checkout']);
          return;
        }
        await this.presentToast(
          `✅ ${this.product!.name} añadido (x${this.quantity}, ${this.selectedSize})`, 
          'success'
        );
        this.cartService.loadUserCart();
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
