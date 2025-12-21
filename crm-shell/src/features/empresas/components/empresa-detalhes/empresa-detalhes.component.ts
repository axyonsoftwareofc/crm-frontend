// src/features/empresas/components/empresa-detalhes/empresa-detalhes.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { MatListModule } from '@angular/material/list';
import { MatChipsModule } from '@angular/material/chips';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { EmpresaService } from '../../services/empresa.service';
import { Empresa, EmpresaContato } from '../../../../core/models/empresa.model';

@Component({
  selector: 'app-empresa-detalhes',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatTabsModule,
    MatListModule,
    MatChipsModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
    MatDialogModule
  ],
  template: `
    <div class="p-6">
      <div class="mb-6">
        <div class="flex items-center justify-between mb-4">
          <div class="flex items-center gap-4">
            <button mat-icon-button routerLink="/empresas">
              <mat-icon>arrow_back</mat-icon>
            </button>
            <h1 class="text-3xl font-bold">{{empresa?.razaoSocial}}</h1>
            <span [class]="getStatusClass(empresa?.status)" class="ml-4">
              {{empresa?.status || 'Ativa'}}
            </span>
          </div>
          <div class="flex gap-2">
            <button mat-button routerLink="/empresas/editar/{{empresa?.id}}">
              <mat-icon>edit</mat-icon>
              Editar
            </button>
          </div>
        </div>

        <div class="flex flex-wrap gap-4 text-gray-600 ml-14">
          <div class="flex items-center gap-2">
            <mat-icon class="text-gray-400 text-sm">business</mat-icon>
            <span>{{empresa?.nomeFantasia}}</span>
          </div>
          <div class="flex items-center gap-2">
            <mat-icon class="text-gray-400 text-sm">fingerprint</mat-icon>
            <span>{{empresa?.cnpj}}</span>
          </div>
          <div class="flex items-center gap-2">
            <mat-icon class="text-gray-400 text-sm">category</mat-icon>
            <span>{{empresa?.setor || 'Não informado'}}</span>
          </div>
        </div>
      </div>

      <mat-tab-group>
        <!-- Aba Informações -->
        <mat-tab label="Informações">
          <div class="p-6">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <!-- Informações Básicas -->
              <mat-card>
                <mat-card-header>
                  <mat-card-title class="text-lg font-semibold">
                    <mat-icon class="mr-2">info</mat-icon>
                    Informações Básicas
                  </mat-card-title>
                </mat-card-header>
                <mat-card-content class="pt-4">
                  <div class="space-y-3">
                    <div>
                      <div class="text-sm text-gray-500">Razão Social</div>
                      <div class="font-medium">{{empresa?.razaoSocial}}</div>
                    </div>
                    <div>
                      <div class="text-sm text-gray-500">Nome Fantasia</div>
                      <div class="font-medium">{{empresa?.nomeFantasia || 'Não informado'}}</div>
                    </div>
                    <div>
                      <div class="text-sm text-gray-500">CNPJ</div>
                      <div class="font-medium">{{empresa?.cnpj}}</div>
                    </div>
                    <div>
                      <div class="text-sm text-gray-500">Setor</div>
                      <div class="font-medium">{{empresa?.setor || 'Não informado'}}</div>
                    </div>
                    <div>
                      <div class="text-sm text-gray-500">Data de Cadastro</div>
                      <div class="font-medium">{{empresa?.criadoEm | date:'dd/MM/yyyy HH:mm'}}</div>
                    </div>
                  </div>
                </mat-card-content>
              </mat-card>

              <!-- Endereço -->
              <mat-card>
                <mat-card-header>
                  <mat-card-title class="text-lg font-semibold">
                    <mat-icon class="mr-2">location_on</mat-icon>
                    Endereço
                  </mat-card-title>
                </mat-card-header>
                <mat-card-content class="pt-4">
                  <div class="space-y-3">
                    <div *ngIf="empresa?.logradouro">
                      <div class="text-sm text-gray-500">Logradouro</div>
                      <div class="font-medium">{{empresa?.logradouro}}, {{empresa?.numero}}</div>
                      <div *ngIf="empresa?.complemento" class="text-sm">{{empresa?.complemento}}</div>
                    </div>
                    <div>
                      <div class="text-sm text-gray-500">Bairro</div>
                      <div class="font-medium">{{empresa?.bairro || 'Não informado'}}</div>
                    </div>
                    <div>
                      <div class="text-sm text-gray-500">Cidade/UF</div>
                      <div class="font-medium">{{empresa?.cidade || 'Não informada'}}/{{empresa?.uf || 'Não informado'}}</div>
                    </div>
                    <div>
                      <div class="text-sm text-gray-500">CEP</div>
                      <div class="font-medium">{{empresa?.cep || 'Não informado'}}</div>
                    </div>
                  </div>
                </mat-card-content>
              </mat-card>

              <!-- Observação -->
              <mat-card class="md:col-span-2">
                <mat-card-header>
                  <mat-card-title class="text-lg font-semibold">
                    <mat-icon class="mr-2">notes</mat-icon>
                    Observações
                  </mat-card-title>
                </mat-card-header>
                <mat-card-content class="pt-4">
                  <p class="text-gray-700" *ngIf="empresa?.observacao; else semObservacao">
                    {{empresa?.observacao}}
                  </p>
                  <ng-template #semObservacao>
                    <p class="text-gray-500 italic">Nenhuma observação cadastrada</p>
                  </ng-template>
                </mat-card-content>
              </mat-card>
            </div>
          </div>
        </mat-tab>

        <!-- Aba Contatos -->
        <mat-tab label="Contatos">
          <div class="p-6">
            <div class="flex justify-between items-center mb-6">
              <h2 class="text-xl font-bold">Contatos da Empresa</h2>
              <button mat-raised-button color="primary" (click)="adicionarContato()">
                <mat-icon>add</mat-icon>
                Novo Contato
              </button>
            </div>

            <div *ngIf="carregandoContatos" class="flex justify-center p-8">
              <mat-spinner diameter="40"></mat-spinner>
            </div>

            <div *ngIf="!carregandoContatos && contatos.length === 0" class="text-center py-12">
              <mat-icon class="text-4xl text-gray-400 mb-4">contact_mail</mat-icon>
              <p class="text-gray-500 text-lg mb-4">Nenhum contato cadastrado</p>
              <button mat-raised-button color="primary" (click)="adicionarContato()">
                <mat-icon>add</mat-icon>
                Adicionar primeiro contato
              </button>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" *ngIf="contatos.length > 0">
              <mat-card *ngFor="let contato of contatos" class="hover:shadow-lg transition-shadow">
                <mat-card-header>
                  <mat-card-title class="flex items-center gap-3">
                    <div class="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <mat-icon class="text-blue-600">person</mat-icon>
                    </div>
                    <div>
                      <div class="font-semibold">{{contato.nome}}</div>
                      <div class="text-sm text-gray-500">{{contato.cargo || 'Cargo não informado'}}</div>
                    </div>
                  </mat-card-title>
                </mat-card-header>
                <mat-card-content class="pt-4">
                  <div class="space-y-3">
                    <div *ngIf="contato.email">
                      <div class="text-sm text-gray-500">E-mail</div>
                      <div class="font-medium">{{contato.email}}</div>
                    </div>
                    <div *ngIf="contato.telefone">
                      <div class="text-sm text-gray-500">Telefone</div>
                      <div class="font-medium">{{contato.telefone}}</div>
                    </div>
                    <div *ngIf="contato.criadoEm">
                      <div class="text-sm text-gray-500">Cadastrado em</div>
                      <div class="font-medium text-sm">{{contato.criadoEm | date:'dd/MM/yyyy'}}</div>
                    </div>
                  </div>
                </mat-card-content>
                <mat-card-actions class="justify-end">
                  <button mat-icon-button color="warn" (click)="removerContato(contato.id!)">
                    <mat-icon>delete</mat-icon>
                  </button>
                </mat-card-actions>
              </mat-card>
            </div>
          </div>
        </mat-tab>
      </mat-tab-group>
    </div>
  `,
  styles: [`
    .status-ativa {
      @apply inline-block px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800;
    }
    .status-inativa {
      @apply inline-block px-3 py-1 rounded-full text-sm font-medium bg-red-100 text-red-800;
    }
    .status-pendente {
      @apply inline-block px-3 py-1 rounded-full text-sm font-medium bg-yellow-100 text-yellow-800;
    }
  `]
})
export class EmpresaDetalhesComponent implements OnInit {
  empresa: Empresa | null = null;
  contatos: EmpresaContato[] = [];
  carregando = true;
  carregandoContatos = true;

  constructor(
    private empresaService: EmpresaService,
    private route: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      const id = +params['id'];
      if (id) {
        this.carregarEmpresa(id);
        this.carregarContatos(id);
      }
    });
  }

  carregarEmpresa(id: number) {
    this.carregando = true;
    this.empresaService.buscar(id).subscribe({
      next: (empresa) => {
        this.empresa = empresa;
        this.carregando = false;
      },
      error: (error) => {
        this.snackBar.open('Empresa não encontrada', 'Fechar', { duration: 3000 });
        this.router.navigate(['/empresas']);
        this.carregando = false;
      }
    });
  }

  carregarContatos(empresaId: number) {
    this.carregandoContatos = true;
    this.empresaService.listarContatos(empresaId).subscribe({
      next: (contatos) => {
        this.contatos = contatos;
        this.carregandoContatos = false;
      },
      error: (error) => {
        this.snackBar.open('Erro ao carregar contatos', 'Fechar', { duration: 3000 });
        this.carregandoContatos = false;
      }
    });
  }

  getStatusClass(status?: string): string {
    switch(status?.toLowerCase()) {
      case 'ativa': return 'status-ativa';
      case 'inativa': return 'status-inativa';
      case 'pendente': return 'status-pendente';
      default: return 'status-ativa';
    }
  }

  adicionarContato() {
    // TODO: Implementar modal de adicionar contato
    const nome = prompt('Nome do contato:');
    if (nome && this.empresa) {
      const novoContato: EmpresaContato = {
        nome,
        cargo: prompt('Cargo:') || '',
        email: prompt('E-mail:') || '',
        telefone: prompt('Telefone:') || ''
      };

      this.empresaService.adicionarContato(this.empresa.id!, novoContato).subscribe({
        next: () => {
          this.snackBar.open('Contato adicionado com sucesso', 'Fechar', { duration: 3000 });
          this.carregarContatos(this.empresa!.id!);
        },
        error: (error) => {
          this.snackBar.open('Erro ao adicionar contato', 'Fechar', { duration: 3000 });
        }
      });
    }
  }

  removerContato(contatoId: number) {
    const empresaId = this.empresa?.id;
    if (empresaId == null) {
      console.warn('Empresa não carregada');
      return;
    }

    this.empresaService.removerContato(contatoId, empresaId).subscribe({
      next: () => {
        this.carregarContatos(empresaId); // ✅ agora é um number garantido
      },
      error: (err) => {
        console.error('Erro ao excluir contato:', err);
      }
      });
    }
}
