import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { DemoModeService } from './demo-mode.service';

export interface Product {
  id?: number;
  name: string;
  description?: string;
  price: number;
  originalPrice?: number;
  categoryId?: number;
  imageUrl?: string;
  image?: string;
  stock?: number;
  size?: string;
  brand?: string;
  color?: string;
  isActive?: boolean;
  type?: string;
  category?: {
    id: number;
    name: string;
  };
  createdAt?: string;
  updatedAt?: string;
  createdAtLocal?: string;
  updatedAtLocal?: string;
}

const JACKETS = { id: 1, name: 'Chaquetas' };
const ACCESSORIES = { id: 2, name: 'Accesorios' };

// Mismos productos que crea el seed del backend (backend_rw/src/seed.ts)
const jacket = (id: number, name: string, price: number, originalPrice: number): Product => ({
  id, name, price, originalPrice,
  image: `assets/product${id}.jpg`,
  type: 'chaqueta',
  categoryId: JACKETS.id,
  category: JACKETS,
  description: `Chaqueta oficial de carreras ${name}`,
  brand: name.split(' ')[0],
  size: 'L',
  stock: 10,
  isActive: true
});

const accessory = (id: number, name: string, price: number, originalPrice: number): Product => ({
  id, name, price, originalPrice,
  image: `assets/acc${id - 8}.jpg`,
  type: 'accesorio',
  categoryId: ACCESSORIES.id,
  category: ACCESSORIES,
  description: `${name} - Accesorio oficial de carreras`,
  brand: name.includes('F1') ? 'F1' : name.split(' ')[0],
  size: 'Único',
  stock: 15,
  isActive: true
});

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private http = inject(HttpClient);
  private demoMode = inject(DemoModeService);
  private apiUrl = `${environment.apiUrl}/products`;
  private useBackend = true;

  private allProducts: Product[] = [
    jacket(1, 'Ferrari Black Racing Jacket', 60000, 80000),
    jacket(2, 'Jack Daniels Racing Jacket', 60000, 80000),
    jacket(3, 'Ford Racing Jacket', 60000, 80000),
    jacket(4, 'Red Bull Racing Jacket', 60000, 80000),
    jacket(5, 'Ferrari Cuero Racing Jacket', 80000, 100000),
    jacket(6, 'Porsche Racing Jacket', 60000, 80000),
    jacket(7, 'Ferrari White Racing Jacket', 60000, 80000),
    jacket(8, 'Subaru Racing Jacket', 60000, 80000),

    accessory(9, 'Gorra F1 Racing Black', 25000, 30000),
    accessory(10, 'Guantes F1 Racing', 35000, 45000),
    accessory(11, 'Llavero Pistón Metálico', 15000, 20000),
    accessory(12, 'Mochila Red Bull Team', 55000, 70000),
    accessory(13, 'Calcetines Checkered Flag', 12000, 15000),
    accessory(14, 'Cinturón de Seguridad F1', 28000, 35000),
    accessory(15, 'Tazón F1', 18000, 22000),
    accessory(16, 'Gafas de Sol Aviador', 40000, 50000),
  ];

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
  }

  getProductById(id: number): Product | undefined {
    return this.allProducts.find(p => p.id === id);
  }

  // Catálogo desde la API. Solo si no hay backend (modo demo) se usan los productos locales;
  // cualquier otro error se propaga para que la página lo muestre.
  getCatalog(): Observable<Product[]> {
    return this.http.get<{ products: Product[] }>(this.apiUrl).pipe(
      map(response => response.products.filter(p => p.isActive !== false)),
      catchError(error => this.demoMode.reportError(error) ? of(this.allProducts) : throwError(() => error))
    );
  }

  getProductByIdFromAPI(id: number): Observable<Product> {
    return this.http.get<{ product: Product }>(`${this.apiUrl}/${id}`).pipe(
      map(response => response.product),
      catchError(error => {
        const demoProduct = this.demoMode.reportError(error) ? this.getProductById(id) : undefined;
        return demoProduct ? of(demoProduct) : throwError(() => error);
      })
    );
  }

  createProduct(product: Product): Observable<any> {
    return this.http.post(this.apiUrl, product, { headers: this.getHeaders() });
  }

  updateProduct(id: number, product: Partial<Product>): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, product, { headers: this.getHeaders() });
  }

  deleteProduct(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`, { headers: this.getHeaders() });
  }

  isUsingBackend(): boolean {
    return this.useBackend;
  }
}
