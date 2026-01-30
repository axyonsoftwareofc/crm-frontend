import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Campanha, PageResponse } from '../../../core/models/campanha.model';
import { map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CampanhaService {
  private apiUrl = 'http://localhost:8080/api/campanhas';

  constructor(private http: HttpClient) {}

  // LISTAR com paginação
  listar(page: number = 0, size: number = 10, search?: string): Observable<PageResponse<Campanha>> {
    let params: any = {
      page: page.toString(),
      size: size.toString()
    };

    if (search) {
      params.search = search;
    }

    return this.http.get<PageResponse<Campanha>>(this.apiUrl, { params });
  }

  // BUSCAR por ID
  buscar(id: number): Observable<Campanha> {
    return this.http.get<Campanha>(`${this.apiUrl}/${id}`);
  }

  // CRIAR nova campanha
  criar(campanha: Campanha): Observable<Campanha> {
    return this.http.post<Campanha>(this.apiUrl, campanha);
  }

  // ATUALIZAR campanha
  atualizar(id: number, campanha: Campanha): Observable<Campanha> {
    return this.http.put<Campanha>(`${this.apiUrl}/${id}`, campanha);
  }

  // REMOVER campanha
  remover(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  // GET STATS
  getStats(): Observable<any> {
    // Se tiver endpoint de stats no backend
    // return this.http.get(`${this.apiUrl}/stats`);

    // Por enquanto, calcula da lista
    return this.http.get<PageResponse<Campanha>>(this.apiUrl, { params: { page: '0', size: '1000' } })
      .pipe(
        map(response => {
          const campanhas = response.content;
          const total = campanhas.length;
          const emAndamento = campanhas.filter(c => c.status === 'EM_ANDAMENTO').length;
          const agendadas = campanhas.filter(c => c.status === 'AGENDADA').length;
          const concluidas = campanhas.filter(c => c.status === 'CONCLUIDA').length;
          const orcamentoTotal = campanhas.reduce((sum, c) => sum + (c.orcamento || 0), 0);

          return { total, emAndamento, agendadas, concluidas, orcamentoTotal };
        }),
        catchError(error => {
          console.error('Erro ao carregar stats:', error);
          return of({
            total: 0,
            emAndamento: 0,
            agendadas: 0,
            concluidas: 0,
            orcamentoTotal: 0
          });
        })
      );
  }
}
