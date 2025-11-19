import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import {
  IonContent,
  IonCard,
  IonCardHeader,
  IonCardContent,
  IonButton,
  IonIcon,
  AlertController,
  ToastController
} from '@ionic/angular/standalone';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { CartService, CartItem } from '../../services/cart.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopcart',
  templateUrl: './shopcart.html',
  styleUrls: ['./shopcart.scss'],
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    HeaderComponent,
    FooterComponent,
    IonContent,
    IonCard,
    IonCardHeader,
    IonCardContent,
    IonButton,
    IonIcon
  ]
})
export class ShopcartPage implements OnInit {
  @ViewChild(IonContent) content!: IonContent;

  cartItems: CartItem[] = [];
  shippingCost: number = 5000;
  private cartSubscription?: Subscription;

  constructor(
    private router: Router,
    private alertController: AlertController,
    private toastController: ToastController,
    private cartService: CartService
  ) {}

  ngOnInit() {
    this.loadCart();
  }

  ionViewWillEnter() {
    this.scrollToTop();
    // Recargar carrito cada vez que se entra a la página
    this.cartService.loadUserCart();
  }

  ionViewDidEnter() {
    this.scrollToTop();
  }

  ngOnDestroy() {
    // Limpiar suscripción al destruir componente
    if (this.cartSubscription) {
      this.cartSubscription.unsubscribe();
    }
  }

  scrollToTop() {
    setTimeout(() => {
      if (this.content) {
        this.content.scrollToTop(0);
      }
    }, 100);
  }

  loadCart() {
    // Suscribirse al observable del carrito
    this.cartSubscription = this.cartService.cartItems$.subscribe({
      next: (items) => {
        this.cartItems = items;
        console.log('🛒 Carrito actualizado:', items);
      },
      error: (err) => {
        console.error('❌ Error cargando carrito:', err);
        this.presentToast('Error al cargar el carrito', 'danger');
      }
    });

    // Cargar carrito desde el backend
    this.cartService.loadUserCart();
  }

  increaseQuantity(index: number) {
    const item = this.cartItems[index];
    if (!item.id) return;

    const newQuantity = item.quantity + 1;

    this.cartService.updateCartItem(item.id, newQuantity).subscribe({
      next: () => {
        console.log('✅ Cantidad actualizada');
      },
      error: (err) => {
        console.error('❌ Error actualizando cantidad:', err);
        this.presentToast('Error al actualizar cantidad', 'danger');
      }
    });
  }

  decreaseQuantity(index: number) {
    const item = this.cartItems[index];
    if (!item.id || item.quantity <= 1) return;

    const newQuantity = item.quantity - 1;

    this.cartService.updateCartItem(item.id, newQuantity).subscribe({
      next: () => {
        console.log('✅ Cantidad actualizada');
      },
      error: (err) => {
        console.error('❌ Error actualizando cantidad:', err);
        this.presentToast('Error al actualizar cantidad', 'danger');
      }
    });
  }

  async removeItem(index: number) {
    const item = this.cartItems[index];
    if (!item.id) return;

    const alert = await this.alertController.create({
      header: 'Eliminar producto',
      message: '¿Estás seguro de que deseas eliminar este producto del carrito?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Eliminar',
          role: 'destructive',
          handler: () => {
            this.cartService.removeCartItem(item.id!).subscribe({
              next: async () => {
                await this.presentToast('Producto eliminado del carrito', 'success');
                this.cartService.loadUserCart();

              },
              error: async (err) => {
                console.error('❌ Error eliminando item:', err);
                await this.presentToast('Error al eliminar producto', 'danger');
              }
            });
          }
        }
      ]
    });

    await alert.present();
  }

  getTotalItems(): number {
    return this.cartItems.reduce((total, item) => total + item.quantity, 0);
  }

  getSubtotal(): number {
    return this.cartItems.reduce((total, item) => {
      const price = item.product?.price || 0;
      return total + (price * item.quantity);
    }, 0);
  }

  getTotal(): number {
    return this.getSubtotal() + this.shippingCost;
  }

  async checkout() {
    if (this.cartItems.length === 0) {
      const alert = await this.alertController.create({
        header: 'Carrito vacío',
        message: 'Agrega productos antes de finalizar la compra',
        buttons: ['OK']
      });
      await alert.present();
      return;
    }

    // TODO: Navegar a checkout
    this.router.navigate(['/checkout']);
  }

  continueShopping() {
    this.router.navigate(['/home']);
  }

  private async presentToast(message: string, color: 'success' | 'danger' = 'success'): Promise<void> {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      position: 'top',
      color: color,
      cssClass: 'custom-toast'
    });
    await toast.present();
  }
}
