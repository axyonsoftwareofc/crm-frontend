// src/core/guards/auth.guard.ts
import { inject } from '@angular/core';
import { Router, CanActivateFn, CanActivateChildFn } from '@angular/router';
import { AuthService } from '../services/auth.service';

/**
 * Guard para proteger rotas que exigem autenticação
 * Uso: canActivate: [authGuard]
 */
export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const token = authService.getToken();

  if (token && !isTokenExpired(token)) {
    return true;
  }

  // Salva a URL que o usuário tentou acessar para redirecionamento após login
  const redirectUrl = state.url;

  // Remove token inválido/expirado se existir
  if (token) {
    authService.logout();
  }

  // Redireciona para login com query param da URL original
  return router.createUrlTree(['/login'], {
    queryParams: { returnUrl: redirectUrl }
  });
};

/**
 * Guard para proteger rotas filhas
 * Uso: canActivateChild: [authGuardChild]
 */
export const authGuardChild: CanActivateChildFn = (childRoute, state) => {
  return authGuard(childRoute, state);
};

/**
 * Guard para rotas públicas (redireciona usuário logado para dashboard)
 * Uso: canActivate: [publicGuard] - aplicar na rota de login
 */
export const publicGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const token = authService.getToken();

  if (token && !isTokenExpired(token)) {
    // Usuário já está logado, redireciona para dashboard
    return router.createUrlTree(['/dashboard']);
  }

  return true;
};

/**
 * Verifica se o token JWT está expirado
 */
function isTokenExpired(token: string): boolean {
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    const expiry = payload.exp;

    if (!expiry) {
      return false; // Token sem expiração
    }

    // exp está em segundos, Date.now() em milissegundos
    const now = Math.floor(Date.now() / 1000);
    return expiry < now;
  } catch (e) {
    // Token malformado
    return true;
  }
}
