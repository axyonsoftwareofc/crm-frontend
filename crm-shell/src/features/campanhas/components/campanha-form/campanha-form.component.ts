// src/features/campanhas/components/campanha-form/campanha-form.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, AbstractControl } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatStepperModule } from '@angular/material/stepper';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSliderModule } from '@angular/material/slider';
import { MatChipsModule } from '@angular/material/chips';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { EmpresaService } from '../../../empresas/services/empresa.service';
import { CampanhaService } from '../../services/campanha.service';
import { Campanha } from '../../../../core/models/campanha.model';
import { Empresa } from '../../../../core/models/empresa.model';

@Component({
  selector: 'app-campanha-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterLink,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatStepperModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
    MatSlideToggleModule,
    MatSliderModule,
    MatChipsModule,
    MatAutocompleteModule
  ],
  template: `
    <div class="p-6 max-w-6xl mx-auto">
      <!-- Header -->
      <div class="mb-8">
        <div class="flex items-center gap-4 mb-2">
          <button mat-icon-button routerLink="/campanhas">
            <mat-icon>arrow_back</mat-icon>
          </button>
          <h1 class="text-3xl font-bold text-gray-900">
            {{ isEdicao ? 'Editar Campanha' : 'Nova Campanha' }}
          </h1>
        </div>
        <p class="text-gray-600 ml-14">
          {{ isEdicao ? 'Atualize os dados da campanha' : 'Crie uma nova campanha de marketing' }}
        </p>
      </div>

      <!-- Stepper -->
      <mat-stepper linear #stepper class="mb-8">
        <!-- Passo 1: Informações Básicas -->
        <mat-step [stepControl]="passo1Form">
          <ng-template matStepLabel>Informações Básicas</ng-template>

          <form [formGroup]="passo1Form" class="space-y-6">
            <mat-card class="p-6">
              <h2 class="text-xl font-bold mb-6 text-gray-800">Dados da Campanha</h2>

              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <!-- Nome -->
                <mat-form-field class="w-full">
                  <mat-label>Nome da Campanha *</mat-label>
                  <input matInput formControlName="nome" placeholder="Ex: Campanha Verão 2024">
                  <mat-error *ngIf="passo1Form.get('nome')?.hasError('required')">
                    Nome é obrigatório
                  </mat-error>
                </mat-form-field>

                <!-- Empresa -->
                <mat-form-field class="w-full">
                  <mat-label>Empresa *</mat-label>
                  <mat-select formControlName="empresaId">
                    <mat-option *ngFor="let empresa of empresas" [value]="empresa.id">
                      {{empresa.razaoSocial}}
                    </mat-option>
                  </mat-select>
                  <mat-error *ngIf="passo1Form.get('empresaId')?.hasError('required')">
                    Empresa é obrigatória
                  </mat-error>
                </mat-form-field>

                <!-- Tipo -->
                <mat-form-field class="w-full">
                  <mat-label>Tipo de Campanha *</mat-label>
                  <mat-select formControlName="tipo">
                    <mat-option value="EMAIL">
                      <div class="flex items-center gap-2">
                        <mat-icon class="text-blue-500">mail</mat-icon>
                        <span>Email Marketing</span>
                      </div>
                    </mat-option>
                    <mat-option value="SOCIAL_MEDIA">
                      <div class="flex items-center gap-2">
                        <mat-icon class="text-purple-500">share</mat-icon>
                        <span>Social Media</span>
                      </div>
                    </mat-option>
                    <mat-option value="ADS">
                      <div class="flex items-center gap-2">
                        <mat-icon class="text-green-500">trending_up</mat-icon>
                        <span>Google/Facebook Ads</span>
                      </div>
                    </mat-option>
                    <mat-option value="OUTROS">
                      <div class="flex items-center gap-2">
                        <mat-icon class="text-gray-500">campaign</mat-icon>
                        <span>Outros</span>
                      </div>
                    </mat-option>
                  </mat-select>
                  <mat-error *ngIf="passo1Form.get('tipo')?.hasError('required')">
                    Tipo é obrigatório
                  </mat-error>
                </mat-form-field>

                <!-- Status -->
                <mat-form-field class="w-full">
                  <mat-label>Status *</mat-label>
                  <mat-select formControlName="status">
                    <mat-option value="RASCUNHO">
                      <div class="flex items-center gap-2">
                        <div class="w-3 h-3 rounded-full bg-gray-400"></div>
                        <span>Rascunho</span>
                      </div>
                    </mat-option>
                    <mat-option value="AGENDADA">
                      <div class="flex items-center gap-2">
                        <div class="w-3 h-3 rounded-full bg-amber-400"></div>
                        <span>Agendada</span>
                      </div>
                    </mat-option>
                    <mat-option value="EM_ANDAMENTO">
                      <div class="flex items-center gap-2">
                        <div class="w-3 h-3 rounded-full bg-blue-400"></div>
                        <span>Em Andamento</span>
                      </div>
                    </mat-option>
                  </mat-select>
                </mat-form-field>

                <!-- Orçamento -->
                <mat-form-field class="w-full">
                  <mat-label>Orçamento (R$)</mat-label>
                  <input matInput type="number" formControlName="orcamento" placeholder="5000">
                  <mat-icon matPrefix class="text-gray-400 mr-2">attach_money</mat-icon>
                </mat-form-field>

                <!-- Público Alvo -->
                <mat-form-field class="md:col-span-2">
                  <mat-label>Público Alvo</mat-label>
                  <input matInput formControlName="publicoAlvo" placeholder="Ex: Homens e mulheres 25-45 anos, interessados em tecnologia">
                </mat-form-field>

                <!-- Descrição -->
                <mat-form-field class="md:col-span-2">
                  <mat-label>Descrição</mat-label>
                  <textarea matInput formControlName="descricao" rows="4"
                            placeholder="Descreva os objetivos e estratégias desta campanha..."></textarea>
                </mat-form-field>
              </div>
            </mat-card>

            <!-- Botões do Passo 1 -->
            <div class="flex justify-end gap-4">
              <button mat-button routerLink="/campanhas">
                Cancelar
              </button>
              <button mat-raised-button color="primary" (click)="avancarParaPasso2()"
                      [disabled]="passo1Form.invalid">
                Próximo
                <mat-icon>arrow_forward</mat-icon>
              </button>
            </div>
          </form>
        </mat-step>

        <!-- Passo 2: Período e Datas -->
        <mat-step [stepControl]="passo2Form">
          <ng-template matStepLabel>Período</ng-template>

          <form [formGroup]="passo2Form" class="space-y-6">
            <mat-card class="p-6">
              <h2 class="text-xl font-bold mb-6 text-gray-800">Período da Campanha</h2>

              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <!-- Data Início -->
                <mat-form-field class="w-full">
                  <mat-label>Data de Início</mat-label>
                  <input matInput [matDatepicker]="pickerInicio" formControlName="dataInicio">
                  <mat-datepicker-toggle matSuffix [for]="pickerInicio"></mat-datepicker-toggle>
                  <mat-datepicker #pickerInicio></mat-datepicker>
                </mat-form-field>

                <!-- Data Fim -->
                <mat-form-field class="w-full">
                  <mat-label>Data de Término</mat-label>
                  <input matInput [matDatepicker]="pickerFim" formControlName="dataFim">
                  <mat-datepicker-toggle matSuffix [for]="pickerFim"></mat-datepicker-toggle>
                  <mat-datepicker #pickerFim></mat-datepicker>
                </mat-form-field>

                <!-- Duração Calculada -->
                <div class="md:col-span-2">
                  <div class="p-4 bg-blue-50 rounded-lg">
                    <div class="flex items-center gap-3">
                      <mat-icon class="text-blue-600">calendar_today</mat-icon>
                      <div>
                        <p class="font-medium text-gray-800">Duração Estimada</p>
                        <p class="text-gray-600 text-sm">
                          {{calcularDuracao()}}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Metas -->
                <div class="md:col-span-2">
                  <h3 class="text-lg font-semibold mb-4 text-gray-800">Metas da Campanha</h3>

                  <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <!-- Meta Alcance -->
                    <mat-form-field class="w-full">
                      <mat-label>Meta de Alcance</mat-label>
                      <input matInput type="number" formControlName="metaAlcance" placeholder="10000">
                      <mat-icon matPrefix class="text-gray-400 mr-2">visibility</mat-icon>
                    </mat-form-field>

                    <!-- Meta Conversões -->
                    <mat-form-field class="w-full">
                      <mat-label>Meta de Conversões</mat-label>
                      <input matInput type="number" formControlName="metaConversoes" placeholder="500">
                      <mat-icon matPrefix class="text-gray-400 mr-2">conversion_path</mat-icon>
                    </mat-form-field>

                    <!-- Meta ROI -->
                    <mat-form-field class="w-full">
                      <mat-label>Meta de ROI (x)</mat-label>
                      <input matInput type="number" step="0.1" formControlName="metaROI" placeholder="2.5">
                      <mat-icon matPrefix class="text-gray-400 mr-2">trending_up</mat-icon>
                    </mat-form-field>
                  </div>
                </div>
              </div>
            </mat-card>

            <!-- Botões do Passo 2 -->
            <div class="flex justify-between gap-4">
              <button mat-button (click)="voltarParaPasso1()">
                <mat-icon>arrow_back</mat-icon>
                Voltar
              </button>
              <div class="flex gap-4">
                <button mat-button routerLink="/campanhas">
                  Cancelar
                </button>
                <button mat-raised-button color="primary" (click)="avancarParaPasso3()"
                        [disabled]="passo2Form.invalid">
                  Próximo
                  <mat-icon>arrow_forward</mat-icon>
                </button>
              </div>
            </div>
          </form>
        </mat-step>

        <!-- Passo 3: Revisão -->
        <mat-step>
          <ng-template matStepLabel>Revisão</ng-template>

          <div class="space-y-6">
            <mat-card class="p-6">
              <h2 class="text-xl font-bold mb-6 text-gray-800">Revisão da Campanha</h2>

              <!-- Resumo -->
              <div class="space-y-6">
                <!-- Informações Básicas -->
                <div>
                  <h3 class="text-lg font-semibold mb-3 text-gray-700">Informações Básicas</h3>
                  <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div class="p-4 bg-gray-50 rounded-lg">
                      <p class="text-sm text-gray-500">Nome</p>
                      <p class="font-medium">{{passo1Form.get('nome')?.value}}</p>
                    </div>
                    <div class="p-4 bg-gray-50 rounded-lg">
                      <p class="text-sm text-gray-500">Empresa</p>
                      <p class="font-medium">{{getNomeEmpresa(passo1Form.get('empresaId')?.value)}}</p>
                    </div>
                    <div class="p-4 bg-gray-50 rounded-lg">
                      <p class="text-sm text-gray-500">Tipo</p>
                      <p class="font-medium">{{getTipoLabel(passo1Form.get('tipo')?.value)}}</p>
                    </div>
                    <div class="p-4 bg-gray-50 rounded-lg">
                      <p class="text-sm text-gray-500">Status</p>
                      <p class="font-medium">{{getStatusLabel(passo1Form.get('status')?.value)}}</p>
                    </div>
                  </div>
                </div>

                <!-- Orçamento e Metas -->
                <div>
                  <h3 class="text-lg font-semibold mb-3 text-gray-700">Orçamento e Metas</h3>
                  <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div class="p-4 bg-blue-50 rounded-lg">
                      <p class="text-sm text-blue-600">Orçamento</p>
                      <p class="text-xl font-bold text-gray-900">
                        R$ {{passo1Form.get('orcamento')?.value?.toLocaleString('pt-BR') || '0'}}
                      </p>
                    </div>
                    <div class="p-4 bg-green-50 rounded-lg">
                      <p class="text-sm text-green-600">Meta Alcance</p>
                      <p class="text-xl font-bold text-gray-900">
                        {{passo2Form.get('metaAlcance')?.value?.toLocaleString('pt-BR') || '0'}}
                      </p>
                    </div>
                    <div class="p-4 bg-purple-50 rounded-lg">
                      <p class="text-sm text-purple-600">Meta ROI</p>
                      <p class="text-xl font-bold text-gray-900">
                        {{passo2Form.get('metaROI')?.value || '0'}}x
                      </p>
                    </div>
                  </div>
                </div>

                <!-- Período -->
                <div>
                  <h3 class="text-lg font-semibold mb-3 text-gray-700">Período</h3>
                  <div class="p-4 bg-amber-50 rounded-lg">
                    <div class="flex items-center gap-3">
                      <mat-icon class="text-amber-600">calendar_today</mat-icon>
                      <div>
                        <p class="font-medium text-gray-800">
                          {{passo2Form.get('dataInicio')?.value ? (passo2Form.get('dataInicio')?.value | date:'dd/MM/yyyy') : 'Não definida'}}
                          até
                          {{passo2Form.get('dataFim')?.value ? (passo2Form.get('dataFim')?.value | date:'dd/MM/yyyy') : 'Não definida'}}
                        </p>
                        <p class="text-gray-600 text-sm">{{calcularDuracao()}}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Descrição -->
                <div *ngIf="passo1Form.get('descricao')?.value">
                  <h3 class="text-lg font-semibold mb-3 text-gray-700">Descrição</h3>
                  <div class="p-4 bg-gray-50 rounded-lg">
                    <p class="text-gray-700">{{passo1Form.get('descricao')?.value}}</p>
                  </div>
                </div>
              </div>
            </mat-card>

            <!-- Botões do Passo 3 -->
            <div class="flex justify-between gap-4">
              <button mat-button (click)="voltarParaPasso2()">
                <mat-icon>arrow_back</mat-icon>
                Voltar
              </button>
              <div class="flex gap-4">
                <button mat-button routerLink="/campanhas">
                  Cancelar
                </button>
                <button mat-raised-button color="primary" (click)="salvarCampanha()"
                        [disabled]="passo1Form.invalid || passo2Form.invalid || loading">
                  <span *ngIf="!loading">
                    {{ isEdicao ? 'Atualizar' : 'Criar' }} Campanha
                  </span>
                  <mat-spinner diameter="20" *ngIf="loading"></mat-spinner>
                </button>
              </div>
            </div>
          </div>
        </mat-step>
      </mat-stepper>
    </div>
  `
})
export class CampanhaFormComponent implements OnInit {
  passo1Form: FormGroup;
  passo2Form: FormGroup;
  isEdicao = false;
  loading = false;
  empresas: Empresa[] = [];
  campanhaId?: number;

  constructor(
    private fb: FormBuilder,
    private empresaService: EmpresaService,
    private campanhaService: CampanhaService,
    private route: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    // Formulário Passo 1
    this.passo1Form = this.fb.group({
      nome: ['', Validators.required],
      empresaId: ['', Validators.required],
      tipo: ['EMAIL', Validators.required],
      status: ['RASCUNHO', Validators.required],
      orcamento: [null],
      publicoAlvo: [''],
      descricao: ['']
    });

    // Formulário Passo 2
    this.passo2Form = this.fb.group({
      dataInicio: [null],
      dataFim: [null],
      metaAlcance: [null],
      metaConversoes: [null],
      metaROI: [null]
    });
  }

  ngOnInit() {
    this.carregarEmpresas();

    this.route.params.subscribe(params => {
      if (params['id']) {
        this.isEdicao = true;
        this.campanhaId = +params['id'];
        this.carregarCampanha(this.campanhaId);
      }
    });
  }

  carregarEmpresas() {
    this.empresaService.listar(0, 100).subscribe({
      next: (response) => {
        this.empresas = response.content;
      },
      error: (error) => {
        this.snackBar.open('Erro ao carregar empresas', 'Fechar', { duration: 3000 });
      }
    });
  }

  carregarCampanha(id: number) {
    this.loading = true;
    this.campanhaService.buscar(id).subscribe({
      next: (campanha) => {
        // Preencher Passo 1
        this.passo1Form.patchValue({
          nome: campanha.nome,
          empresaId: campanha.empresaId,
          tipo: campanha.tipo,
          status: campanha.status,
          orcamento: campanha.orcamento,
          publicoAlvo: campanha.publicoAlvo,
          descricao: campanha.descricao
        });

        // Preencher Passo 2
        this.passo2Form.patchValue({
          dataInicio: campanha.dataInicio ? new Date(campanha.dataInicio) : null,
          dataFim: campanha.dataFim ? new Date(campanha.dataFim) : null,
          metaAlcance: campanha.metricas?.alcance,
          metaConversoes: campanha.metricas?.conversoes,
          metaROI: campanha.metricas?.roi
        });

        this.loading = false;
      },
      error: (error) => {
        this.snackBar.open('Erro ao carregar campanha', 'Fechar', { duration: 3000 });
        this.router.navigate(['/campanhas']);
        this.loading = false;
      }
    });
  }

  // Navegação entre passos
  avancarParaPasso2() {
    if (this.passo1Form.valid) {
      // Lógica para avançar para o passo 2
      // O stepper já cuida disso automaticamente
    }
  }

  voltarParaPasso1() {
    // Lógica para voltar para o passo 1
  }

  avancarParaPasso3() {
    if (this.passo2Form.valid) {
      // Lógica para avançar para o passo 3
    }
  }

  voltarParaPasso2() {
    // Lógica para voltar para o passo 2
  }

  // Métodos auxiliares
  calcularDuracao(): string {
    const inicio = this.passo2Form.get('dataInicio')?.value;
    const fim = this.passo2Form.get('dataFim')?.value;

    if (!inicio || !fim) {
      return 'Período não definido';
    }

    const diffMs = new Date(fim).getTime() - new Date(inicio).getTime();
    const diffDias = Math.ceil(diffMs / (1000 * 60 * 60 * 24));

    if (diffDias === 1) return '1 dia';
    if (diffDias < 30) return `${diffDias} dias`;
    if (diffDias < 365) return `${Math.floor(diffDias / 30)} meses`;
    return `${Math.floor(diffDias / 365)} anos`;
  }

  getNomeEmpresa(empresaId: number): string {
    const empresa = this.empresas.find(e => e.id === empresaId);
    return empresa ? empresa.razaoSocial : 'Empresa não encontrada';
  }

  getTipoLabel(tipo: string): string {
    switch(tipo) {
      case 'EMAIL': return 'Email Marketing';
      case 'SOCIAL_MEDIA': return 'Social Media';
      case 'ADS': return 'Google/Facebook Ads';
      case 'OUTROS': return 'Outros';
      default: return tipo;
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

  // Salvar campanha
  salvarCampanha() {
    if (this.passo1Form.invalid || this.passo2Form.invalid) {
      this.snackBar.open('Preencha todos os campos obrigatórios', 'Fechar', { duration: 3000 });
      return;
    }

    this.loading = true;

    // Combina dados dos dois passos
    const campanhaData: Campanha = {
      ...this.passo1Form.value,
      ...this.passo2Form.value,
      metricas: {
        alcance: this.passo2Form.get('metaAlcance')?.value || 0,
        conversoes: this.passo2Form.get('metaConversoes')?.value || 0,
        roi: this.passo2Form.get('metaROI')?.value || 0
      }
    };

    const operacao = this.isEdicao && this.campanhaId
      ? this.campanhaService.atualizar(this.campanhaId, campanhaData)
      : this.campanhaService.criar(campanhaData);

    operacao.subscribe({
      next: (campanha) => {
        this.snackBar.open(
          `Campanha ${this.isEdicao ? 'atualizada' : 'criada'} com sucesso!`,
          'Fechar',
          { duration: 3000 }
        );
        this.router.navigate(['/campanhas']);
      },
      error: (error) => {
        this.snackBar.open(
          `Erro ao ${this.isEdicao ? 'atualizar' : 'criar'} campanha`,
          'Fechar',
          { duration: 3000 }
        );
        this.loading = false;
      }
    });
  }
}
