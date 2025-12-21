// src/app/app.component.ts - VERSÃO MODERNA
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatBadgeModule } from '@angular/material/badge';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    MatButtonModule,
    MatIconModule,
    MatSidenavModule,
    MatToolbarModule,
    MatListModule,
    MatMenuModule,
    MatBadgeModule
  ],
  template: `
    <!-- Layout Moderno -->
    <div class="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <!-- Sidebar Elegante -->
      <div class="fixed left-0 top-0 h-screen w-64 bg-gradient-to-b from-white to-blue-50/50 shadow-xl border-r border-blue-100 z-50">
        <!-- Logo -->
        <div class="p-6 border-b border-blue-100">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 rounded-lg gradient-primary flex items-center justify-center shadow-lg">
              <mat-icon class="text-white">rocket_launch</mat-icon>
            </div>
            <div>
              <h1 class="text-xl font-bold bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
                MarketingPro
              </h1>
              <p class="text-xs text-gray-500">CRM Inteligente</p>
            </div>
          </div>
        </div>

        <!-- Menu -->
        <nav class="p-4">
          <div class="mb-8">
            <h3 class="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4 px-3">GERAL</h3>
            <div class="space-y-1">
              <a routerLink="/dashboard" routerLinkActive="bg-gradient-to-r from-blue-500/10 to-cyan-500/10 text-blue-600 border-r-4 border-blue-500"
                 class="flex items-center gap-3 px-4 py-3 rounded-lg transition-all hover:bg-blue-50 hover:translate-x-1 group">
                <div class="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center group-hover:bg-blue-200 transition-colors">
                  <mat-icon class="text-blue-600 text-sm">dashboard</mat-icon>
                </div>
                <span class="font-medium">Dashboard</span>
              </a>

              <a routerLink="/empresas" routerLinkActive="bg-gradient-to-r from-blue-500/10 to-cyan-500/10 text-blue-600 border-r-4 border-blue-500"
                 class="flex items-center gap-3 px-4 py-3 rounded-lg transition-all hover:bg-blue-50 hover:translate-x-1 group">
                <div class="w-8 h-8 rounded-lg bg-emerald-100 flex items-center justify-center group-hover:bg-emerald-200 transition-colors">
                  <mat-icon class="text-emerald-600 text-sm">business</mat-icon>
                </div>
                <span class="font-medium">Empresas</span>
                <span class="ml-auto bg-blue-100 text-blue-600 text-xs px-2 py-1 rounded-full">5</span>
              </a>

              <a routerLink="/clientes" routerLinkActive="bg-gradient-to-r from-blue-500/10 to-cyan-500/10 text-blue-600 border-r-4 border-blue-500"
                 class="flex items-center gap-3 px-4 py-3 rounded-lg transition-all hover:bg-blue-50 hover:translate-x-1 group">
                <div class="w-8 h-8 rounded-lg bg-purple-100 flex items-center justify-center group-hover:bg-purple-200 transition-colors">
                  <mat-icon class="text-purple-600 text-sm">people</mat-icon>
                </div>
                <span class="font-medium">Clientes</span>
                <span class="ml-auto bg-purple-100 text-purple-600 text-xs px-2 py-1 rounded-full">12</span>
              </a>

              <a routerLink="/campanhas" routerLinkActive="bg-gradient-to-r from-blue-500/10 to-cyan-500/10 text-blue-600 border-r-4 border-blue-500"
                 class="flex items-center gap-3 px-4 py-3 rounded-lg transition-all hover:bg-blue-50 hover:translate-x-1 group">
                <div class="w-8 h-8 rounded-lg bg-amber-100 flex items-center justify-center group-hover:bg-amber-200 transition-colors">
                  <mat-icon class="text-amber-600 text-sm">campaign</mat-icon>
                </div>
                <span class="font-medium">Campanhas</span>
                <span class="ml-auto bg-amber-100 text-amber-600 text-xs px-2 py-1 rounded-full">3</span>
              </a>
            </div>
          </div>

          <!-- Outras seções -->
          <div class="mb-8">
            <h3 class="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4 px-3">ANÁLISE</h3>
            <div class="space-y-1">
              <a routerLink="/relatorios" routerLinkActive="bg-gradient-to-r from-blue-500/10 to-cyan-500/10 text-blue-600 border-r-4 border-blue-500"
                 class="flex items-center gap-3 px-4 py-3 rounded-lg transition-all hover:bg-blue-50 hover:translate-x-1 group">
                <mat-icon class="text-gray-500">assessment</mat-icon>
                <span>Relatórios</span>
              </a>
              <a routerLink="/analytics" routerLinkActive="bg-gradient-to-r from-blue-500/10 to-cyan-500/10 text-blue-600 border-r-4 border-blue-500"
                 class="flex items-center gap-3 px-4 py-3 rounded-lg transition-all hover:bg-blue-50 hover:translate-x-1 group">
                <mat-icon class="text-gray-500">insights</mat-icon>
                <span>Analytics</span>
              </a>
            </div>
          </div>
        </nav>

        <!-- Usuário -->
        <div class="absolute bottom-0 left-0 right-0 p-4 border-t border-blue-100">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center">
              <span class="text-white font-semibold">WP</span>
            </div>
            <div class="flex-1">
              <p class="font-medium text-sm">Werne Padilha</p>
              <p class="text-xs text-gray-500">Admin</p>
            </div>
            <button mat-icon-button [matMenuTriggerFor]="userMenu" class="text-gray-400 hover:text-gray-600">
              <mat-icon>more_vert</mat-icon>
            </button>
          </div>
        </div>
      </div>

      <!-- Conteúdo Principal -->
      <div class="ml-64 min-h-screen">
        <!-- Top Bar Moderna -->
        <header class="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-gray-100 shadow-sm">
          <div class="px-8 py-4 flex items-center justify-between">
            <div class="flex items-center gap-4">
              <div class="hidden md:block">
                <h2 class="text-lg font-semibold text-gray-800">Bem-vindo de volta, Werne! 👋</h2>
                <p class="text-sm text-gray-500">Aqui está o que está acontecendo hoje</p>
              </div>
            </div>

            <div class="flex items-center gap-4">
              <!-- Notificações -->
              <button mat-icon-button class="relative text-gray-500 hover:text-blue-600">
                <mat-icon>notifications</mat-icon>
                <span class="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">3</span>
              </button>

              <!-- Busca -->
              <div class="relative hidden md:block">
                <mat-icon class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">search</mat-icon>
                <input type="text" placeholder="Buscar..."
                       class="pl-10 pr-4 py-2 bg-gray-50 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-64">
              </div>

              <!-- Data -->
              <div class="hidden lg:block px-4 py-2 bg-blue-50 rounded-lg">
                <p class="text-sm font-medium text-blue-600">{{ currentDate | date:'EEEE, d MMMM' }}</p>
              </div>
            </div>
          </div>
        </header>

        <!-- Conteúdo -->
        <main class="p-8">
          <router-outlet></router-outlet>
        </main>
      </div>
    </div>

    <!-- Menu do Usuário -->
    <mat-menu #userMenu="matMenu">
      <button mat-menu-item>
        <mat-icon>person</mat-icon>
        <span>Meu Perfil</span>
      </button>
      <button mat-menu-item>
        <mat-icon>settings</mat-icon>
        <span>Configurações</span>
      </button>
      <button mat-menu-item>
        <mat-icon>help</mat-icon>
        <span>Ajuda</span>
      </button>
      <div class="h-px bg-gray-200 my-1"></div>
      <button mat-menu-item (click)="logout()" class="text-red-600">
        <mat-icon>logout</mat-icon>
        <span>Sair</span>
      </button>
    </mat-menu>
  `,
  styles: [`
    :host {
      display: block;
      min-height: 100vh;
    }

    .router-link-active {
      position: relative;
    }

    .router-link-active::before {
      content: '';
      position: absolute;
      left: 0;
      top: 50%;
      transform: translateY(-50%);
      width: 3px;
      height: 24px;
      background: linear-gradient(to bottom, #0ea5e9, #0284c7);
      border-radius: 0 3px 3px 0;
    }
  `]
})
export class AppComponent {
  currentDate = new Date();

  logout() {
    localStorage.removeItem('access_token');
    window.location.href = '/login';
  }
}
