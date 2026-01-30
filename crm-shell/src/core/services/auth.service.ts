// src/core/services/auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Router } from '@angular/router';

interface LoginRequest {
  username: string;
  password: string;
}

interface LoginResponse {
  accessToken: string;
  refreshToken?: string;
  expiresIn?: number;
}

interface Usuario {
  id: number;
  nome: string;
  email: string;
  role: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly API_URL = 'http://localhost:8080/api/auth';
  private readonly TOKEN_KEY = 'access_token';
  private readonly USER_KEY = 'current_user';

  private isAuthenticatedSubject = new BehaviorSubject<boolean>(this.hasValidToken());
  private currentUserSubject = new BehaviorSubject<Usuario | null>(this.getStoredUser());

  isAuthenticated$ = this.isAuthenticatedSubject.asObservable();
  currentUser$ = this.currentUserSubject.asObservable();

  constructor(
    private http: HttpClient,
    private router: Router
  ) {}

  /**
   * Realiza login e armazena o token
   */
  login(credentials: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.API_URL}/login`, credentials)
      .pipe(
        tap(response => {
          this.setToken(response.accessToken);
          this.isAuthenticatedSubject.next(true);

          // Decodifica e armazena dados do usuário do token
          const user = this.decodeUserFromToken(response.accessToken);
          if (user) {
            this.setCurrentUser(user);
          }
        })
      );
  }

  /**
   * Realiza logout e limpa dados de sessão
   */
  logout(): void {
    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem(this.USER_KEY);
    this.isAuthenticatedSubject.next(false);
    this.currentUserSubject.next(null);
    this.router.navigate(['/login']);
  }

  /**
   * Retorna o token armazenado
   */
  getToken(): string | null {
    if (typeof window === 'undefined') {
      return null; // SSR safety
    }
    return localStorage.getItem(this.TOKEN_KEY);
  }

  /**
   * Armazena o token
   */
  setToken(token: string): void {
    localStorage.setItem(this.TOKEN_KEY, token);
  }

  /**
   * Verifica se o usuário está autenticado (sync)
   */
  isLoggedIn(): boolean {
    return this.hasValidToken();
  }

  /**
   * Retorna observable do estado de autenticação
   */
  isLoggedIn$(): Observable<boolean> {
    return this.isAuthenticated$;
  }

  /**
   * Retorna o usuário atual
   */
  getCurrentUser(): Usuario | null {
    return this.currentUserSubject.value;
  }

  /**
   * Verifica se existe um token válido
   */
  private hasValidToken(): boolean {
    const token = this.getToken();

    if (!token) {
      return false;
    }

    return !this.isTokenExpired(token);
  }

  /**
   * Verifica se o token está expirado
   */
  private isTokenExpired(token: string): boolean {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      const expiry = payload.exp;

      if (!expiry) {
        return false;
      }

      const now = Math.floor(Date.now() / 1000);
      return expiry < now;
    } catch (e) {
      return true;
    }
  }

  /**
   * Decodifica dados do usuário do token JWT
   */
  private decodeUserFromToken(token: string): Usuario | null {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return {
        id: payload.sub || payload.userId,
        nome: payload.name || payload.nome || 'Usuário',
        email: payload.email || '',
        role: payload.role || 'USER'
      };
    } catch (e) {
      return null;
    }
  }

  /**
   * Armazena usuário atual
   */
  private setCurrentUser(user: Usuario): void {
    localStorage.setItem(this.USER_KEY, JSON.stringify(user));
    this.currentUserSubject.next(user);
  }

  /**
   * Recupera usuário armazenado
   */
  private getStoredUser(): Usuario | null {
    if (typeof window === 'undefined') {
      return null; // SSR safety
    }

    const userJson = localStorage.getItem(this.USER_KEY);
    if (userJson) {
      try {
        return JSON.parse(userJson);
      } catch {
        return null;
      }
    }
    return null;
  }
}
