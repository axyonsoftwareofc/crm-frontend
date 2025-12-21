// src/shared/material.module.ts
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
// ... outros módulos do Material

@NgModule({
  exports: [
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    // ... exporte todos
  ]
})
export class MaterialModule { }
