// src/shared/components/loading-spinner/loading-spinner.component.ts
import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-loading-spinner',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="flex flex-col items-center justify-center p-8" [class.h-screen]="fullScreen">
      <div class="relative">
        <div class="w-16 h-16 border-4 border-blue-100 rounded-full"></div>
        <div class="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin absolute top-0"></div>
      </div>
      <p *ngIf="message" class="mt-4 text-gray-600">{{message}}</p>
    </div>
  `
})
export class LoadingSpinnerComponent {
  @Input() message = 'Carregando...';
  @Input() fullScreen = false;
}
