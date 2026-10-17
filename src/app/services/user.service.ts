import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { environment } from '../../environments/environment';

export interface UserProfile {
  id: number;
  username: string;
  email: string;
  rut?: string;
  region?: string;
  comuna?: string;
  role: 'user' | 'admin' | 'guest';
  registrationDate?: string;
  memberSince?: string;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private http = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}/users`;

  getAllUsers(): Observable<UserProfile[]> {
    return this.http.get<{ users: UserProfile[] }>(this.apiUrl).pipe(map(response => response.users));
  }

  getUserById(userId: number): Observable<UserProfile> {
    return this.http.get<{ user: UserProfile }>(`${this.apiUrl}/${userId}`).pipe(map(response => response.user));
  }

  updateUser(userId: number, data: Partial<UserProfile>): Observable<UserProfile> {
    return this.http.put<{ user: UserProfile }>(`${this.apiUrl}/${userId}`, data).pipe(map(response => response.user));
  }

  changePassword(userId: number, currentPassword: string, newPassword: string): Observable<unknown> {
    return this.http.put(`${this.apiUrl}/${userId}/change-password`, { currentPassword, newPassword });
  }

  deleteUser(userId: number): Observable<unknown> {
    return this.http.delete(`${this.apiUrl}/${userId}`);
  }
}
