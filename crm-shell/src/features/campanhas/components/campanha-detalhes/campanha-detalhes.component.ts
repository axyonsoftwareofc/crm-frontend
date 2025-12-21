import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-campanha-detalhes',
  standalone: true,
  imports: [CommonModule, RouterLink, MatCardModule, MatButtonModule, MatIconModule],
  template: `
    <div>
      <div class="flex items-center gap-4 mb-6">
        <button mat-icon-button routerLink="/campanhas">
          <mat-icon>arrow_back</mat-icon>
        </button>
        <h2 class="text-2xl font-bold text-gray-800">Detalhes da Campanha</h2>
      </div>
      
      <mat-card class="p-6">
        <p class="text-gray-600 mb-4">Página de detalhes - Em construção</p>
        <button mat-button routerLink="/campanhas" class="mr-2">Voltar</button>
        <button mat-raised-button color="primary" routerLink="/campanhas/editar/1">Editar</button>
      </mat-card>
    </div>
  `
})
export class CampanhaDetalhesComponent {}
