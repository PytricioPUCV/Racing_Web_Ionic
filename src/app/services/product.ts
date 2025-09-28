import { Injectable } from '@angular/core'; 

@Injectable({
  providedIn: 'root'
})

export class ProductService {
  private allProducts = [
    { id: 1, name: 'Ferrari Black Racing Jacket', price: 60000, originalPrice: 80000, image: 'assets/product1.jpg', type: 'chaqueta' },
    { id: 2, name: 'Jack Daniels Racing Jacket', price: 60000, originalPrice: 80000, image: 'assets/product2.jpg', type: 'chaqueta' },
    { id: 3, name: 'Ford Racing Jacket', price: 60000, originalPrice: 80000, image: 'assets/product3.jpg', type: 'chaqueta' },
    { id: 4, name: 'Red Bull Racing Jacket', price: 60000, originalPrice: 80000, image: 'assets/product4.jpg', type: 'chaqueta' },
    { id: 5, name: 'Ferrari Cuero Racing Jacket', price: 80000, originalPrice: 100000, image: 'assets/product5.jpg', type: 'chaqueta' },
    { id: 6, name: 'Porsche Racing Jacket', price: 60000, originalPrice: 80000, image: 'assets/product6.jpg', type: 'chaqueta' },
    { id: 7, name: 'Ferrari White Racing Jacket', price: 60000, originalPrice: 80000, image: 'assets/product7.jpg', type: 'chaqueta' },
    { id: 8, name: 'Subaru Racing Jacket', price: 60000, originalPrice: 80000, image: 'assets/product8.jpg', type: 'chaqueta' },

    { id: 9, name: 'Gorra F1 Racing Black', price: 25000, originalPrice: 30000, image: 'assets/acc1.jpg', type: 'accesorio' },
    { id: 10, name: 'Guantes F1 Racing', price: 35000, originalPrice: 45000, image: 'assets/acc2.jpg', type: 'accesorio' },
    { id: 11, name: 'Llavero Pistón Metálico', price: 15000, originalPrice: 20000, image: 'assets/acc3.jpg', type: 'accesorio' },
    { id: 12, name: 'Mochila Red Bull Team', price: 55000, originalPrice: 70000, image: 'assets/acc4.jpg', type: 'accesorio' },
    { id: 13, name: 'Calcetines Checkered Flag', price: 12000, originalPrice: 15000, image: 'assets/acc5.jpg', type: 'accesorio' },
    { id: 14, name: 'Cinturón de Seguridad F1', price: 28000, originalPrice: 35000, image: 'assets/acc6.jpg', type: 'accesorio' },
    { id: 15, name: 'Tazón F1', price: 18000, originalPrice: 22000, image: 'assets/acc7.jpg', type: 'accesorio' },
    { id: 16, name: 'Gafas de Sol Aviador', price: 40000, originalPrice: 50000, image: 'assets/acc8.jpg', type: 'accesorio' },
  ];

  constructor() { }

  getAllProducts() {
    return this.allProducts;
  }

  getAccessories() {
    return this.allProducts.filter(p => p.type === 'accesorio');
  }

  getJackets() {
  return this.allProducts.filter(p => p.type === 'chaqueta');
  }

  getProductById(id: number) {
    return this.allProducts.find(p => p.id === id);
  }
}