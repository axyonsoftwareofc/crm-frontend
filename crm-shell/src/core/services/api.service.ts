// core/services/api.service.ts
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private readonly API_URL = 'http://localhost:8080/api';

  constructor(private http: HttpClient) {}

  /**
   * GET request
   * @param endpoint - Endpoint sem a barra inicial (ex: 'empresas', 'clientes/1')
   * @param params - Query parameters opcionais
   */
  get<T>(endpoint: string, params?: any): Observable<T> {
    let httpParams = new HttpParams();

    if (params) {
      Object.keys(params).forEach(key => {
        if (params[key] !== null && params[key] !== undefined) {
          httpParams = httpParams.set(key, params[key].toString());
        }
      });
    }

    return this.http.get<T>(`${this.API_URL}/${endpoint}`, { params: httpParams });
  }

  /**
   * POST request
   * @param endpoint - Endpoint sem a barra inicial
   * @param data - Dados a serem enviados
   */
  post<T>(endpoint: string, data: any): Observable<T> {
    return this.http.post<T>(`${this.API_URL}/${endpoint}`, data);
  }

  /**
   * PUT request
   * @param endpoint - Endpoint sem a barra inicial
   * @param data - Dados a serem atualizados
   */
  put<T>(endpoint: string, data: any): Observable<T> {
    return this.http.put<T>(`${this.API_URL}/${endpoint}`, data);
  }

  /**
   * DELETE request
   * @param endpoint - Endpoint sem a barra inicial
   */
  delete<T>(endpoint: string): Observable<T> {
    return this.http.delete<T>(`${this.API_URL}/${endpoint}`);
  }

  /**
   * PATCH request
   * @param endpoint - Endpoint sem a barra inicial
   * @param data - Dados parciais a serem atualizados
   */
  patch<T>(endpoint: string, data: any): Observable<T> {
    return this.http.patch<T>(`${this.API_URL}/${endpoint}`, data);
  }
}
