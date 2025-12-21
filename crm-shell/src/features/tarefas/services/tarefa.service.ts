// src/features/tarefas/services/tarefa.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PageResponse } from '../../../core/models/page-response.model';
import { Tarefa, TarefaRequest } from '../../../core/models/tarefa.model';

@Injectable({
  providedIn: 'root'
})
export class TarefaService {
  private baseUrl = 'http://localhost:8080/sprints';

  constructor(private http: HttpClient) {}

  listarPorSprint(
    sprintId: number,
    page: number = 0,
    size: number = 10,
    sort: string = 'titulo',
    status?: string,
    responsavelId?: number
  ): Observable<PageResponse<Tarefa>> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString())
      .set('sort', sort);

    if (status) params = params.set('status', status);
    if (responsavelId) params = params.set('responsavelId', responsavelId.toString());

    return this.http.get<PageResponse<Tarefa>>(
      `${this.baseUrl}/${sprintId}/tarefas`,
      { params }
    );
  }

  buscar(sprintId: number, tarefaId: number): Observable<Tarefa> {
    return this.http.get<Tarefa>(
      `${this.baseUrl}/${sprintId}/tarefas/${tarefaId}`
    );
  }

  criar(sprintId: number, tarefa: TarefaRequest): Observable<Tarefa> {
    return this.http.post<Tarefa>(
      `${this.baseUrl}/${sprintId}/tarefas`,
      tarefa
    );
  }

  atualizar(sprintId: number, tarefaId: number, tarefa: Partial<TarefaRequest>): Observable<Tarefa> {
    return this.http.put<Tarefa>(
      `${this.baseUrl}/${sprintId}/tarefas/${tarefaId}`,
      tarefa
    );
  }

  remover(sprintId: number, tarefaId: number): Observable<void> {
    return this.http.delete<void>(
      `${this.baseUrl}/${sprintId}/tarefas/${tarefaId}`
    );
  }
}
