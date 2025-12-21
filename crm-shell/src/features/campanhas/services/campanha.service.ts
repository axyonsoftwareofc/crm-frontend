// src/features/campanhas/services/campanha.service.ts
import { Injectable } from '@angular/core';
import { Observable, of, delay } from 'rxjs';
import { Campanha, MetricasCampanha, PageResponse } from '../../../core/models/campanha.model';

@Injectable({
  providedIn: 'root'
})
export class CampanhaService {
  private campanhasMock: Campanha[] = [
    {
      id: 1,
      nome: 'Campanha Verão 2024',
      descricao: 'Promoção de verão para coleção de roupas',
      tipo: 'EMAIL',
      status: 'EM_ANDAMENTO',
      empresaId: 4,
      empresaNome: 'Natural Food',
      orcamento: 5000,
      dataInicio: new Date('2024-01-15'),
      dataFim: new Date('2024-03-15'),
      publicoAlvo: 'Homens e mulheres 25-45 anos',
      metricas: {
        alcance: 12500,
        engajamento: 8.5,
        conversoes: 320,
        custoPorConversao: 15.63,
        roi: 3.2,
        cliques: 1250,
        visualizacoes: 8500
      },
      criadoEm: new Date('2024-01-10')
    },
    {
      id: 2,
      nome: 'Lançamento Novo Produto',
      descricao: 'Campanha para lançamento do novo suplemento',
      tipo: 'SOCIAL_MEDIA',
      status: 'AGENDADA',
      empresaId: 4,
      empresaNome: 'Natural Food',
      orcamento: 3000,
      dataInicio: new Date('2024-02-01'),
      dataFim: new Date('2024-02-28'),
      publicoAlvo: 'Público fitness 18-35 anos',
      metricas: {
        alcance: 0,
        engajamento: 0,
        conversoes: 0,
        custoPorConversao: 0,
        roi: 0
      },
      criadoEm: new Date('2024-01-20')
    },
    {
      id: 3,
      nome: 'Black Friday Tech',
      descricao: 'Ofertas especiais para Black Friday',
      tipo: 'ADS',
      status: 'CONCLUIDA',
      empresaId: 1,
      empresaNome: 'Tech Solutions',
      orcamento: 10000,
      dataInicio: new Date('2023-11-20'),
      dataFim: new Date('2023-11-27'),
      publicoAlvo: 'Profissionais de TI',
      metricas: {
        alcance: 45000,
        engajamento: 12.3,
        conversoes: 890,
        custoPorConversao: 11.24,
        roi: 4.8,
        cliques: 5400,
        visualizacoes: 38000
      },
      criadoEm: new Date('2023-11-10')
    }
  ];

  // LISTAR campanhas com paginação
  listar(page: number = 0, size: number = 10, search?: string): Observable<PageResponse<Campanha>> {
    let campanhasFiltradas = [...this.campanhasMock];

    if (search && search.trim()) {
      const termo = search.toLowerCase();
      campanhasFiltradas = campanhasFiltradas.filter(c =>
        c.nome.toLowerCase().includes(termo) ||
        c.descricao?.toLowerCase().includes(termo) ||
        c.empresaNome?.toLowerCase().includes(termo) ||
        c.tipo.toLowerCase().includes(termo)
      );
    }

    // Ordenar por data mais recente
    campanhasFiltradas.sort((a, b) =>
      new Date(b.criadoEm || 0).getTime() - new Date(a.criadoEm || 0).getTime()
    );

    const start = page * size;
    const end = start + size;
    const paginated = campanhasFiltradas.slice(start, end);

    const response: PageResponse<Campanha> = {
      content: paginated,
      pageNumber: page,
      pageSize: size,
      totalElements: campanhasFiltradas.length,
      totalPages: Math.ceil(campanhasFiltradas.length / size),
      first: page === 0,
      last: end >= campanhasFiltradas.length
    };

    return of(response).pipe(delay(300));
  }

  // BUSCAR por ID
  buscar(id: number): Observable<Campanha> {
    const campanha = this.campanhasMock.find(c => c.id === id);
    if (campanha) {
      return of(campanha).pipe(delay(200));
    }
    throw new Error('Campanha não encontrada');
  }

  // CRIAR nova campanha
  criar(campanha: Campanha): Observable<Campanha> {
    const novaCampanha = {
      ...campanha,
      id: this.campanhasMock.length + 1,
      status: campanha.status || 'RASCUNHO',
      criadoEm: new Date(),
      atualizadoEm: new Date(),
      metricas: campanha.metricas || {
        alcance: 0,
        engajamento: 0,
        conversoes: 0,
        custoPorConversao: 0,
        roi: 0,
        cliques: 0,
        visualizacoes: 0
      }
    };
    this.campanhasMock.push(novaCampanha);
    return of(novaCampanha).pipe(delay(400));
  }

  // ATUALIZAR campanha
  atualizar(id: number, campanha: Campanha): Observable<Campanha> {
    const index = this.campanhasMock.findIndex(c => c.id === id);
    if (index >= 0) {
      this.campanhasMock[index] = {
        ...this.campanhasMock[index],
        ...campanha,
        id,
        atualizadoEm: new Date()
      };
      return of(this.campanhasMock[index]).pipe(delay(400));
    }
    throw new Error('Campanha não encontrada');
  }

  // REMOVER campanha
  remover(id: number): Observable<void> {
    const index = this.campanhasMock.findIndex(c => c.id === id);
    if (index >= 0) {
      this.campanhasMock.splice(index, 1);
      return of(void 0).pipe(delay(300));
    }
    throw new Error('Campanha não encontrada');
  }

  // Métodos auxiliares
  getStats() {
    const total = this.campanhasMock.length;
    const emAndamento = this.campanhasMock.filter(c => c.status === 'EM_ANDAMENTO').length;
    const agendadas = this.campanhasMock.filter(c => c.status === 'AGENDADA').length;
    const concluidas = this.campanhasMock.filter(c => c.status === 'CONCLUIDA').length;
    const orcamentoTotal = this.campanhasMock.reduce((sum, c) => sum + (c.orcamento || 0), 0);

    return { total, emAndamento, agendadas, concluidas, orcamentoTotal };
  }
}
