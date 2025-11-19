import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';

export interface CartItem {
  id?: number;
  cartId: number;
  productId: number;
  quantity: number;
  size: string;
  product?: any;
}

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private apiUrl = 'http://localhost:3000/api/carts';
  private itemsApiUrl = 'http://localhost:3000/api/cart-items';

 // Estado reactivo del carrito
private cartItemsSubject = new BehaviorSubject<CartItem[]>([]);
private cartItemCountSubject = new BehaviorSubject<number>(0);

// ✅ Observables públicos para suscripciones
public cartItems$ = this.cartItemsSubject.asObservable();
public cartItemCount$ = this.cartItemCountSubject.asObservable();

  constructor(private http: HttpClient) {
    this.loadUserCart();
  }

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
  }
    loadUserCart(): void {
  this.getUserCart().subscribe({
    next: (response) => {
      // ✅ Acceder a response.cart.items (según tu estructura de backend)
      const items = response.cart?.items || [];
      console.log('📦 Items cargados desde backend:', items);
      this.cartItemsSubject.next(items);
      this.cartItemCountSubject.next(items.length);
    },
    error: (err) => {
      console.error('Error loading cart:', err);
    }
  });
}

//funciones CRUD para el carrito
  createCart(): Observable<any> {
    return this.http.post(this.apiUrl, {}, { headers: this.getHeaders() });
  }

  getUserCart(): Observable<any> {
    return this.http.get(`${this.apiUrl}/user`, { headers: this.getHeaders() });
  }

  addCartItem(item: CartItem): Observable<any> {
    return this.http.post(this.itemsApiUrl, item, { headers: this.getHeaders() });
  }

  updateCartItem(id: number, quantity: number): Observable<any> {
    return this.http.put(`${this.itemsApiUrl}/${id}`, { quantity }, { headers: this.getHeaders() });
  }

  removeCartItem(id: number): Observable<any> {
    return this.http.delete(`${this.itemsApiUrl}/${id}`, { headers: this.getHeaders() });
  }

  clearCart(cartId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${cartId}`, { headers: this.getHeaders() });
  }
}
