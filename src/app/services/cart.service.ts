import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, from, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { StorageService } from './storage.service';  // ← NUEVO

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

  constructor(
    private http: HttpClient,
    private storageService: StorageService  // ← NUEVO
  ) {}

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
  }

  // ============================================
  // CREAR CARRITO
  // ============================================
  createCart(): Observable<any> {
    return this.http.post(this.apiUrl, {}, { headers: this.getHeaders() });
  }

  // ============================================
  // OBTENER CARRITO CON FALLBACK A STORAGE
  // ============================================
  getUserCart(): Observable<any> {
    return this.http.get(`${this.apiUrl}/user`, { headers: this.getHeaders() })
      .pipe(
        tap(async (cart) => {
          // Guardar en storage local como backup
          await this.storageService.saveCart(cart);
          console.log('✅ Carrito sincronizado con storage local');
        }),
        catchError(async (error) => {
          console.warn('⚠️ Error al obtener carrito del servidor, usando storage local');
          const localCart = await this.storageService.getCart();
          return of(localCart || { items: [] });
        })
      );
  }

  // ============================================
  // AGREGAR ITEM CON SYNC LOCAL
  // ============================================
  addCartItem(item: CartItem): Observable<any> {
    return this.http.post(this.itemsApiUrl, item, { headers: this.getHeaders() })
      .pipe(
        tap(async (response) => {
          // Guardar en storage local
          const cart = await this.storageService.getCart() || { items: [] };
          cart.items = cart.items || [];
          cart.items.push(response);
          await this.storageService.saveCart(cart);
          console.log('💾 Item guardado localmente');
        }),
        catchError((error) => {
          console.error('❌ Error al agregar item, guardando solo localmente');
          // Si falla el servidor, guardar solo local
          return from(this.saveItemLocally(item));
        })
      );
  }

  // Guardar item solo localmente cuando no hay conexión
  private async saveItemLocally(item: CartItem) {
    const cart = await this.storageService.getCart() || { items: [] };
    cart.items = cart.items || [];
    
    // Generar ID temporal
    item.id = Date.now();
    cart.items.push(item);
    
    await this.storageService.saveCart(cart);
    console.log('📦 Item guardado en modo offline');
    
    return { success: true, offline: true, item };
  }

  // ============================================
  // ACTUALIZAR CANTIDAD
  // ============================================
  updateCartItem(id: number, quantity: number): Observable<any> {
    return this.http.put(`${this.itemsApiUrl}/${id}`, { quantity }, { headers: this.getHeaders() })
      .pipe(
        tap(async () => {
          // Actualizar storage local
          const cart = await this.storageService.getCart();
          if (cart && cart.items) {
            const item = cart.items.find((i: any) => i.id === id);
            if (item) {
              item.quantity = quantity;
              await this.storageService.saveCart(cart);
            }
          }
        })
      );
  }

  // ============================================
  // ELIMINAR ITEM
  // ============================================
  removeCartItem(id: number): Observable<any> {
    return this.http.delete(`${this.itemsApiUrl}/${id}`, { headers: this.getHeaders() })
      .pipe(
        tap(async () => {
          // Eliminar de storage local
          const cart = await this.storageService.getCart();
          if (cart && cart.items) {
            cart.items = cart.items.filter((i: any) => i.id !== id);
            await this.storageService.saveCart(cart);
          }
        })
      );
  }

  // ============================================
  // LIMPIAR CARRITO
  // ============================================
  clearCart(cartId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${cartId}`, { headers: this.getHeaders() })
      .pipe(
        tap(async () => {
          // Limpiar storage local
          await this.storageService.clearCart();
          console.log('🧹 Carrito limpiado');
        })
      );
  }

  // ============================================
  // SINCRONIZAR CARRITO LOCAL CON SERVIDOR
  // ============================================
  async syncLocalCartToServer(): Promise<void> {
    const localCart = await this.storageService.getCart();
    
    if (!localCart || !localCart.items || localCart.items.length === 0) {
      console.log('📭 No hay items locales para sincronizar');
      return;
    }

    console.log('🔄 Sincronizando carrito local con servidor...');

    // Intentar enviar cada item local al servidor
    for (const item of localCart.items) {
      try {
        await this.http.post(this.itemsApiUrl, item, { headers: this.getHeaders() }).toPromise();
        console.log(`✅ Item ${item.id} sincronizado`);
      } catch (error) {
        console.error(`❌ Error al sincronizar item ${item.id}`, error);
      }
    }

    // Limpiar carrito local después de sincronizar
    await this.storageService.clearCart();
    console.log('✨ Sincronización completada');
  }
}
