// src/shared/directives/cnpj-mask.directive.ts
import { Directive, ElementRef, HostListener, Self } from '@angular/core';
import { NgControl } from '@angular/forms';
import { aplicarMascaraCNPJ } from '../validators/cnpj.validator';

/**
 * Diretiva para aplicar máscara automática de CNPJ
 * Uso: <input type="text" formControlName="cnpj" cnpjMask>
 */
@Directive({
  selector: '[cnpjMask]',
  standalone: true
})
export class CnpjMaskDirective {
  constructor(
    private el: ElementRef,
    @Self() private ngControl: NgControl
  ) {}

  @HostListener('input', ['$event'])
  onInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    let value = input.value;

    // Remove tudo que não é número
    const numeros = value.replace(/\D/g, '');

    // Limita a 14 dígitos
    if (numeros.length > 14) {
      value = numeros.substring(0, 14);
    } else {
      value = numeros;
    }

    // Aplica a máscara
    const valorMascarado = aplicarMascaraCNPJ(value);

    // Atualiza o valor no FormControl
    if (this.ngControl.control) {
      this.ngControl.control.setValue(valorMascarado, { emitEvent: false });
    }

    // Atualiza visualmente o input
    input.value = valorMascarado;
  }

  @HostListener('blur')
  onBlur(): void {
    // Força validação ao sair do campo
    if (this.ngControl.control) {
      this.ngControl.control.updateValueAndValidity();
    }
  }

  @HostListener('paste', ['$event'])
  onPaste(event: ClipboardEvent): void {
    event.preventDefault();
    const pastedText = event.clipboardData?.getData('text') || '';
    const numeros = pastedText.replace(/\D/g, '').substring(0, 14);
    const valorMascarado = aplicarMascaraCNPJ(numeros);

    if (this.ngControl.control) {
      this.ngControl.control.setValue(valorMascarado);
    }
  }
}
