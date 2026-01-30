// src/features/auth/login/login.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatIconModule
  ],
  template: `
    <div class="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-cyan-50 p-4">
      <mat-card class="w-full max-w-md p-8 shadow-2xl">
        <!-- Logo -->
        <div class="text-center mb-8">
          <div class="w-16 h-16 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center mx-auto mb-4 shadow-lg">
            <mat-icon class="text-white text-3xl">rocket_launch</mat-icon>
          </div>
          <h1 class="text-2xl font-bold bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
            MarketingPro
          </h1>
          <p class="text-gray-500 text-sm mt-1">CRM Inteligente</p>
        </div>

        <h2 class="text-xl font-semibold text-gray-800 mb-6 text-center">Entrar na sua conta</h2>

        <form (ngSubmit)="onSubmit()" #loginForm="ngForm">
          <!-- Usuário -->
          <mat-form-field class="w-full mb-4" appearance="outline">
            <mat-label>Usuário</mat-label>
            <mat-icon matPrefix class="text-gray-400 mr-2">person</mat-icon>
            <input matInput
                   [(ngModel)]="username"
                   name="username"
                   required
                   [disabled]="loading"
                   autocomplete="username">
            <mat-error *ngIf="loginForm.submitted && !username">
              Usuário é obrigatório
            </mat-error>
          </mat-form-field>

          <!-- Senha -->
          <mat-form-field class="w-full mb-6" appearance="outline">
            <mat-label>Senha</mat-label>
            <mat-icon matPrefix class="text-gray-400 mr-2">lock</mat-icon>
            <input matInput
                   [type]="hidePassword ? 'password' : 'text'"
                   [(ngModel)]="password"
                   name="password"
                   required
                   [disabled]="loading"
                   autocomplete="current-password">
            <button mat-icon-button matSuffix (click)="hidePassword = !hidePassword" type="button">
              <mat-icon>{{ hidePassword ? 'visibility_off' : 'visibility' }}</mat-icon>
            </button>
            <mat-error *ngIf="loginForm.submitted && !password">
              Senha é obrigatória
            </mat-error>
          </mat-form-field>

          <!-- Erro -->
          <div *ngIf="error" class="mb-4 p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg flex items-center gap-2">
            <mat-icon class="text-red-500">error</mat-icon>
            <span>{{ error }}</span>
          </div>

          <!-- Botão Submit -->
          <button
            mat-raised-button
            color="primary"
            class="w-full h-12 text-lg"
            type="submit"
            [disabled]="loading">
            <span *ngIf="!loading" class="flex items-center justify-center gap-2">
              <mat-icon>login</mat-icon>
              Entrar
            </span>
            <mat-spinner diameter="24" *ngIf="loading"></mat-spinner>
          </button>
        </form>

        <!-- Footer -->
        <div class="mt-6 text-center text-sm text-gray-500">
          <p>Esqueceu a senha? <a href="#" class="text-blue-600 hover:underline">Recuperar</a></p>
        </div>
      </mat-card>
    </div>
  `
})
export class LoginComponent implements OnInit {
  username = '';
  password = '';
  loading = false;
  error = '';
  hidePassword = true;

  private returnUrl = '/dashboard';

  constructor(
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // Captura a URL de retorno se existir
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/dashboard';
  }

  onSubmit(): void {
    if (!this.username || !this.password) {
      return;
    }

    this.loading = true;
    this.error = '';

    this.authService.login({
      username: this.username,
      password: this.password
    }).subscribe({
      next: () => {
        // Redireciona para a URL original ou dashboard
        this.router.navigateByUrl(this.returnUrl);
      },
      error: (err) => {
        console.error('Erro no login:', err);

        if (err.status === 401) {
          this.error = 'Usuário ou senha inválidos';
        } else if (err.status === 0) {
          this.error = 'Servidor indisponível. Tente novamente.';
        } else {
          this.error = err.error?.message || 'Erro ao fazer login. Tente novamente.';
        }

        this.loading = false;
      }
    });
  }
}
