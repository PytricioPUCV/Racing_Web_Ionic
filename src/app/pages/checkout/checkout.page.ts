import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import {
  IonContent,
  IonInput,
  IonSelect,
  IonSelectOption,
  IonRadioGroup,
  IonRadio,
  IonButton,
  IonIcon,
  IonSpinner,
  ToastController
} from '@ionic/angular/standalone';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { CartService, CartItem } from '../../services/cart.service';
import { OrderService } from '../../services/order.service';
import { AuthService } from '../../services/auth.service';
import { REGIONES_Y_COMUNAS } from '../../data/regiones';
import { SHIPPING_COST, PAYMENT_METHODS } from '../../config/shop';

interface PlacedOrder {
  id: number;
  totalAmount: string | number;
  estimatedDeliveryFull?: string;
}

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.page.html',
  styleUrls: ['./checkout.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterLink,
    HeaderComponent,
    FooterComponent,
    IonContent,
    IonInput,
    IonSelect,
    IonSelectOption,
    IonRadioGroup,
    IonRadio,
    IonButton,
    IonIcon,
    IonSpinner
  ]
})
export class CheckoutPage {
  private cartService = inject(CartService);
  private orderService = inject(OrderService);
  private authService = inject(AuthService);
  private toastController = inject(ToastController);

  readonly shippingCost = SHIPPING_COST;
  readonly paymentMethods = PAYMENT_METHODS;
  readonly regiones = Object.keys(REGIONES_Y_COMUNAS);

  cartItems: CartItem[] = [];
  comunas: string[] = [];

  shippingAddress = '';
  selectedRegion = '';
  selectedComuna = '';
  paymentMethod = '';

  loading = true;
  submitting = false;
  placedOrder: PlacedOrder | null = null;

  ionViewWillEnter() {
    this.placedOrder = null;
    this.prefillFromProfile();
    this.loadCart();
  }

  private prefillFromProfile() {
    const user = this.authService.getCurrentUser();
    if (!this.selectedRegion && user?.region && REGIONES_Y_COMUNAS[user.region]) {
      this.selectedRegion = user.region;
      this.comunas = REGIONES_Y_COMUNAS[user.region];
      this.selectedComuna = this.comunas.includes(user.comuna) ? user.comuna : '';
    }
  }

  private loadCart() {
    this.loading = true;
    this.cartService.getUserCart().subscribe({
      next: (response) => {
        this.cartItems = response.cart?.items || [];
        this.loading = false;
      },
      error: (err) => {
        // 404 = el usuario todavía no tiene carrito
        this.cartItems = [];
        this.loading = false;
        if (err.status !== 404) {
          this.presentToast('Error al cargar el carrito', 'danger');
        }
      }
    });
  }

  onRegionChange(event: any) {
    this.selectedRegion = event.detail.value as string;
    this.comunas = REGIONES_Y_COMUNAS[this.selectedRegion] || [];
    this.selectedComuna = '';
  }

  getSubtotal(): number {
    return this.cartItems.reduce((total, item) => total + Number(item.product?.price || 0) * item.quantity, 0);
  }

  getTotal(): number {
    return this.getSubtotal() + this.shippingCost;
  }

  async placeOrder() {
    if (this.submitting) return;

    if (this.shippingAddress.trim().length < 5) {
      await this.presentToast('Ingresa una dirección de envío válida', 'danger');
      return;
    }

    if (!this.selectedRegion || !this.selectedComuna) {
      await this.presentToast('Selecciona región y comuna', 'danger');
      return;
    }

    if (!this.paymentMethod) {
      await this.presentToast('Selecciona un método de pago', 'danger');
      return;
    }

    this.submitting = true;

    this.orderService.createOrder({
      shippingAddress: this.shippingAddress.trim(),
      shippingRegion: this.selectedRegion,
      shippingComuna: this.selectedComuna,
      paymentMethod: this.paymentMethod
    }).subscribe({
      next: (response) => {
        this.placedOrder = response.order;
        this.cartItems = [];
        this.shippingAddress = '';
        this.paymentMethod = '';
        this.submitting = false;
        this.cartService.loadUserCart();
      },
      error: async (err) => {
        this.submitting = false;
        await this.presentToast(err.error?.message || 'No se pudo crear el pedido', 'danger');
        // El stock o los productos pudieron cambiar: se recarga el carrito para reflejarlo
        if (err.status === 400 || err.status === 409) {
          this.loadCart();
        }
      }
    });
  }

  private async presentToast(message: string, color: 'success' | 'danger' = 'success'): Promise<void> {
    const toast = await this.toastController.create({
      message,
      duration: 3000,
      position: 'top',
      color,
      cssClass: 'custom-toast'
    });
    await toast.present();
  }
}
