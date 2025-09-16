import { Component } from '@angular/core';
import { IonContent, IonGrid, IonRow, IonCol, IonCard, IonButton } from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../components/header/header.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  standalone: true,
  imports: [CommonModule, HeaderComponent, RouterModule, IonContent, IonGrid, IonRow, IonCol, IonCard, IonButton],
})
export class Tab1Page {

  products = [
    { id: 1, name: 'Ferrari Black Racing Jacket', price: 60000, originalPrice: 80000, image: 'assets/product1.jpg', discount: '20% OFF' },
    { id: 2, name: 'Jack Daniels Racing Jacket', price: 60000, originalPrice: 80000, image: 'assets/product2.jpg', discount: '20% OFF' },
    { id: 3, name: 'Ford Racing Jacket', price: 60000, originalPrice: 80000, image: 'assets/product3.jpg', discount: '20% OFF' },
    { id: 4, name: 'Red Bull Racing Jacket', price: 60000, originalPrice: 80000, image: 'assets/product4.jpg', discount: '20% OFF' },
    { id: 5, name: 'Ferrari Cuero Racing Jacket', price: 80000, originalPrice: 100000, image: 'assets/product5.jpg', discount: '20% OFF' },
    { id: 6, name: 'Porsche Racing Jacket', price: 60000, originalPrice: 80000, image: 'assets/product6.jpg', discount: '20% OFF' },
    { id: 7, name: 'Ferrari White Racing Jacket', price: 60000, originalPrice: 80000, image: 'assets/product7.jpg', discount: '20% OFF' },
    { id: 8, name: 'Subaru Racing Jacket', price: 60000, originalPrice: 80000, image: 'assets/product8.jpg', discount: '20% OFF' }
  ];

  constructor() {}

}