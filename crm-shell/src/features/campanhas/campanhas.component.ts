// src/features/campanhas/campanhas.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-campanhas',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  template: `
    <div class="p-6">
      <h1 class="text-3xl font-bold text-gray-900 mb-2">Campanhas de Marketing</h1>
      <p class="text-gray-600 mb-6">Gerencie todas as campanhas das empresas clientes</p>
      <router-outlet></router-outlet>
    </div>
  `
})
export class CampanhasComponent {}
