import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface UserProfile {
  id: number;
  username: string;
  email: string;
  rut?: string;
  region?: string;
  comuna?: string;
  role: 'user' | 'admin';
  isActive?: boolean;
  createdAt?: string;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:3000/api/users';

  // ✅ Obtener todos los usuarios (Admin)
  getAllUsers(): Observable<UserProfile[]> {
    return this.http.get<UserProfile[]>(`${this.apiUrl}/admin/users`);
  }

  // ✅ Obtener usuario por ID (Admin)
  getUserById(userId: number): Observable<UserProfile> {
    return this.http.get<UserProfile>(`${this.apiUrl}/admin/users/${userId}`);
  }

  // ✅ Actualizar usuario (Admin)
  updateUser(userId: number, data: Partial<UserProfile>): Observable<any> {
    return this.http.put(`${this.apiUrl}/admin/users/${userId}`, data);
  }

  // ✅ Eliminar usuario (Admin)
  deleteUser(userId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/admin/users/${userId}`);
  }
}
