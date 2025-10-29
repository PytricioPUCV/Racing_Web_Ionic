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
  AlertController
} from '@ionic/angular/standalone';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';

interface CartItem {
  id: number;
  name: string;
  image: string;
  size: string;
  price: number;
  quantity: number;
}

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

  constructor(
    private router: Router,
    private alertController: AlertController
  ) {}

  ngOnInit() {
    this.loadCart();
  }

  ionViewWillEnter() {
    this.scrollToTop();
  }

  ionViewDidEnter() {
    this.scrollToTop();
  }

  scrollToTop() {
    setTimeout(() => {
      if (this.content) {
        this.content.scrollToTop(0);
      }
    }, 100);
  }

  loadCart() {
    // Datos de ejemplo
    this.cartItems = [
      {
        id: 1,
        name: 'Ferrari Black Racing Jacket',
        image: 'assets/product1.jpg',
        size: 'L',
        price: 60000,
        quantity: 1
      },
      {
        id: 2,
        name: 'Ford Racing Jacket',
        image: 'assets/product3.jpg',
        size: 'M',
        price: 60000,
        quantity: 2
      }
    ];
  }

  increaseQuantity(index: number) {
    this.cartItems[index].quantity++;
    this.saveCart();
  }

  decreaseQuantity(index: number) {
    if (this.cartItems[index].quantity > 1) {
      this.cartItems[index].quantity--;
      this.saveCart();
    }
  }

  async removeItem(index: number) {
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
            this.cartItems.splice(index, 1);
            this.saveCart();
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
    return this.cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  }

  getTotal(): number {
    return this.getSubtotal() + this.shippingCost;
  }

  saveCart() {
    // TODO: Guardar en localStorage o servicio
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
    window.location.href = '/home';
  }
}
