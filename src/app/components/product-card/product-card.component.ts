import { Component, Input } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { IonImg } from '@ionic/angular/standalone';
import { Product } from '../../services/product';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [CurrencyPipe, RouterLink, IonImg],
  template: `
    <a class="product-card" [routerLink]="['/product', product.id]">
      <div class="product-card__media">
        <ion-img [src]="product.image || product.imageUrl" [alt]="product.name"></ion-img>
        @if (product.stock === 0) {
          <span class="product-card__tag">Agotado</span>
        }
      </div>
      <h3 class="product-card__name">{{ product.name }}</h3>
      <p class="product-card__price tabular">
        {{ product.price | currency:'CLP':'symbol-narrow' }}
        @if (product.originalPrice) {
          <s>{{ product.originalPrice | currency:'CLP':'symbol-narrow' }}</s>
        }
      </p>
    </a>
  `,
  styles: [`
    .product-card {
      display: block;
      color: var(--rce-ink);
      border-radius: 6px;
    }

    .product-card__media {
      position: relative;
      aspect-ratio: 4 / 5;
      border-radius: 6px;
      overflow: hidden;
      background: var(--rce-line);
    }

    ion-img {
      width: 100%;
      height: 100%;
    }

    ion-img::part(image) {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 400ms ease;
    }

    .product-card:hover ion-img::part(image) {
      transform: scale(1.03);
    }

    .product-card__tag {
      position: absolute;
      left: 10px;
      top: 10px;
      padding: 4px 8px;
      border-radius: 2px;
      background: var(--rce-yellow);
      color: var(--rce-navy);
      font-size: 0.8125rem;
      font-weight: 700;
    }

    .product-card__name {
      margin-top: 12px;
      font-size: 0.9375rem;
      font-weight: 600;
      line-height: 1.3;
    }

    .product-card:hover .product-card__name {
      text-decoration: underline;
      text-underline-offset: 3px;
    }

    .product-card__price {
      margin-top: 4px;
      font-stretch: 112%;
      font-weight: 700;
    }

    s {
      margin-left: 6px;
      color: var(--rce-ink-soft);
      font-weight: 400;
    }
  `]
})
export class ProductCardComponent {
  @Input({ required: true }) product!: Product;
}
