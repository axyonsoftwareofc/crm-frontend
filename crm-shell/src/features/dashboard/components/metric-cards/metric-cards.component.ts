import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon'; // Adicione esta importação

@Component({
  selector: 'app-metric-cards',
  standalone: true, // Se for componente standalone
  imports: [MatIconModule], // Adicione aqui
  template: `
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <div class="bg-white rounded-xl shadow p-6">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm text-gray-500">Total de Empresas</p>
            <p class="text-3xl font-bold mt-2">45</p>
          </div>
          <mat-icon class="text-blue-500">business</mat-icon> <!-- Correção aqui -->
        </div>
      </div>
      <!-- Mais cards -->
    </div>
  `
})
export class MetricCardsComponent {}
