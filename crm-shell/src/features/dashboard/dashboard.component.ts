// src/features/dashboard/dashboard.component.ts - VERSÃO CORRIGIDA
import { Component, AfterViewInit, Inject, PLATFORM_ID, ViewChild, ElementRef } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Chart, registerables } from 'chart.js';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatListModule } from '@angular/material/list';
import { DatePipe } from '@angular/common';

Chart.register(...registerables);

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatProgressBarModule,
    MatListModule
  ],
  providers: [DatePipe],
  template: `
    <!-- Header do Dashboard -->
    <div class="mb-8">
      <h1 class="text-3xl font-bold text-gray-900 mb-2">Visão Geral do CRM</h1>
      <p class="text-gray-600">Monitoramento completo da sua agência de marketing</p>
    </div>

    <!-- Cards de Métricas -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <!-- Card 1 - Empresas -->
      <div class="glass-card rounded-2xl p-6 hover-lift group">
        <div class="flex items-center justify-between mb-4">
          <div class="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
            <mat-icon class="text-white">business</mat-icon>
          </div>
          <span class="text-sm font-medium text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full">+12%</span>
        </div>
        <h3 class="text-2xl font-bold text-gray-900 mb-1">42</h3>
        <p class="text-gray-600 text-sm">Empresas Ativas</p>
        <div class="mt-4">
          <mat-progress-bar mode="determinate" value="75" color="primary"></mat-progress-bar>
          <p class="text-xs text-gray-500 mt-1">75% de conversão</p>
        </div>
      </div>

      <!-- Card 2 - Clientes -->
      <div class="glass-card rounded-2xl p-6 hover-lift group">
        <div class="flex items-center justify-between mb-4">
          <div class="w-12 h-12 rounded-xl gradient-success flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
            <mat-icon class="text-white">people</mat-icon>
          </div>
          <span class="text-sm font-medium text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full">+23%</span>
        </div>
        <h3 class="text-2xl font-bold text-gray-900 mb-1">156</h3>
        <p class="text-gray-600 text-sm">Clientes Ativos</p>
        <div class="mt-4">
          <mat-progress-bar mode="determinate" value="88" color="accent"></mat-progress-bar>
          <p class="text-xs text-gray-500 mt-1">88% de satisfação</p>
        </div>
      </div>

      <!-- Card 3 - Campanhas -->
      <div class="glass-card rounded-2xl p-6 hover-lift group">
        <div class="flex items-center justify-between mb-4">
          <div class="w-12 h-12 rounded-xl gradient-warning flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
            <mat-icon class="text-white">campaign</mat-icon>
          </div>
          <span class="text-sm font-medium text-amber-600 bg-amber-50 px-3 py-1 rounded-full">+8%</span>
        </div>
        <h3 class="text-2xl font-bold text-gray-900 mb-1">18</h3>
        <p class="text-gray-600 text-sm">Campanhas Ativas</p>
        <div class="mt-4">
          <mat-progress-bar mode="determinate" value="62" color="warn"></mat-progress-bar>
          <p class="text-xs text-gray-500 mt-1">62% de ROI</p>
        </div>
      </div>

      <!-- Card 4 - Receita -->
      <div class="glass-card rounded-2xl p-6 hover-lift group">
        <div class="flex items-center justify-between mb-4">
          <div class="w-12 h-12 rounded-xl gradient-danger flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
            <mat-icon class="text-white">trending_up</mat-icon>
          </div>
          <span class="text-sm font-medium text-rose-600 bg-rose-50 px-3 py-1 rounded-full">+45%</span>
        </div>
        <h3 class="text-2xl font-bold text-gray-900 mb-1">R$ 128.5k</h3>
        <p class="text-gray-600 text-sm">Receita Mensal</p>
        <div class="mt-4">
          <mat-progress-bar mode="determinate" value="95" color="primary"></mat-progress-bar>
          <p class="text-xs text-gray-500 mt-1">95% da meta</p>
        </div>
      </div>
    </div>

    <!-- Gráficos -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
      <!-- Gráfico 1 -->
      <div class="glass-card rounded-2xl p-6">
        <div class="flex items-center justify-between mb-6">
          <div>
            <h3 class="text-xl font-bold text-gray-900">Desempenho de Campanhas</h3>
            <p class="text-gray-600 text-sm">Últimos 6 meses</p>
          </div>
          <button mat-button color="primary">
            <mat-icon>more_vert</mat-icon>
          </button>
        </div>
        <div class="h-64">
          <canvas #campaignChart></canvas>
        </div>
      </div>

      <!-- Gráfico 2 -->
      <div class="glass-card rounded-2xl p-6">
        <div class="flex items-center justify-between mb-6">
          <div>
            <h3 class="text-xl font-bold text-gray-900">Novos Clientes</h3>
            <p class="text-gray-600 text-sm">Últimos 30 dias</p>
          </div>
          <button mat-button color="primary">
            <mat-icon>more_vert</mat-icon>
          </button>
        </div>
        <div class="h-64">
          <canvas #clientsChart></canvas>
        </div>
      </div>
    </div>

    <!-- Atividade Recente -->
    <div class="glass-card rounded-2xl p-6">
      <div class="flex items-center justify-between mb-6">
        <div>
          <h3 class="text-xl font-bold text-gray-900">Atividade Recente</h3>
          <p class="text-gray-600 text-sm">Últimas atualizações do sistema</p>
        </div>
        <button mat-button color="primary">Ver tudo</button>
      </div>

      <div class="space-y-4">
        <!-- Item 1 -->
        <div class="flex items-start gap-4 p-4 hover:bg-gray-50 rounded-xl transition-colors group">
          <div class="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
            <mat-icon class="text-blue-600">add_business</mat-icon>
          </div>
          <div class="flex-grow min-w-0">
            <div class="flex items-center justify-between mb-1">
              <h4 class="font-medium text-gray-900 truncate">Nova empresa cadastrada</h4>
              <span class="text-sm text-gray-500 whitespace-nowrap ml-2">{{getTempoPassado(0)}}</span>
            </div>
            <p class="text-gray-600 text-sm truncate">Tech Solutions foi adicionada ao sistema</p>
            <div class="flex items-center gap-2 mt-2">
              <span class="text-xs px-2 py-1 bg-blue-100 text-blue-600 rounded-full">Cadastro</span>
              <span class="text-xs text-gray-500">Por: Werne Padilha</span>
            </div>
          </div>
        </div>

        <!-- Item 2 -->
        <div class="flex items-start gap-4 p-4 hover:bg-gray-50 rounded-xl transition-colors group">
          <div class="w-10 h-10 rounded-lg bg-emerald-100 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
            <mat-icon class="text-emerald-600">campaign</mat-icon>
          </div>
          <div class="flex-grow min-w-0">
            <div class="flex items-center justify-between mb-1">
              <h4 class="font-medium text-gray-900 truncate">Campanha iniciada</h4>
              <span class="text-sm text-gray-500 whitespace-nowrap ml-2">{{getTempoPassado(1)}}</span>
            </div>
            <p class="text-gray-600 text-sm truncate">"Verão 2024" para Natural Food</p>
            <div class="flex items-center gap-2 mt-2">
              <span class="text-xs px-2 py-1 bg-emerald-100 text-emerald-600 rounded-full">Marketing</span>
              <span class="text-xs px-2 py-1 bg-amber-100 text-amber-600 rounded-full">Em andamento</span>
            </div>
          </div>
        </div>

        <!-- Item 3 -->
        <div class="flex items-start gap-4 p-4 hover:bg-gray-50 rounded-xl transition-colors group">
          <div class="w-10 h-10 rounded-lg bg-amber-100 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
            <mat-icon class="text-amber-600">update</mat-icon>
          </div>
          <div class="flex-grow min-w-0">
            <div class="flex items-center justify-between mb-1">
              <h4 class="font-medium text-gray-900 truncate">Relatório gerado</h4>
              <span class="text-sm text-gray-500 whitespace-nowrap ml-2">{{getTempoPassado(3)}}</span>
            </div>
            <p class="text-gray-600 text-sm truncate">Análise mensal de desempenho - Julho 2024</p>
            <div class="flex items-center gap-2 mt-2">
              <span class="text-xs px-2 py-1 bg-purple-100 text-purple-600 rounded-full">Relatório</span>
              <span class="text-xs text-gray-500">PDF • 2.4 MB</span>
            </div>
          </div>
        </div>

        <!-- Item 4 -->
        <div class="flex items-start gap-4 p-4 hover:bg-gray-50 rounded-xl transition-colors group">
          <div class="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
            <mat-icon class="text-purple-600">person_add</mat-icon>
          </div>
          <div class="flex-grow min-w-0">
            <div class="flex items-center justify-between mb-1">
              <h4 class="font-medium text-gray-900 truncate">Novo usuário adicionado</h4>
              <span class="text-sm text-gray-500 whitespace-nowrap ml-2">{{getTempoPassado(24)}}</span>
            </div>
            <p class="text-gray-600 text-sm truncate">Carlos Silva adicionado como colaborador</p>
            <div class="flex items-center gap-2 mt-2">
              <span class="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded-full">Usuário</span>
              <span class="text-xs text-gray-500">Permissão: Editor</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  `
})
export class DashboardComponent implements AfterViewInit {
  @ViewChild('campaignChart') campaignChartRef!: ElementRef<HTMLCanvasElement>;
  @ViewChild('clientsChart') clientsChartRef!: ElementRef<HTMLCanvasElement>;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private datePipe: DatePipe
  ) {}

  ngAfterViewInit() {
    // Só executa no browser (não no servidor)
    if (isPlatformBrowser(this.platformId)) {
      setTimeout(() => {
        this.createCampaignChart();
        this.createClientsChart();
      }, 100);
    }
  }

  private createCampaignChart() {
    if (!this.campaignChartRef?.nativeElement) return;

    new Chart(this.campaignChartRef.nativeElement, {
      type: 'line',
      data: {
        labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun'],
        datasets: [{
          label: 'ROI',
          data: [65, 59, 80, 81, 56, 72],
          borderColor: '#0ea5e9',
          backgroundColor: 'rgba(14, 165, 233, 0.1)',
          tension: 0.4,
          fill: true
        }, {
          label: 'Conversões',
          data: [28, 48, 40, 45, 36, 52],
          borderColor: '#10b981',
          backgroundColor: 'rgba(16, 185, 129, 0.1)',
          tension: 0.4,
          fill: true
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'top',
            labels: {
              color: '#6b7280',
              font: {
                size: 12
              }
            }
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            grid: {
              color: 'rgba(0, 0, 0, 0.05)'
            },
            ticks: {
              color: '#6b7280'
            }
          },
          x: {
            grid: {
              color: 'rgba(0, 0, 0, 0.05)'
            },
            ticks: {
              color: '#6b7280'
            }
          }
        }
      }
    });
  }

  private createClientsChart() {
    if (!this.clientsChartRef?.nativeElement) return;

    new Chart(this.clientsChartRef.nativeElement, {
      type: 'bar',
      data: {
        labels: ['Sem 1', 'Sem 2', 'Sem 3', 'Sem 4'],
        datasets: [{
          label: 'Novos Clientes',
          data: [12, 19, 8, 15],
          backgroundColor: [
            'rgba(14, 165, 233, 0.8)',
            'rgba(16, 185, 129, 0.8)',
            'rgba(245, 158, 11, 0.8)',
            'rgba(244, 63, 94, 0.8)'
          ],
          borderRadius: 8,
          borderWidth: 0
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            grid: {
              color: 'rgba(0, 0, 0, 0.05)'
            },
            ticks: {
              color: '#6b7280',
              stepSize: 5
            }
          },
          x: {
            grid: {
              display: false
            },
            ticks: {
              color: '#6b7280'
            }
          }
        }
      }
    });
  }

  // Função para mostrar "há X tempo" em português
  getTempoPassado(horasAtras: number): string {
    if (horasAtras === 0) return 'agora há pouco';
    if (horasAtras === 1) return 'há 1 hora';
    if (horasAtras < 24) return `há ${horasAtras} horas`;

    const dias = Math.floor(horasAtras / 24);
    if (dias === 1) return 'ontem';
    if (dias === 2) return 'anteontem';
    if (dias < 7) return `há ${dias} dias`;
    if (dias < 30) return `há ${Math.floor(dias / 7)} semana${Math.floor(dias / 7) > 1 ? 's' : ''}`;

    return `há ${Math.floor(dias / 30)} mês${Math.floor(dias / 30) > 1 ? 'es' : ''}`;
  }

  // Para datas formatadas em português
  formatarData(data: Date): string {
    return this.datePipe.transform(data, 'dd \'de\' MMMM \'de\' yyyy, HH:mm', 'pt-BR') || '';
  }
}
