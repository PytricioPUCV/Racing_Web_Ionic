import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonGrid, IonRow, IonCol, IonLabel, IonButton, IonAccordionGroup, IonAccordion, IonItem } from '@ionic/angular/standalone';
import { HeaderComponent } from '../../components/header/header.component';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.page.html',
  styleUrls: ['./product-detail.page.scss'],
  standalone: true,
  imports: [CommonModule, HeaderComponent, IonContent, IonHeader, IonTitle, IonToolbar, IonGrid, IonRow, IonCol, IonLabel, IonButton, IonAccordionGroup, IonAccordion, IonItem]
})
export class ProductDetailPage implements OnInit {
  
  allProducts = [
    { id: 1, name: 'Ferrari Black Racing Jacket', price: 60000, originalPrice: 80000, image: 'assets/product1.jpg', brand: 'RACING CLOTHES', description: 'Chaqueta acolchada de algodón macerizado. Logos y detalles 100% bordados.' },
    { id: 2, name: 'Jack Daniels Racing Jacket', price: 60000, originalPrice: 80000, image: 'assets/product2.jpg', brand: 'RACING CLOTHES', description: 'Chaqueta estilo Jack Daniels. Logos y detalles 100% bordados.' },
    { id: 3, name: 'Ford Racing Jacket', price: 60000, originalPrice: 80000, image: 'assets/product3.jpg', brand: 'RACING CLOTHES', description: 'Chaqueta Ford Racing. Logos y detalles 100% bordados.' },
    { id: 4, name: 'Red Bull Racing Jacket', price: 60000, originalPrice: 80000, image: 'assets/product4.jpg', brand: 'RACING CLOTHES', description: 'Chaqueta Red Bull Racing. Logos y detalles 100% bordados.' },
    { id: 5, name: 'Ferrari Cuero Racing Jacket', price: 80000, originalPrice: 100000, image: 'assets/product5.jpg', brand: 'RACING CLOTHES', description: 'Chaqueta de cuero Ferrari. Logos y detalles 100% bordados.' },
    { id: 6, name: 'Porsche Racing Jacket', price: 60000, originalPrice: 80000, image: 'assets/product6.jpg', brand: 'RACING CLOTHES', description: 'Chaqueta Porsche Racing. Logos y detalles 100% bordados.' },
    { id: 7, name: 'Ferrari White Racing Jacket', price: 60000, originalPrice: 80000, image: 'assets/product7.jpg', brand: 'RACING CLOTHES', description: 'Chaqueta Ferrari color blanco. Logos y detalles 100% bordados.' },
    { id: 8, name: 'Subaru Racing Jacket', price: 60000, originalPrice: 80000, image: 'assets/product8.jpg', brand: 'RACING CLOTHES', description: 'Chaqueta Subaru World Rally Team. Logos y detalles 100% bordados.' }
  ];
  
  product: any;

  selectedSize: string = 'L';
  quantity: number = 1;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    const productId = this.route.snapshot.paramMap.get('id');
    if (productId) {
      this.product = this.allProducts.find(p => p.id === +productId);
    } else {
      console.error('No se encontró un ID de producto en la URL');
    }
  }

  selectSize(size: string) {
    this.selectedSize = size;
  }

  changeQuantity(amount: number) {
    const newQuantity = this.quantity + amount;
    if (newQuantity >= 1 && newQuantity <= 10) {
      this.quantity = newQuantity;
    }
  }
}