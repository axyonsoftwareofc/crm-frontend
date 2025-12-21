// src/features/empresas/components/empresa-lista/empresa-lista.component.ts
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
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { EmpresaService } from '../../services/empresa.service';
import { Empresa } from '../../../../core/models/empresa.model';

@Component({
  selector: 'app-empresa-lista',
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
    MatPaginatorModule,
    MatSnackBarModule,
    MatDialogModule,
    MatMenuModule,
    MatProgressSpinnerModule
  ],
  template: `
    <div class="p-6">
      <!-- Header -->
      <div class="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 class="text-3xl font-bold text-gray-900">Empresas</h1>
          <p class="text-gray-600">Gerencie todas as empresas clientes da sua agência</p>
        </div>
        <button mat-raised-button color="primary" routerLink="/empresas/novo" class="gradient-primary text-white shadow-lg hover:shadow-xl transition-shadow">
          <mat-icon>add</mat-icon>
          Nova Empresa
        </button>
      </div>

      <!-- Stats Cards -->
      <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div class="bg-white rounded-xl p-4 shadow border border-gray-100">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
              <mat-icon class="text-blue-600">business</mat-icon>
            </div>
            <div>
              <p class="text-2xl font-bold text-gray-900">{{stats.total}}</p>
              <p class="text-sm text-gray-500">Total</p>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-xl p-4 shadow border border-gray-100">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 rounded-lg bg-emerald-100 flex items-center justify-center">
              <mat-icon class="text-emerald-600">check_circle</mat-icon>
            </div>
            <div>
              <p class="text-2xl font-bold text-gray-900">{{stats.ativas}}</p>
              <p class="text-sm text-gray-500">Ativas</p>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-xl p-4 shadow border border-gray-100">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 rounded-lg bg-amber-100 flex items-center justify-center">
              <mat-icon class="text-amber-600">pending</mat-icon>
            </div>
            <div>
              <p class="text-2xl font-bold text-gray-900">{{stats.pendentes}}</p>
              <p class="text-sm text-gray-500">Pendentes</p>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-xl p-4 shadow border border-gray-100">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 rounded-lg bg-rose-100 flex items-center justify-center">
              <mat-icon class="text-rose-600">cancel</mat-icon>
            </div>
            <div>
              <p class="text-2xl font-bold text-gray-900">{{stats.inativas}}</p>
              <p class="text-sm text-gray-500">Inativas</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Filtros Simples -->
      <div class="bg-white rounded-xl p-6 shadow border border-gray-100 mb-8">
        <div class="flex flex-col lg:flex-row gap-4 items-end">
          <!-- Busca -->
          <mat-form-field class="flex-grow">
            <mat-label>Buscar empresas</mat-label>
            <input matInput [(ngModel)]="searchTerm" placeholder="Digite para buscar...">
            <mat-icon matSuffix>search</mat-icon>
          </mat-form-field>

          <!-- Status -->
          <mat-form-field class="w-full lg:w-48">
            <mat-label>Status</mat-label>
            <mat-select [(ngModel)]="filtroStatus">
              <mat-option value="">Todos</mat-option>
              <mat-option value="Ativa">Ativas</mat-option>
              <mat-option value="Inativa">Inativas</mat-option>
              <mat-option value="Pendente">Pendentes</mat-option>
            </mat-select>
          </mat-form-field>

          <!-- Setor -->
          <mat-form-field class="w-full lg:w-48">
            <mat-label>Setor</mat-label>
            <mat-select [(ngModel)]="filtroSetor">
              <mat-option value="">Todos</mat-option>
              <mat-option value="Tecnologia">Tecnologia</mat-option>
              <mat-option value="Marketing">Marketing</mat-option>
              <mat-option value="Construção Civil">Construção Civil</mat-option>
              <mat-option value="Alimentício">Alimentício</mat-option>
            </mat-select>
          </mat-form-field>

          <!-- Botões -->
          <div class="flex gap-2">
            <button mat-raised-button color="primary" (click)="aplicarFiltros()" class="px-6">
              <mat-icon>search</mat-icon>
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
            <div class="w-16 h-16 border-4 border-blue-100 rounded-full"></div>
            <div class="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin absolute top-0"></div>
          </div>
          <p class="mt-4 text-gray-600">Carregando empresas...</p>
        </div>
      </div>

      <!-- Grid de Empresas -->
      <div *ngIf="!loading && empresas.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <div *ngFor="let empresa of empresas"
             class="bg-white rounded-xl p-6 shadow border border-gray-100 hover:shadow-lg transition-shadow cursor-pointer group"
             [routerLink]="['/empresas/detalhes', empresa.id]">

          <div class="flex items-start justify-between mb-4">
            <div class="flex items-center gap-3">
              <div class="w-12 h-12 rounded-lg flex items-center justify-center" [ngClass]="getSetorColor(empresa.setor)">
                <mat-icon class="text-white">business</mat-icon>
              </div>
              <div>
                <h3 class="font-bold text-lg text-gray-900 group-hover:text-blue-600 transition-colors">{{empresa.razaoSocial}}</h3>
                <p class="text-sm text-gray-500">{{empresa.nomeFantasia || 'Sem nome fantasia'}}</p>
              </div>
            </div>
            <span [class]="getStatusClass(empresa.status)" class="px-3 py-1 rounded-full text-xs font-medium">
              {{empresa.status || 'Ativa'}}
            </span>
          </div>

          <div class="space-y-3 mb-4">
            <div class="flex items-center gap-2 text-gray-600">
              <mat-icon class="text-sm">fingerprint</mat-icon>
              <span class="text-sm">{{empresa.cnpj}}</span>
            </div>

            <div class="flex items-center gap-2 text-gray-600">
              <mat-icon class="text-sm">location_on</mat-icon>
              <span class="text-sm">{{empresa.cidade || 'Cidade não informada'}}<span *ngIf="empresa.uf">/{{empresa.uf}}</span></span>
            </div>

            <div class="flex items-center gap-2 text-gray-600">
              <mat-icon class="text-sm">category</mat-icon>
              <span class="text-sm">{{empresa.setor || 'Setor não informado'}}</span>
            </div>
          </div>

          <div class="flex items-center justify-between pt-4 border-t border-gray-100">
            <div class="flex items-center gap-1 text-gray-400 text-xs">
              <mat-icon class="text-xs">calendar_today</mat-icon>
              <span>{{empresa.criadoEm | date:'dd/MM/yy'}}</span>
            </div>
            <div class="flex gap-2">
              <button mat-icon-button [routerLink]="['/empresas/editar', empresa.id]" (click)="$event.stopPropagation()" class="text-gray-400 hover:text-blue-600">
                <mat-icon>edit</mat-icon>
              </button>
              <button mat-icon-button (click)="confirmarExclusao(empresa); $event.stopPropagation()" class="text-gray-400 hover:text-red-600">
                <mat-icon>delete</mat-icon>
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Empty State -->
      <div *ngIf="!loading && empresas.length === 0" class="text-center py-12">
        <div class="max-w-md mx-auto">
          <div class="w-24 h-24 rounded-full bg-blue-50 flex items-center justify-center mx-auto mb-6">
            <mat-icon class="text-4xl text-blue-500">business</mat-icon>
          </div>
          <h3 class="text-xl font-bold text-gray-900 mb-2">Nenhuma empresa encontrada</h3>
          <p class="text-gray-600 mb-6">
            {{temFiltrosAtivos() ? 'Tente alterar os filtros aplicados' : 'Comece cadastrando sua primeira empresa'}}
          </p>
          <button mat-raised-button color="primary" routerLink="/empresas/novo" *ngIf="!temFiltrosAtivos()" class="px-6">
            <mat-icon>add</mat-icon>
            Cadastrar primeira empresa
          </button>
          <button mat-button (click)="limparFiltros()" *ngIf="temFiltrosAtivos()" class="px-6">
            Limpar filtros
          </button>
        </div>
      </div>

      <!-- Paginação Simples -->
      <div *ngIf="!loading && empresas.length > 0" class="flex justify-center mt-8">
        <div class="bg-white rounded-xl p-4 shadow border border-gray-100">
          <div class="flex items-center gap-4">
            <button mat-icon-button (click)="paginaAnterior()" [disabled]="paginaAtual === 0">
              <mat-icon>chevron_left</mat-icon>
            </button>

            <div class="flex items-center gap-2">
              <span *ngFor="let pagina of getPaginas()"
                    (click)="irParaPagina(pagina)"
                    [class]="pagina === paginaAtual ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'"
                    class="w-8 h-8 rounded-lg flex items-center justify-center cursor-pointer text-sm font-medium">
                {{pagina + 1}}
              </span>
            </div>

            <button mat-icon-button (click)="proximaPagina()" [disabled]="paginaAtual === totalPaginas - 1">
              <mat-icon>chevron_right</mat-icon>
            </button>

            <span class="text-sm text-gray-600 ml-4">
              Página {{paginaAtual + 1}} de {{totalPaginas}}
            </span>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .status-ativa {
      @apply bg-emerald-100 text-emerald-800;
    }
    .status-inativa {
      @apply bg-rose-100 text-rose-800;
    }
    .status-pendente {
      @apply bg-amber-100 text-amber-800;
    }

    .setor-tecnologia {
      @apply bg-gradient-to-r from-blue-500 to-cyan-500;
    }
    .setor-marketing {
      @apply bg-gradient-to-r from-purple-500 to-pink-500;
    }
    .setor-construcao {
      @apply bg-gradient-to-r from-amber-500 to-orange-500;
    }
    .setor-alimenticio {
      @apply bg-gradient-to-r from-emerald-500 to-teal-500;
    }
    .setor-default {
      @apply bg-gradient-to-r from-gray-500 to-gray-600;
    }
  `]
})
export class EmpresaListaComponent implements OnInit {
  empresas: Empresa[] = [];
  loading = true;
  searchTerm = '';
  filtroStatus = '';
  filtroSetor = '';
  pageSize = 6;
  totalElements = 0;
  paginaAtual = 0;
  totalPaginas = 0;

  stats = {
    total: 8,
    ativas: 6,
    pendentes: 1,
    inativas: 1
  };

  constructor(
    private empresaService: EmpresaService,
    private snackBar: MatSnackBar,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    // Carrega automaticamente ao iniciar
    this.carregarEmpresas();
  }

  carregarEmpresas() {
    this.loading = true;
    this.cdr.detectChanges();

    // Monta a busca com filtros
    let busca = this.searchTerm;
    if (this.filtroStatus) {
      busca = busca ? `${busca} ${this.filtroStatus}` : this.filtroStatus;
    }
    if (this.filtroSetor) {
      busca = busca ? `${busca} ${this.filtroSetor}` : this.filtroSetor;
    }

    this.empresaService.listar(this.paginaAtual, this.pageSize, 'razaoSocial', busca || undefined)
      .subscribe({
        next: (response) => {
          this.empresas = response.content;
          this.totalElements = response.totalElements;
          this.totalPaginas = response.totalPages;
          this.loading = false;
          this.cdr.detectChanges();
        },
        error: (error) => {
          this.snackBar.open('Erro ao carregar empresas', 'Fechar', { duration: 3000 });
          this.loading = false;
          this.cdr.detectChanges();
        }
      });
  }

  aplicarFiltros() {
    this.paginaAtual = 0;
    this.carregarEmpresas();
  }

  limparFiltros() {
    this.searchTerm = '';
    this.filtroStatus = '';
    this.filtroSetor = '';
    this.paginaAtual = 0;
    this.carregarEmpresas();
  }

  temFiltrosAtivos(): boolean {
    return !!this.searchTerm || !!this.filtroStatus || !!this.filtroSetor;
  }

  // Paginação manual
  getPaginas(): number[] {
    const paginas = [];
    const inicio = Math.max(0, this.paginaAtual - 2);
    const fim = Math.min(this.totalPaginas, inicio + 5);

    for (let i = inicio; i < fim; i++) {
      paginas.push(i);
    }
    return paginas;
  }

  paginaAnterior() {
    if (this.paginaAtual > 0) {
      this.paginaAtual--;
      this.carregarEmpresas();
    }
  }

  proximaPagina() {
    if (this.paginaAtual < this.totalPaginas - 1) {
      this.paginaAtual++;
      this.carregarEmpresas();
    }
  }

  irParaPagina(pagina: number) {
    this.paginaAtual = pagina;
    this.carregarEmpresas();
  }

  getStatusClass(status?: string): string {
    switch(status?.toLowerCase()) {
      case 'ativa': return 'status-ativa';
      case 'inativa': return 'status-inativa';
      case 'pendente': return 'status-pendente';
      default: return 'status-ativa';
    }
  }

  getSetorColor(setor?: string): string {
    switch(setor?.toLowerCase()) {
      case 'tecnologia': return 'setor-tecnologia';
      case 'marketing': return 'setor-marketing';
      case 'construção civil': return 'setor-construcao';
      case 'alimentício': return 'setor-alimenticio';
      default: return 'setor-default';
    }
  }

  confirmarExclusao(empresa: Empresa) {
    if (confirm(`Tem certeza que deseja excluir "${empresa.razaoSocial}"?`)) {
      this.empresaService.remover(empresa.id!).subscribe({
        next: () => {
          this.snackBar.open('Empresa excluída com sucesso', 'Fechar', { duration: 3000 });
          this.carregarEmpresas();
        },
        error: (error) => {
          this.snackBar.open('Erro ao excluir empresa', 'Fechar', { duration: 3000 });
        }
      });
    }
  }
}
