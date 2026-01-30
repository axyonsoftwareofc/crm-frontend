// src/app/app.routes.ts
import { Routes } from '@angular/router';
import { authGuard, publicGuard } from '@core/guards/auth.guard';

export const routes: Routes = [
  // ========== ROTAS PÚBLICAS ==========
  {
    path: 'login',
    loadComponent: () => import('@features/auth/login/login.component').then(m => m.LoginComponent),
    canActivate: [publicGuard]
  },

  // ========== ROTAS PROTEGIDAS ==========
  {
    path: 'dashboard',
    loadComponent: () => import('@features/dashboard/dashboard.component').then(m => m.DashboardComponent),
    canActivate: [authGuard]
  },
  {
    path: 'empresas',
    loadComponent: () => import('@features/empresas/empresas.component').then(m => m.EmpresasComponent),
    canActivate: [authGuard],
    children: [
      {
        path: '',
        loadComponent: () => import('@features/empresas/components/empresa-lista/empresa-lista.component').then(m => m.EmpresaListaComponent)
      },
      {
        path: 'novo',
        loadComponent: () => import('@features/empresas/components/empresa-form/empresa-form.component').then(m => m.EmpresaFormComponent)
      },
      {
        path: 'detalhes/:id',
        loadComponent: () => import('@features/empresas/components/empresa-detalhes/empresa-detalhes.component').then(m => m.EmpresaDetalhesComponent)
      },
      {
        path: 'editar/:id',
        loadComponent: () => import('@features/empresas/components/empresa-form/empresa-form.component').then(m => m.EmpresaFormComponent)
      }
    ]
  },
  {
    path: 'clientes',
    loadComponent: () => import('@features/clientes/clientes.component').then(m => m.ClientesComponent),
    canActivate: [authGuard]
  },
  {
    path: 'campanhas',
    loadComponent: () => import('@features/campanhas/campanhas.component').then(m => m.CampanhasComponent),
    canActivate: [authGuard],
    children: [
      {
        path: '',
        loadComponent: () => import('@features/campanhas/components/campanha-lista/campanha-lista.component').then(m => m.CampanhaListaComponent)
      },
      {
        path: 'nova',
        loadComponent: () => import('@features/campanhas/components/campanha-form/campanha-form.component').then(m => m.CampanhaFormComponent)
      },
      {
        path: 'detalhes/:id',
        loadComponent: () => import('@features/campanhas/components/campanha-detalhes/campanha-detalhes.component').then(m => m.CampanhaDetalhesComponent)
      },
      {
        path: 'editar/:id',
        loadComponent: () => import('@features/campanhas/components/campanha-form/campanha-form.component').then(m => m.CampanhaFormComponent)
      }
    ]
  },
  {
    path: 'relatorios',
    loadComponent: () => import('@features/relatorios/relatorios.component').then(m => m.RelatoriosComponent),
    canActivate: [authGuard]
  },
  {
    path: 'analytics',
    loadComponent: () => import('@features/analytics/analytics.component').then(m => m.AnalyticsComponent),
    canActivate: [authGuard]
  },

  // ========== REDIRECIONAMENTOS ==========
  {
    path: '',
    redirectTo: '/dashboard',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: '/dashboard'
  }
];
