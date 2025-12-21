// src/core/models/tarefa.model.ts
export interface Tarefa {
  id: number;
  titulo: string;
  descricao: string;
  status: string; // "A_FAZER" | "EM_ANDAMENTO" | "CONCLUIDA"
  sprintId: number;
  responsavelId: number;
  responsavelNome: string;
  criadoEm: string; // ISO 8601
  atualizadoEm: string;
}

export interface TarefaRequest {
  titulo: string;
  descricao?: string;
  status: string;
  responsavelId: number;
}
