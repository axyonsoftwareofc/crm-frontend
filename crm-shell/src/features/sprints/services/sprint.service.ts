// src/features/sprints/services/sprint.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PageResponse } from '../../../core/models/page-response.model';
import { Sprint, SprintRequest } from '../../../core/models/sprint.model';

@Injectable({
  providedIn: 'root'
})
export class SprintService {
  private baseUrl = 'http://localhost:8080/projetos';

  constructor(private http: HttpClient) {}

  listarPorProjeto(
    projetoId: number,
    page: number = 0,
    size: number = 10,
    sort: string = 'nome'
  ): Observable<PageResponse<Sprint>> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString())
      .set('sort', sort);

    return this.http.get<PageResponse<Sprint>>(
      `${this.baseUrl}/${projetoId}/sprints`,
      { params }
    );
  }

  buscar(projetoId: number, sprintId: number): Observable<Sprint> {
    return this.http.get<Sprint>(
      `${this.baseUrl}/${projetoId}/sprints/${sprintId}`
    );
  }

  criar(projetoId: number, sprint: SprintRequest): Observable<Sprint> {
    return this.http.post<Sprint>(
      `${this.baseUrl}/${projetoId}/sprints`,
      sprint
    );
  }

  atualizar(projetoId: number, sprintId: number, sprint: Partial<SprintRequest>): Observable<Sprint> {
    return this.http.put<Sprint>(
      `${this.baseUrl}/${projetoId}/sprints/${sprintId}`,
      sprint
    );
  }

  remover(projetoId: number, sprintId: number): Observable<void> {
    return this.http.delete<void>(
      `${this.baseUrl}/${projetoId}/sprints/${sprintId}`
    );
  }
}
