// src/features/empresas/components/empresa-form/empresa-form.component.ts
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatToolbarModule } from '@angular/material/toolbar';
import { EmpresaService } from '../../services/empresa.service';
import { Empresa } from '../../../../core/models/empresa.model';

@Component({
  selector: 'app-empresa-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterLink,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatSelectModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
    MatToolbarModule
  ],
  template: `
    <div class="p-6">
      <div class="mb-6">
        <div class="flex items-center gap-4 mb-2">
          <button mat-icon-button routerLink="/empresas">
            <mat-icon>arrow_back</mat-icon>
          </button>
          <h1 class="text-3xl font-bold">
            {{ isEdicao ? 'Editar Empresa' : 'Nova Empresa' }}
          </h1>
        </div>
        <p class="text-gray-600 ml-14">
          {{ isEdicao ? 'Atualize os dados da empresa' : 'Preencha os dados para cadastrar uma nova empresa' }}
        </p>
      </div>

      <form [formGroup]="empresaForm" (ngSubmit)="onSubmit()" class="space-y-6">
        <mat-card class="p-6">
          <h2 class="text-xl font-bold mb-6 text-gray-800">Informações Básicas</h2>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <!-- Razão Social -->
            <mat-form-field class="w-full">
              <mat-label>Razão Social *</mat-label>
              <input matInput formControlName="razaoSocial" placeholder="Ex: Tech Solutions Ltda">
              <mat-icon matSuffix class="text-green-500" *ngIf="razaoSocial.valid && razaoSocial.touched">check_circle</mat-icon>
              <mat-error *ngIf="razaoSocial.hasError('required')">
                Razão social é obrigatória
              </mat-error>
            </mat-form-field>

            <!-- Nome Fantasia -->
            <mat-form-field class="w-full">
              <mat-label>Nome Fantasia</mat-label>
              <input matInput formControlName="nomeFantasia" placeholder="Ex: Tech Solutions">
              <mat-icon matSuffix class="text-green-500" *ngIf="nomeFantasia.valid && nomeFantasia.touched">check_circle</mat-icon>
            </mat-form-field>

            <!-- CNPJ com Máscara Manual -->
            <mat-form-field class="w-full">
              <mat-label>CNPJ *</mat-label>
              <input
                matInput
                formControlName="cnpj"
                placeholder="00.000.000/0000-00"
                (input)="aplicarMascaraCNPJ($event)"
                maxlength="18">
              <mat-icon matSuffix class="text-green-500" *ngIf="cnpj.valid && cnpj.touched">check_circle</mat-icon>
              <mat-icon matSuffix class="text-red-500" *ngIf="cnpj.invalid && cnpj.touched">error</mat-icon>
              <mat-error *ngIf="cnpj.hasError('required')">
                CNPJ é obrigatório
              </mat-error>
              <mat-error *ngIf="cnpj.hasError('cnpjInvalido')">
                CNPJ inválido
              </mat-error>
              <mat-hint *ngIf="!cnpj.touched">Digite apenas números, a máscara será aplicada automaticamente</mat-hint>
            </mat-form-field>

            <!-- Setor -->
            <mat-form-field class="w-full">
              <mat-label>Setor</mat-label>
              <mat-select formControlName="setor">
                <mat-option value="">Selecione um setor</mat-option>
                <mat-option value="Tecnologia">Tecnologia</mat-option>
                <mat-option value="Marketing">Marketing</mat-option>
                <mat-option value="Construção Civil">Construção Civil</mat-option>
                <mat-option value="Alimentício">Alimentício</mat-option>
                <mat-option value="Consultoria">Consultoria</mat-option>
                <mat-option value="Educação">Educação</mat-option>
                <mat-option value="Saúde">Saúde</mat-option>
                <mat-option value="Varejo">Varejo</mat-option>
                <mat-option value="Outro">Outro</mat-option>
              </mat-select>
            </mat-form-field>
          </div>
        </mat-card>

        <mat-card class="p-6">
          <h2 class="text-xl font-bold mb-6 text-gray-800">Endereço</h2>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <!-- CEP com busca automática -->
            <mat-form-field class="w-full">
              <mat-label>CEP</mat-label>
              <input
                matInput
                formControlName="cep"
                placeholder="00000-000"
                (input)="aplicarMascaraCEP($event)"
                (blur)="buscarCEP()"
                maxlength="9">
              <mat-icon matSuffix class="cursor-pointer text-blue-500" (click)="buscarCEP()" *ngIf="!buscandoCEP">search</mat-icon>
              <mat-spinner matSuffix diameter="20" *ngIf="buscandoCEP"></mat-spinner>
              <mat-hint *ngIf="!cep.touched">Digite o CEP e pressione Enter para buscar automaticamente</mat-hint>
            </mat-form-field>

            <div></div>

            <!-- Logradouro -->
            <mat-form-field class="w-full">
              <mat-label>Logradouro</mat-label>
              <input matInput formControlName="logradouro" placeholder="Ex: Rua das Flores">
            </mat-form-field>

            <!-- Número -->
            <mat-form-field class="w-full">
              <mat-label>Número</mat-label>
              <input matInput formControlName="numero" placeholder="Ex: 123">
            </mat-form-field>

            <!-- Complemento -->
            <mat-form-field class="w-full">
              <mat-label>Complemento</mat-label>
              <input matInput formControlName="complemento" placeholder="Ex: Sala 45">
            </mat-form-field>

            <!-- Bairro -->
            <mat-form-field class="w-full">
              <mat-label>Bairro</mat-label>
              <input matInput formControlName="bairro" placeholder="Ex: Centro">
            </mat-form-field>

            <!-- Cidade -->
            <mat-form-field class="w-full">
              <mat-label>Cidade</mat-label>
              <input matInput formControlName="cidade" placeholder="Ex: São Paulo">
            </mat-form-field>

            <!-- UF -->
            <mat-form-field class="w-full">
              <mat-label>UF</mat-label>
              <mat-select formControlName="uf">
                <mat-option value="">Selecione</mat-option>
                <mat-option *ngFor="let estado of estados" [value]="estado">{{estado}}</mat-option>
              </mat-select>
            </mat-form-field>
          </div>
        </mat-card>

        <mat-card class="p-6">
          <h2 class="text-xl font-bold mb-6 text-gray-800">Outras Informações</h2>

          <!-- Observação -->
          <mat-form-field class="w-full">
            <mat-label>Observação</mat-label>
            <textarea
              matInput
              formControlName="observacao"
              rows="4"
              placeholder="Observações adicionais sobre a empresa..."
              maxlength="1000"></textarea>
            <mat-hint align="end">{{observacao.value?.length || 0}}/1000</mat-hint>
          </mat-form-field>

          <!-- Status -->
          <mat-form-field class="w-full">
            <mat-label>Status</mat-label>
            <mat-select formControlName="status">
              <mat-option value="Ativa">Ativa</mat-option>
              <mat-option value="Inativa">Inativa</mat-option>
              <mat-option value="Pendente">Pendente</mat-option>
            </mat-select>
          </mat-form-field>
        </mat-card>

        <!-- Ações -->
        <div class="flex justify-end gap-4 pt-6 border-t">
          <button mat-button type="button" routerLink="/empresas" class="px-6" [disabled]="loading">
            Cancelar
          </button>
          <button
            mat-raised-button
            color="primary"
            type="submit"
            [disabled]="empresaForm.invalid || loading"
            class="px-6">
            <span *ngIf="!loading">
              <mat-icon>{{ isEdicao ? 'save' : 'add' }}</mat-icon>
              {{ isEdicao ? 'Atualizar' : 'Cadastrar' }}
            </span>
            <mat-spinner diameter="20" *ngIf="loading"></mat-spinner>
          </button>
        </div>

        <!-- Debug Info (remover em produção) -->
        <mat-card class="p-4 bg-gray-50" *ngIf="mostrarDebug">
          <div class="text-xs">
            <strong>Status do Formulário:</strong>
            <pre class="mt-2">{{ empresaForm.value | json }}</pre>
            <p class="mt-2"><strong>Válido:</strong> {{ empresaForm.valid ? '✓' : '✗' }}</p>
            <p><strong>Erros:</strong> {{ getErrosFormulario() }}</p>
          </div>
        </mat-card>
      </form>
    </div>
  `
})
export class EmpresaFormComponent implements OnInit {
  empresaForm: FormGroup;
  isEdicao = false;
  loading = false;
  buscandoCEP = false;
  empresaId?: number;
  mostrarDebug = false; // Mude para true para debug

  estados = ['AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA',
             'MT', 'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN',
             'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO'];

  constructor(
    private fb: FormBuilder,
    private empresaService: EmpresaService,
    private route: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar,
    private cdr: ChangeDetectorRef
  ) {
    this.empresaForm = this.fb.group({
      razaoSocial: ['', [Validators.required, Validators.minLength(3)]],
      nomeFantasia: [''],
      cnpj: ['', [Validators.required, this.validarCNPJ.bind(this)]],
      setor: [''],
      logradouro: [''],
      numero: [''],
      complemento: [''],
      bairro: [''],
      cidade: [''],
      uf: [''],
      cep: [''],
      observacao: ['', Validators.maxLength(1000)],
      status: ['Ativa']
    });
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.isEdicao = true;
        this.empresaId = +params['id'];
        this.carregarEmpresa(this.empresaId);
      }
    });
  }

  // Getters para facilitar acesso aos controles
  get razaoSocial() { return this.empresaForm.get('razaoSocial')!; }
  get nomeFantasia() { return this.empresaForm.get('nomeFantasia')!; }
  get cnpj() { return this.empresaForm.get('cnpj')!; }
  get cep() { return this.empresaForm.get('cep')!; }
  get observacao() { return this.empresaForm.get('observacao')!; }

  // Validador customizado de CNPJ
  validarCNPJ(control: any) {
    const cnpj = control.value?.replace(/\D/g, '');

    if (!cnpj || cnpj.length !== 14) {
      return { cnpjInvalido: true };
    }

    // Valida se todos dígitos são iguais
    if (/^(\d)\1+$/.test(cnpj)) {
      return { cnpjInvalido: true };
    }

    // Valida dígitos verificadores
    let tamanho = cnpj.length - 2;
    let numeros = cnpj.substring(0, tamanho);
    const digitos = cnpj.substring(tamanho);
    let soma = 0;
    let pos = tamanho - 7;

    for (let i = tamanho; i >= 1; i--) {
      soma += parseInt(numeros.charAt(tamanho - i)) * pos--;
      if (pos < 2) pos = 9;
    }

    let resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);
    if (resultado !== parseInt(digitos.charAt(0))) return { cnpjInvalido: true };

    tamanho = tamanho + 1;
    numeros = cnpj.substring(0, tamanho);
    soma = 0;
    pos = tamanho - 7;

    for (let i = tamanho; i >= 1; i--) {
      soma += parseInt(numeros.charAt(tamanho - i)) * pos--;
      if (pos < 2) pos = 9;
    }

    resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);
    if (resultado !== parseInt(digitos.charAt(1))) return { cnpjInvalido: true };

    return null;
  }

  // Aplica máscara de CNPJ enquanto digita
  aplicarMascaraCNPJ(event: any) {
    let valor = event.target.value.replace(/\D/g, '');

    if (valor.length > 14) valor = valor.substring(0, 14);

    if (valor.length <= 2) {
      valor = valor;
    } else if (valor.length <= 5) {
      valor = valor.replace(/(\d{2})(\d{0,3})/, '$1.$2');
    } else if (valor.length <= 8) {
      valor = valor.replace(/(\d{2})(\d{3})(\d{0,3})/, '$1.$2.$3');
    } else if (valor.length <= 12) {
      valor = valor.replace(/(\d{2})(\d{3})(\d{3})(\d{0,4})/, '$1.$2.$3/$4');
    } else {
      valor = valor.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{0,2})/, '$1.$2.$3/$4-$5');
    }

    event.target.value = valor;
    this.cnpj.setValue(valor, { emitEvent: false });
  }

  // Aplica máscara de CEP enquanto digita
  aplicarMascaraCEP(event: any) {
    let valor = event.target.value.replace(/\D/g, '');

    if (valor.length > 8) valor = valor.substring(0, 8);

    if (valor.length > 5) {
      valor = valor.replace(/(\d{5})(\d{0,3})/, '$1-$2');
    }

    event.target.value = valor;
    this.cep.setValue(valor, { emitEvent: false });
  }

  // Busca CEP via ViaCEP
  buscarCEP() {
    const cepValue = this.cep.value?.replace(/\D/g, '');

    if (!cepValue || cepValue.length !== 8) return;

    this.buscandoCEP = true;

    fetch(`https://viacep.com.br/ws/${cepValue}/json/`)
      .then(response => response.json())
      .then(data => {
        if (!data.erro) {
          this.empresaForm.patchValue({
            logradouro: data.logradouro,
            bairro: data.bairro,
            cidade: data.localidade,
            uf: data.uf
          });
          this.snackBar.open('CEP encontrado!', 'Fechar', { duration: 2000 });
        } else {
          this.snackBar.open('CEP não encontrado', 'Fechar', { duration: 3000 });
        }
        this.buscandoCEP = false;
        this.cdr.detectChanges();
      })
      .catch(error => {
        this.snackBar.open('Erro ao buscar CEP', 'Fechar', { duration: 3000 });
        this.buscandoCEP = false;
        this.cdr.detectChanges();
      });
  }

  carregarEmpresa(id: number) {
    this.loading = true;
    this.empresaService.buscar(id).subscribe({
      next: (empresa) => {
        this.empresaForm.patchValue(empresa);
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: (error) => {
        this.snackBar.open('Erro ao carregar empresa', 'Fechar', { duration: 3000 });
        this.router.navigate(['/empresas']);
        this.loading = false;
      }
    });
  }

  onSubmit() {
    if (this.empresaForm.invalid) {
      this.empresaForm.markAllAsTouched();
      this.snackBar.open('Por favor, corrija os erros no formulário', 'Fechar', { duration: 3000 });
      return;
    }

    this.loading = true;
    const empresaData = this.empresaForm.value;

    const operacao = this.isEdicao && this.empresaId
      ? this.empresaService.atualizar(this.empresaId, empresaData)
      : this.empresaService.criar(empresaData);

    operacao.subscribe({
      next: (empresa) => {
        this.snackBar.open(
          `✓ Empresa ${this.isEdicao ? 'atualizada' : 'cadastrada'} com sucesso!`,
          'Fechar',
          { duration: 3000 }
        );
        this.router.navigate(['/empresas']);
      },
      error: (error) => {
        console.error('Erro:', error);

        // Trata erros de validação do backend
        if (error.status === 400 && error.error?.errors) {
          const erros = Object.entries(error.error.errors)
            .map(([campo, mensagem]) => `${campo}: ${mensagem}`)
            .join('\n');
          this.snackBar.open(`Erro de validação:\n${erros}`, 'Fechar', { duration: 5000 });
        } else if (error.status === 409) {
          this.snackBar.open('✗ CNPJ já cadastrado', 'Fechar', { duration: 3000 });
        } else {
          this.snackBar.open(
            `✗ Erro ao ${this.isEdicao ? 'atualizar' : 'cadastrar'} empresa`,
            'Fechar',
            { duration: 3000 }
          );
        }

        this.loading = false;
        this.cdr.detectChanges();
      }
    });
  }

  getErrosFormulario(): string {
    const erros: string[] = [];
    Object.keys(this.empresaForm.controls).forEach(key => {
      const control = this.empresaForm.get(key);
      if (control?.errors) {
        erros.push(`${key}: ${JSON.stringify(control.errors)}`);
      }
    });
    return erros.join(', ') || 'Nenhum';
  }
}
