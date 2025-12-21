// src/core/models/campanha.model.ts
export interface Campanha {
  id?: number;
  nome: string;
  descricao?: string;
  tipo: 'EMAIL' | 'SOCIAL_MEDIA' | 'ADS' | 'OUTROS';
  status: 'RASCUNHO' | 'AGENDADA' | 'EM_ANDAMENTO' | 'CONCLUIDA' | 'CANCELADA';
  empresaId: number;
  empresaNome?: string;
  orcamento?: number;
  dataInicio?: Date;
  dataFim?: Date;
  publicoAlvo?: string;
  metricas?: MetricasCampanha;
  criadoEm?: Date;
  atualizadoEm?: Date;
}

export interface MetricasCampanha {
  alcance?: number;
  engajamento?: number;
  conversoes?: number;
  custoPorConversao?: number;
  roi?: number;
  cliques?: number;
  visualizacoes?: number;
}

export interface PageResponse<T> {
  content: T[];
  pageNumber: number;
  pageSize: number;
  totalElements: number;
  totalPages: number;
  first: boolean;
  last: boolean;
}
