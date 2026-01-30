// src/features/analytics/analytics.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-analytics',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatIconModule],
  template: `
    <div class="p-6">
      <h1 class="text-3xl font-bold text-gray-900 mb-2">Analytics</h1>
      <p class="text-gray-600 mb-6">Análises avançadas e insights do seu negócio</p>

      <mat-card class="p-12 text-center">
        <div class="w-24 h-24 rounded-full bg-cyan-50 flex items-center justify-center mx-auto mb-6">
          <mat-icon class="text-5xl text-cyan-500">insights</mat-icon>
        </div>
        <h2 class="text-xl font-bold text-gray-800 mb-2">Em Construção</h2>
        <p class="text-gray-600">Este módulo está sendo desenvolvido.</p>
      </mat-card>
    </div>
  `
})
export class AnalyticsComponent {}
