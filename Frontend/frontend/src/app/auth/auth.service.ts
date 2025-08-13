import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/auth';
  private tokenKey = 'token';

  constructor(private http: HttpClient) {}

  login(username: string, password: string) {
    return this.http.post<{ token: string, expiresIn: number }>(`${this.apiUrl}/login`, { username, password })
      .pipe(
        tap(res => {
          localStorage.setItem(this.tokenKey, res.token);
        })
      );
  }

    register(username: string, password: string, email: string) {
    return this.http.post<{ token: string, expiresIn: number }>(`${this.apiUrl}/register`, { username, password, email })
      .pipe(
        tap(res => {
          localStorage.setItem(this.tokenKey, res.token);
        })
      );
  }
  getToken() {
    return localStorage.getItem(this.tokenKey);
  }

  logout() {
    localStorage.removeItem(this.tokenKey);
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }
}
