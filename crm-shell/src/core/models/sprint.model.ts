// src/core/models/sprint.model.ts
export interface Sprint {
  id: number;
  nome: string;
  dataInicio: string; // ISO 8601 (ex: "2025-12-20")
  dataFim: string;
  status: string; // "PLANEJADA" | "EM_ANDAMENTO" | "CONCLUIDA"
  projetoId: number;
}

export interface SprintRequest {
  nome: string;
  dataInicio: string;
  dataFim: string;
  status: string;
}
