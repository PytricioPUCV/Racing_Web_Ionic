import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private _storage: Storage | null = null;

  constructor(private storage: Storage) {
    this.init();
  }

  async init() {
    const storage = await this.storage.create();
    this._storage = storage;
  }

  // ============================================
  // CARRITO OFFLINE
  // ============================================
  async saveCart(cart: any) {
    await this._storage?.set('cart', cart);
    console.log('💾 Carrito guardado localmente');
  }

  async getCart() {
    const cart = await this._storage?.get('cart');
    console.log('📦 Carrito recuperado:', cart);
    return cart;
  }

  async clearCart() {
    await this._storage?.remove('cart');
    console.log('🗑️ Carrito limpiado');
  }

  // ============================================
  // FAVORITOS
  // ============================================
  async saveFavorites(favorites: any[]) {
    await this._storage?.set('favorites', favorites);
  }

  async getFavorites() {
    return await this._storage?.get('favorites') || [];
  }

  async addFavorite(product: any) {
    const favorites = await this.getFavorites();
    if (!favorites.find((p: any) => p.id === product.id)) {
      favorites.push(product);
      await this.saveFavorites(favorites);
    }
  }

  async removeFavorite(productId: number) {
    const favorites = await this.getFavorites();
    const filtered = favorites.filter((p: any) => p.id !== productId);
    await this.saveFavorites(filtered);
  }

  // ============================================
  // HISTORIAL DE BÚSQUEDA
  // ============================================
  async saveSearchHistory(query: string) {
    const history = await this.getSearchHistory();
    if (!history.includes(query)) {
      history.unshift(query);
      await this._storage?.set('searchHistory', history.slice(0, 10)); // Max 10
    }
  }

  async getSearchHistory() {
    return await this._storage?.get('searchHistory') || [];
  }

  async clearSearchHistory() {
    await this._storage?.remove('searchHistory');
  }

  // ============================================
  // USUARIO (TOKEN, ETC)
  // ============================================
  async saveUser(user: any) {
    await this._storage?.set('user', user);
  }

  async getUser() {
    return await this._storage?.get('user');
  }

  async removeUser() {
    await this._storage?.remove('user');
  }

  // ============================================
  // LIMPIAR TODO
  // ============================================
  async clearAll() {
    await this._storage?.clear();
    console.log('🧹 Storage limpiado completamente');
  }
}
