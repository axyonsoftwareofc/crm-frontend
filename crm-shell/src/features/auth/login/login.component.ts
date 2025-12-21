// Atualize src/features/auth/login/login.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
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
    MatProgressSpinnerModule
  ],
  template: `
    <div class="flex items-center justify-center h-screen bg-gray-100">
      <mat-card class="w-96 p-6">
        <h2 class="text-2xl font-bold mb-6 text-center">Login CRM</h2>

        <form (ngSubmit)="onSubmit()" #loginForm="ngForm">
          <mat-form-field class="w-full mb-4">
            <mat-label>Usuário</mat-label>
            <input matInput [(ngModel)]="username" name="username" required>
            <mat-error *ngIf="loginForm.submitted && !username">
              Usuário é obrigatório
            </mat-error>
          </mat-form-field>

          <mat-form-field class="w-full mb-6">
            <mat-label>Senha</mat-label>
            <input matInput type="password" [(ngModel)]="password" name="password" required>
            <mat-error *ngIf="loginForm.submitted && !password">
              Senha é obrigatória
            </mat-error>
          </mat-form-field>

          <div *ngIf="error" class="mb-4 p-3 bg-red-50 text-red-700 rounded">
            {{ error }}
          </div>

          <button
            mat-raised-button
            color="primary"
            class="w-full"
            type="submit"
            [disabled]="loading">
            <span *ngIf="!loading">Entrar</span>
            <mat-spinner diameter="20" *ngIf="loading"></mat-spinner>
          </button>
        </form>
      </mat-card>
    </div>
  `
})
export class LoginComponent {
  username = '';
  password = '';
  loading = false;
  error = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  onSubmit() {
    this.loading = true;
    this.error = '';

    this.authService.login({
      username: this.username,
      password: this.password
    }).subscribe({
      next: () => {
        this.router.navigate(['/dashboard']);
      },
      error: (err) => {
        this.error = 'Usuário ou senha inválidos';
        this.loading = false;
      }
    });
  }
}
