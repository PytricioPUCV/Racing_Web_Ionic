import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonGrid, IonRow, IonCol, IonLabel, IonButton, IonAccordionGroup, IonAccordion, IonItem } from '@ionic/angular/standalone';
import { HeaderComponent } from '../../components/header/header.component';
import { ProductService } from '../../services/product';
// 1. IMPORTA EL FOOTERCOMPONENT AQUÍ
import { FooterComponent } from '../../components/footer/footer.component';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.page.html',
  styleUrls: ['./product-detail.page.scss'],
  standalone: true,
  // 2. AÑADE EL FOOTERCOMPONENT A LA LISTA DE IMPORTS
  imports: [CommonModule, HeaderComponent, FooterComponent, IonContent, IonHeader, IonTitle, IonToolbar, IonGrid, IonRow, IonCol, IonLabel, IonButton, IonAccordionGroup, IonAccordion, IonItem]
})
export class ProductDetailPage implements OnInit {
  product: any;
  selectedSize: string = 'L';
  quantity: number = 1;

  constructor(private route: ActivatedRoute, private productService: ProductService) { }

  ngOnInit() {
    const productId = this.route.snapshot.paramMap.get('id');
    if (productId) {
      this.product = this.productService.getProductById(+productId);
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