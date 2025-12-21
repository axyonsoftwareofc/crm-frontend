// src/shared/validators/cnpj.validator.ts
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

/**
 * Validador customizado de CNPJ para Angular Forms
 * Uso: this.fb.control('', [Validators.required, cnpjValidator()])
 */
export function cnpjValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const cnpj = control.value;

    if (!cnpj) {
      return null; // Se vazio, deixa o Validators.required tratar
    }

    // Remove caracteres não numéricos
    const cnpjNumeros = cnpj.replace(/\D/g, '');

    // Valida formato básico
    if (cnpjNumeros.length !== 14) {
      return { cnpjInvalido: { message: 'CNPJ deve ter 14 dígitos' } };
    }

    // Valida se todos os dígitos são iguais (caso inválido)
    if (/^(\d)\1+$/.test(cnpjNumeros)) {
      return { cnpjInvalido: { message: 'CNPJ inválido' } };
    }

    // Valida dígitos verificadores
    if (!validarDigitosVerificadores(cnpjNumeros)) {
      return { cnpjInvalido: { message: 'CNPJ inválido' } };
    }

    return null; // CNPJ válido
  };
}

/**
 * Valida os dígitos verificadores do CNPJ
 */
function validarDigitosVerificadores(cnpj: string): boolean {
  let tamanho = cnpj.length - 2;
  let numeros = cnpj.substring(0, tamanho);
  const digitos = cnpj.substring(tamanho);
  let soma = 0;
  let pos = tamanho - 7;

  for (let i = tamanho; i >= 1; i--) {
    soma += parseInt(numeros.charAt(tamanho - i)) * pos--;
    if (pos < 2) pos = 9;
  }

  let resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);
  if (resultado !== parseInt(digitos.charAt(0))) return false;

  tamanho = tamanho + 1;
  numeros = cnpj.substring(0, tamanho);
  soma = 0;
  pos = tamanho - 7;

  for (let i = tamanho; i >= 1; i--) {
    soma += parseInt(numeros.charAt(tamanho - i)) * pos--;
    if (pos < 2) pos = 9;
  }

  resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);
  return resultado === parseInt(digitos.charAt(1));
}

/**
 * Aplica máscara de CNPJ (00.000.000/0000-00)
 */
export function aplicarMascaraCNPJ(cnpj: string): string {
  if (!cnpj) return '';

  const numeros = cnpj.replace(/\D/g, '');

  if (numeros.length <= 2) return numeros;
  if (numeros.length <= 5) return numeros.replace(/(\d{2})(\d{0,3})/, '$1.$2');
  if (numeros.length <= 8) return numeros.replace(/(\d{2})(\d{3})(\d{0,3})/, '$1.$2.$3');
  if (numeros.length <= 12) return numeros.replace(/(\d{2})(\d{3})(\d{3})(\d{0,4})/, '$1.$2.$3/$4');

  return numeros.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{0,2})/, '$1.$2.$3/$4-$5');
}

/**
 * Remove máscara do CNPJ
 */
export function removerMascaraCNPJ(cnpj: string): string {
  return cnpj ? cnpj.replace(/\D/g, '') : '';
}

/**
 * Gera um CNPJ válido aleatório (útil para testes)
 */
export function gerarCNPJValido(): string {
  const n = Math.floor(Math.random() * 900000000) + 100000000;
  const n1 = Math.floor(n / 1000000);
  const n2 = Math.floor((n % 1000000) / 1000);
  const n3 = n % 1000;
  const n4 = Math.floor(Math.random() * 9000) + 1000;

  let cnpj = String(n1).padStart(2, '0') +
             String(n2).padStart(3, '0') +
             String(n3).padStart(3, '0') +
             String(n4).padStart(4, '0');

  // Calcula primeiro dígito verificador
  let soma = 0;
  let pos = 5;
  for (let i = 0; i < 12; i++) {
    soma += parseInt(cnpj[i]) * pos;
    pos = pos === 2 ? 9 : pos - 1;
  }
  const dv1 = soma % 11 < 2 ? 0 : 11 - (soma % 11);
  cnpj += dv1;

  // Calcula segundo dígito verificador
  soma = 0;
  pos = 6;
  for (let i = 0; i < 13; i++) {
    soma += parseInt(cnpj[i]) * pos;
    pos = pos === 2 ? 9 : pos - 1;
  }
  const dv2 = soma % 11 < 2 ? 0 : 11 - (soma % 11);
  cnpj += dv2;

  return aplicarMascaraCNPJ(cnpj);
}

/**
 * Exemplos de CNPJs válidos para testes
 */
export const CNPJS_VALIDOS_TESTE = [
  '11.222.333/0001-81',
  '00.000.000/0001-91',
  '11.111.111/0001-11',
  '12.345.678/0001-95',
  '07.526.557/0001-00' // Magazine Luiza (real)
];
