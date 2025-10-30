import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Order {
  id?: number;
  totalAmount: number;
  shippingAddress: string;
  shippingRegion: string;
  shippingComuna: string;
  paymentMethod: string;
  status?: string;
}

export interface OrderItem {
  orderId: number;
  productId: number;
  quantity: number;
  price: number;
  size: string;
}

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private apiUrl = 'http://localhost:3000/api/orders';
  private itemsApiUrl = 'http://localhost:3000/api/order-items';

  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
  }

  createOrder(order: Order): Observable<any> {
    return this.http.post(this.apiUrl, order, { headers: this.getHeaders() });
  }

  getUserOrders(): Observable<any> {
    return this.http.get(this.apiUrl, { headers: this.getHeaders() });
  }

  getOrderById(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`, { headers: this.getHeaders() });
  }

  updateOrderStatus(id: number, status: string): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, { status }, { headers: this.getHeaders() });
  }

  addOrderItem(item: OrderItem): Observable<any> {
    return this.http.post(this.itemsApiUrl, item, { headers: this.getHeaders() });
  }
}
