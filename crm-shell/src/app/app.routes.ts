// src/app/app.routes.ts - VERSÃO COMPLETA E CORRETA
import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'dashboard',
    loadComponent: () => import('../features/dashboard/dashboard.component').then(m => m.DashboardComponent)
  },
  {
    path: 'empresas',
    loadComponent: () => import('../features/empresas/empresas.component').then(m => m.EmpresasComponent),
    children: [
      {
        path: '',
        loadComponent: () => import('../features/empresas/components/empresa-lista/empresa-lista.component').then(m => m.EmpresaListaComponent)
      },
      {
        path: 'novo',
        loadComponent: () => import('../features/empresas/components/empresa-form/empresa-form.component').then(m => m.EmpresaFormComponent)
      },
      {
        path: 'detalhes/:id',
        loadComponent: () => import('../features/empresas/components/empresa-detalhes/empresa-detalhes.component').then(m => m.EmpresaDetalhesComponent)
      },
      {
        path: 'editar/:id',
        loadComponent: () => import('../features/empresas/components/empresa-form/empresa-form.component').then(m => m.EmpresaFormComponent)
      }
    ]
  },
  {
    path: 'clientes',
    loadComponent: () => import('../features/clientes/clientes.component').then(m => m.ClientesComponent)
  },
  {
    path: 'campanhas',
    loadComponent: () => import('../features/campanhas/campanhas.component').then(m => m.CampanhasComponent),
    children: [
      {
        path: '',
        loadComponent: () => import('../features/campanhas/components/campanha-lista/campanha-lista.component').then(m => m.CampanhaListaComponent)
      },
      {
        path: 'nova',
        loadComponent: () => import('../features/campanhas/components/campanha-form/campanha-form.component').then(m => m.CampanhaFormComponent)
      },
      {
        path: 'detalhes/:id',
        loadComponent: () => import('../features/campanhas/components/campanha-detalhes/campanha-detalhes.component').then(m => m.CampanhaDetalhesComponent)
      },
      {
        path: 'editar/:id',
        loadComponent: () => import('../features/campanhas/components/campanha-form/campanha-form.component').then(m => m.CampanhaFormComponent)
      }
    ]
  },
  {
    path: 'login',
    loadComponent: () => import('../features/auth/login/login.component').then(m => m.LoginComponent)
  },
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
