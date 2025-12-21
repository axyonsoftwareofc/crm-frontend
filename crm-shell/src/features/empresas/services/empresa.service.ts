// src/features/empresas/services/empresa.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Empresa, EmpresaContato, PageResponse } from '../../../core/models/empresa.model';
import { ApiService } from '../../../core/services/api.service';

@Injectable({
  providedIn: 'root'
})
export class EmpresaService {
  private endpoint = 'empresas';

  constructor(
    private api: ApiService,
    private http: HttpClient
  ) {}

  listar(
    page: number = 0,
    size: number = 10,
    sort: string = 'razaoSocial',
    search?: string
  ): Observable<PageResponse<Empresa>> {
    let params: any = {
      page: page.toString(),
      size: size.toString(),
      sort: sort
    };

    if (search) {
      params.search = search;
    }

    return this.api.get<PageResponse<Empresa>>(this.endpoint, params);
  }

  buscar(id: number): Observable<Empresa> {
    return this.api.get<Empresa>(`${this.endpoint}/${id}`);
  }

  criar(empresa: Partial<Empresa>): Observable<Empresa> {
    return this.api.post<Empresa>(this.endpoint, empresa);
  }

  atualizar(id: number, empresa: Partial<Empresa>): Observable<Empresa> {
    return this.http.put<Empresa>(`http://localhost:8080/api/${this.endpoint}/${id}`, empresa);
  }

  remover(id: number): Observable<void> {
    return this.http.delete<void>(`http://localhost:8080/api/${this.endpoint}/${id}`);
  }

  // Contatos
  listarContatos(empresaId: number): Observable<EmpresaContato[]> {
    return this.api.get<EmpresaContato[]>(`${this.endpoint}/${empresaId}/contatos`);
  }

  adicionarContato(empresaId: number, contato: Partial<EmpresaContato>): Observable<EmpresaContato> {
    return this.api.post<EmpresaContato>(`${this.endpoint}/${empresaId}/contatos`, contato);
  }

  removerContato(contatoId: number, empresaId: number): Observable<void> {
    return this.http.delete<void>(`http://localhost:8080/api/${this.endpoint}/${empresaId}/contatos/${contatoId}`);
  }

  getEmpresasSimples(): Observable<Empresa[]> {
    return this.api.get<Empresa[]>(this.endpoint);
  }

  // Stats simulados via backend depois, por enquanto calcula do lado do cliente
  getStats() {
    return this.listar(0, 1000, 'razaoSocial').pipe(
      map(response => {
        const empresas = response.content;
        const total = empresas.length;
        const ativas = empresas.filter(e => e.status === 'ATIVA').length;
        const pendentes = empresas.filter(e => e.status === 'PENDENTE').length;
        const inativas = empresas.filter(e => e.status === 'INATIVA').length;
        return { total, ativas, pendentes, inativas };
      })
    );
  }
}
