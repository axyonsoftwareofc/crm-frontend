// src/core/interceptors/http-error.interceptor.ts
import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { catchError, throwError } from 'rxjs';

export const httpErrorInterceptor: HttpInterceptorFn = (req, next) => {
  const snackBar = inject(MatSnackBar);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      let mensagem = 'Erro desconhecido';

      if (error.error instanceof ErrorEvent) {
        // Erro do lado do cliente
        mensagem = `Erro: ${error.error.message}`;
      } else {
        // Erro do lado do servidor
        switch (error.status) {
          case 400:
            if (error.error?.errors) {
              // Erros de validação do backend
              const erros = Object.entries(error.error.errors)
                .map(([campo, msg]) => `${campo}: ${msg}`)
                .join('\n');
              mensagem = `Erro de validação:\n${erros}`;
            } else {
              mensagem = error.error?.message || 'Dados inválidos';
            }
            break;
          case 401:
            mensagem = 'Não autorizado. Faça login novamente.';
            break;
          case 403:
            mensagem = 'Acesso negado';
            break;
          case 404:
            mensagem = 'Recurso não encontrado';
            break;
          case 409:
            mensagem = error.error?.message || 'Conflito: registro já existe';
            break;
          case 500:
            mensagem = 'Erro interno do servidor';
            break;
          default:
            mensagem = `Erro ${error.status}: ${error.message}`;
        }
      }

      // Mostra notificação apenas se não for erro 401 (login)
      if (error.status !== 401) {
        snackBar.open(mensagem, 'Fechar', {
          duration: 5000,
          panelClass: ['error-snackbar']
        });
      }

      return throwError(() => error);
    })
  );
};

// Adicionar no app.config.ts:
// providers: [
//   provideHttpClient(withInterceptors([httpErrorInterceptor]))
// ]
