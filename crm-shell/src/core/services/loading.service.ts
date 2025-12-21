// src/core/services/loading.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  private loadingSubject = new BehaviorSubject<boolean>(false);
  private loadingMap = new Map<string, boolean>();

  isLoading$: Observable<boolean> = this.loadingSubject.asObservable();

  /**
   * Ativa loading global
   */
  show(key: string = 'global'): void {
    this.loadingMap.set(key, true);
    this.updateLoadingStatus();
  }

  /**
   * Desativa loading global
   */
  hide(key: string = 'global'): void {
    this.loadingMap.delete(key);
    this.updateLoadingStatus();
  }

  /**
   * Verifica se está carregando
   */
  isLoading(key?: string): boolean {
    if (key) {
      return this.loadingMap.has(key);
    }
    return this.loadingMap.size > 0;
  }

  /**
   * Limpa todos os loadings
   */
  clear(): void {
    this.loadingMap.clear();
    this.loadingSubject.next(false);
  }

  private updateLoadingStatus(): void {
    this.loadingSubject.next(this.loadingMap.size > 0);
  }
}

// Uso no componente:
// constructor(private loadingService: LoadingService) {}
//
// salvar() {
//   this.loadingService.show('salvando-empresa');
//   this.service.salvar().subscribe({
//     next: () => this.loadingService.hide('salvando-empresa'),
//     error: () => this.loadingService.hide('salvando-empresa')
//   });
// }
