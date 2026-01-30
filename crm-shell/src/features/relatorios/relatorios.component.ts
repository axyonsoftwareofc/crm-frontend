// src/features/relatorios/relatorios.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-relatorios',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatIconModule],
  template: `
    <div class="p-6">
      <h1 class="text-3xl font-bold text-gray-900 mb-2">Relatórios</h1>
      <p class="text-gray-600 mb-6">Visualize relatórios detalhados do seu CRM</p>

      <mat-card class="p-12 text-center">
        <div class="w-24 h-24 rounded-full bg-purple-50 flex items-center justify-center mx-auto mb-6">
          <mat-icon class="text-5xl text-purple-500">assessment</mat-icon>
        </div>
        <h2 class="text-xl font-bold text-gray-800 mb-2">Em Construção</h2>
        <p class="text-gray-600">Este módulo está sendo desenvolvido.</p>
      </mat-card>
    </div>
  `
})
export class RelatoriosComponent {}
