// src/core/models/empresa.model.ts
export interface Empresa {
  id?: number;
  razaoSocial: string;
  nomeFantasia: string;
  cnpj: string;
  setor?: string;
  logradouro?: string;
  numero?: string;
  complemento?: string;
  bairro?: string;
  cidade?: string;
  uf?: string;
  cep?: string;
  status?: string;
  observacao?: string;
  criadoEm?: Date;
  atualizadoEm?: Date;
}

export interface EmpresaContato {
  id?: number;
  empresaId?: number;
  nome: string;
  cargo?: string;
  email?: string;
  telefone?: string;
  criadoEm?: Date;
  atualizadoEm?: Date;
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
