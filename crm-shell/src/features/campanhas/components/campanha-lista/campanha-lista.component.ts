import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatChipsModule } from '@angular/material/chips';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatBadgeModule } from '@angular/material/badge';
import { CampanhaService } from '../../services/campanha.service';
import { Campanha } from '../../../../core/models/campanha.model';

@Component({
  selector: 'app-campanha-lista',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterLink,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    MatChipsModule,
    MatSnackBarModule,
    MatMenuModule,
    MatProgressSpinnerModule,
    MatBadgeModule
  ],
  template: `
    <div>
      <!-- Header -->
      <div class="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h2 class="text-3xl font-bold text-gray-900">Campanhas de Marketing</h2>
          <p class="text-gray-600">Gerencie todas as campanhas das empresas clientes</p>
        </div>
        <button mat-raised-button color="primary" routerLink="/campanhas/nova"
                class="bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg hover:shadow-xl transition-shadow">
          <mat-icon>add</mat-icon>
          Nova Campanha
        </button>
      </div>

      <!-- Stats Cards -->
      <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div class="bg-white rounded-xl p-4 shadow border border-gray-100">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center">
              <mat-icon class="text-purple-600">campaign</mat-icon>
            </div>
            <div>
              <p class="text-2xl font-bold text-gray-900">{{stats.total}}</p>
              <p class="text-sm text-gray-500">Total</p>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-xl p-4 shadow border border-gray-100">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
              <mat-icon class="text-blue-600">play_circle</mat-icon>
            </div>
            <div>
              <p class="text-2xl font-bold text-gray-900">{{stats.emAndamento}}</p>
              <p class="text-sm text-gray-500">Em Andamento</p>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-xl p-4 shadow border border-gray-100">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 rounded-lg bg-amber-100 flex items-center justify-center">
              <mat-icon class="text-amber-600">schedule</mat-icon>
            </div>
            <div>
              <p class="text-2xl font-bold text-gray-900">{{stats.agendadas}}</p>
              <p class="text-sm text-gray-500">Agendadas</p>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-xl p-4 shadow border border-gray-100">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 rounded-lg bg-emerald-100 flex items-center justify-center">
              <mat-icon class="text-emerald-600">check_circle</mat-icon>
            </div>
            <div>
              <p class="text-2xl font-bold text-gray-900">{{stats.concluidas}}</p>
              <p class="text-sm text-gray-500">Concluídas</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Filtros -->
      <div class="bg-white rounded-xl p-6 shadow border border-gray-100 mb-8">
        <div class="flex flex-col lg:flex-row gap-4 items-end">
          <!-- Busca -->
          <mat-form-field class="flex-grow" appearance="outline">
            <mat-label>Buscar campanhas</mat-label>
            <input matInput [(ngModel)]="searchTerm" placeholder="Nome, empresa, tipo...">
            <mat-icon matSuffix>search</mat-icon>
          </mat-form-field>

          <!-- Status -->
          <mat-form-field class="w-full lg:w-48" appearance="outline">
            <mat-label>Status</mat-label>
            <mat-select [(ngModel)]="filtroStatus">
              <mat-option value="">Todos</mat-option>
              <mat-option value="EM_ANDAMENTO">Em Andamento</mat-option>
              <mat-option value="AGENDADA">Agendadas</mat-option>
              <mat-option value="CONCLUIDA">Concluídas</mat-option>
              <mat-option value="RASCUNHO">Rascunhos</mat-option>
            </mat-select>
          </mat-form-field>

          <!-- Tipo -->
          <mat-form-field class="w-full lg:w-48" appearance="outline">
            <mat-label>Tipo</mat-label>
            <mat-select [(ngModel)]="filtroTipo">
              <mat-option value="">Todos</mat-option>
              <mat-option value="EMAIL">Email Marketing</mat-option>
              <mat-option value="SOCIAL_MEDIA">Social Media</mat-option>
              <mat-option value="ADS">Google/Facebook Ads</mat-option>
              <mat-option value="OUTROS">Outros</mat-option>
            </mat-select>
          </mat-form-field>

          <!-- Botões -->
          <div class="flex gap-2">
            <button mat-raised-button color="primary" (click)="filtrar()" class="px-6">
              Filtrar
            </button>
            <button mat-button (click)="limparFiltros()" class="px-6">
              Limpar
            </button>
          </div>
        </div>
      </div>

      <!-- Loading -->
      <div *ngIf="loading" class="flex justify-center items-center p-12">
        <div class="text-center">
          <div class="inline-block relative">
            <div class="w-16 h-16 border-4 border-purple-100 rounded-full"></div>
            <div class="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full animate-spin absolute top-0"></div>
          </div>
          <p class="mt-4 text-gray-600">Carregando campanhas...</p>
        </div>
      </div>

      <!-- Grid de Campanhas -->
      <div *ngIf="!loading && campanhas.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
        <div *ngFor="let campanha of campanhas"
             class="bg-white rounded-xl p-6 shadow border border-gray-100 hover:shadow-lg transition-shadow cursor-pointer group"
             [routerLink]="['/campanhas/detalhes', campanha.id]">

          <div class="flex items-start justify-between mb-4">
            <div class="flex items-center gap-3">
              <div class="w-12 h-12 rounded-lg flex items-center justify-center" [ngClass]="getTipoColor(campanha.tipo)">
                <mat-icon class="text-white">{{getTipoIcon(campanha.tipo)}}</mat-icon>
              </div>
              <div>
                <h3 class="font-bold text-lg text-gray-900 group-hover:text-purple-600 transition-colors">{{campanha.nome}}</h3>
                <p class="text-sm text-gray-500">{{campanha.empresaNome}}</p>
              </div>
            </div>
            <span [class]="getStatusClass(campanha.status)" class="px-3 py-1 rounded-full text-xs font-medium">
              {{getStatusLabel(campanha.status)}}
            </span>
          </div>

          <p class="text-gray-600 text-sm mb-4 line-clamp-2">{{campanha.descricao || 'Sem descrição'}}</p>

          <!-- Métricas -->
          <div class="grid grid-cols-2 gap-4 mb-4">
            <div class="text-center">
              <p class="text-2xl font-bold text-gray-900">{{formatarNumero(campanha.metricas?.alcance || 0)}}</p>
              <p class="text-xs text-gray-500">Alcance</p>
            </div>
            <div class="text-center">
              <p class="text-2xl font-bold text-gray-900">{{formatarNumero(campanha.metricas?.conversoes || 0)}}</p>
              <p class="text-xs text-gray-500">Conversões</p>
            </div>
            <div class="text-center">
              <p class="text-2xl font-bold" [ngClass]="getROIClass(campanha.metricas?.roi || 0)">
                {{getROIText(campanha.metricas?.roi)}}
              </p>
              <p class="text-xs text-gray-500">ROI</p>
            </div>
            <div class="text-center">
              <p class="text-2xl font-bold text-gray-900">R$ {{formatarMoeda(campanha.orcamento || 0)}}</p>
              <p class="text-xs text-gray-500">Orçamento</p>
            </div>
          </div>

          <!-- Progresso -->
          <div *ngIf="campanha.status === 'EM_ANDAMENTO'" class="mb-4">
            <div class="flex justify-between text-xs text-gray-500 mb-1">
              <span>Progresso</span>
              <span>65%</span>
            </div>
            <div class="h-2 bg-gray-200 rounded-full overflow-hidden">
              <div class="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full" style="width: 65%"></div>
            </div>
          </div>

          <!-- Datas e Ações -->
          <div class="flex items-center justify-between pt-4 border-t border-gray-100">
            <div class="flex items-center gap-1 text-gray-400 text-xs">
              <mat-icon class="text-xs">calendar_today</mat-icon>
              <span *ngIf="campanha.dataInicio">{{campanha.dataInicio | date:'dd/MM'}} - {{campanha.dataFim | date:'dd/MM'}}</span>
              <span *ngIf="!campanha.dataInicio">Sem data definida</span>
            </div>
            <div class="flex gap-2">
              <button mat-icon-button [routerLink]="['/campanhas/editar', campanha.id]" (click)="$event.stopPropagation()"
                      class="text-gray-400 hover:text-blue-600">
                <mat-icon>edit</mat-icon>
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Empty State -->
      <div *ngIf="!loading && campanhas.length === 0" class="text-center py-12">
        <div class="max-w-md mx-auto">
          <div class="w-24 h-24 rounded-full bg-purple-50 flex items-center justify-center mx-auto mb-6">
            <mat-icon class="text-4xl text-purple-500">campaign</mat-icon>
          </div>
          <h3 class="text-xl font-bold text-gray-900 mb-2">
            {{temFiltrosAtivos() ? 'Nenhuma campanha encontrada' : 'Nenhuma campanha ainda'}}
          </h3>
          <p class="text-gray-600 mb-6">
            {{temFiltrosAtivos() ? 'Tente alterar os filtros aplicados' : 'Comece criando sua primeira campanha'}}
          </p>
          <button mat-raised-button color="primary" routerLink="/campanhas/nova" *ngIf="!temFiltrosAtivos()" class="px-6">
            <mat-icon>add</mat-icon>
            Criar primeira campanha
          </button>
          <button mat-button (click)="limparFiltros()" *ngIf="temFiltrosAtivos()" class="px-6">
            Limpar filtros
          </button>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .status-rascunho {
      @apply bg-gray-100 text-gray-800;
    }
    .status-agendada {
      @apply bg-amber-100 text-amber-800;
    }
    .status-em_andamento {
      @apply bg-blue-100 text-blue-800;
    }
    .status-concluida {
      @apply bg-emerald-100 text-emerald-800;
    }
    .status-cancelada {
      @apply bg-rose-100 text-rose-800;
    }

    .tipo-email {
      @apply bg-gradient-to-r from-blue-500 to-cyan-500;
    }
    .tipo-social_media {
      @apply bg-gradient-to-r from-purple-500 to-pink-500;
    }
    .tipo-ads {
      @apply bg-gradient-to-r from-green-500 to-teal-500;
    }
    .tipo-outros {
      @apply bg-gradient-to-r from-gray-500 to-gray-600;
    }

    .roi-positivo {
      @apply text-emerald-600;
    }
    .roi-negativo {
      @apply text-rose-600;
    }
    .roi-neutro {
      @apply text-gray-600;
    }

    .line-clamp-2 {
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }
  `]
})
export class CampanhaListaComponent implements OnInit {
  campanhas: Campanha[] = [];
  loading = false;
  searchTerm = '';
  filtroStatus = '';
  filtroTipo = '';

  stats = {
    total: 0,
    emAndamento: 0,
    agendadas: 0,
    concluidas: 0,
    orcamentoTotal: 0
  };

  constructor(
    private campanhaService: CampanhaService,
    private snackBar: MatSnackBar,
    private router: Router,
    private cdRef: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.carregarCampanhas();
    this.carregarStats();
  }

  carregarCampanhas() {
      this.loading = true;
      this.cdRef.detectChanges(); // ← Força atualização imediata

      this.campanhaService.listar(0, 10, this.searchTerm)
        .subscribe({
          next: (response) => {
            let campanhasFiltradas = response.content;

            if (this.filtroStatus) {
              campanhasFiltradas = campanhasFiltradas.filter(c => c.status === this.filtroStatus);
            }

            if (this.filtroTipo) {
              campanhasFiltradas = campanhasFiltradas.filter(c => c.tipo === this.filtroTipo);
            }

            this.campanhas = campanhasFiltradas;
            this.loading = false;
            this.cdRef.detectChanges(); // ← Força atualização após carregar
          },
          error: (error) => {
            this.snackBar.open('Erro ao carregar campanhas', 'Fechar', { duration: 3000 });
            this.loading = false;
            this.cdRef.detectChanges(); // ← Força atualização mesmo com erro
          }
        });
    }

  carregarStats() {
    this.campanhaService.getStats().subscribe({
      next: (stats) => {
        this.stats = stats;
      },
      error: (error) => {
        console.error('Erro ao carregar stats:', error);
        this.stats = {
          total: 0,
          emAndamento: 0,
          agendadas: 0,
          concluidas: 0,
          orcamentoTotal: 0
        };
      }
    });
  }

  filtrar() {
    this.carregarCampanhas();
  }

  limparFiltros() {
    this.searchTerm = '';
    this.filtroStatus = '';
    this.filtroTipo = '';
    this.carregarCampanhas();
  }

  temFiltrosAtivos(): boolean {
    return !!this.searchTerm || !!this.filtroStatus || !!this.filtroTipo;
  }

  // Métodos auxiliares para formatação
  formatarNumero(valor: number): string {
    if (valor >= 1000) {
      return (valor / 1000).toFixed(1) + 'k';
    }
    return valor.toString();
  }

  formatarMoeda(valor: number): string {
    return valor.toLocaleString('pt-BR', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    });
  }

  // Métodos para estilização
  getStatusClass(status: string): string {
    switch(status) {
      case 'RASCUNHO': return 'status-rascunho';
      case 'AGENDADA': return 'status-agendada';
      case 'EM_ANDAMENTO': return 'status-em_andamento';
      case 'CONCLUIDA': return 'status-concluida';
      case 'CANCELADA': return 'status-cancelada';
      default: return 'status-rascunho';
    }
  }

  getStatusLabel(status: string): string {
    switch(status) {
      case 'RASCUNHO': return 'Rascunho';
      case 'AGENDADA': return 'Agendada';
      case 'EM_ANDAMENTO': return 'Em Andamento';
      case 'CONCLUIDA': return 'Concluída';
      case 'CANCELADA': return 'Cancelada';
      default: return status;
    }
  }

  getTipoColor(tipo: string): string {
    switch(tipo) {
      case 'EMAIL': return 'tipo-email';
      case 'SOCIAL_MEDIA': return 'tipo-social_media';
      case 'ADS': return 'tipo-ads';
      case 'OUTROS': return 'tipo-outros';
      default: return 'tipo-outros';
    }
  }

  getTipoIcon(tipo: string): string {
    switch(tipo) {
      case 'EMAIL': return 'mail';
      case 'SOCIAL_MEDIA': return 'share';
      case 'ADS': return 'trending_up';
      case 'OUTROS': return 'campaign';
      default: return 'campaign';
    }
  }

  getROIClass(roi: number): string {
    if (roi > 1) return 'roi-positivo';
    if (roi < 1) return 'roi-negativo';
    return 'roi-neutro';
  }

  getROIText(roi?: number): string {
    if (roi === undefined || roi === null) return '0x';
    return roi.toFixed(1) + 'x';
  }
}
