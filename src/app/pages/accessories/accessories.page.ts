import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { IonContent, IonGrid, IonRow, IonCol, IonCard } from '@ionic/angular/standalone';
import { HeaderComponent } from '../../components/header/header.component';
import { ProductService } from '../../services/product';
import { FooterComponent } from '../../components/footer/footer.component'; // <-- 1. IMPORTA AQUÍ

@Component({
  selector: 'app-accessories',
  templateUrl: './accessories.page.html',
  styleUrls: ['./accessories.page.scss'],
  standalone: true,
  imports: [CommonModule, RouterModule, HeaderComponent, FooterComponent, IonContent, IonGrid, IonRow, IonCol, IonCard] // <-- 2. AÑADE AQUÍ
})
export class AccessoriesPage implements OnInit {
  accessories: any[] = [];

  constructor(private productService: ProductService) { }

  ngOnInit() {
    this.accessories = this.productService.getAccessories();
  }
}