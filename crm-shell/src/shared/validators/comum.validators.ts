// src/shared/validators/comum.validators.ts
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

/**
 * Validador de CEP brasileiro
 */
export function cepValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const cep = control.value;

    if (!cep) return null;

    const cepNumeros = cep.replace(/\D/g, '');

    if (cepNumeros.length !== 8) {
      return { cepInvalido: { message: 'CEP deve ter 8 dígitos' } };
    }

    return null;
  };
}

/**
 * Aplica máscara de CEP (00000-000)
 */
export function aplicarMascaraCEP(cep: string): string {
  if (!cep) return '';
  const numeros = cep.replace(/\D/g, '').substring(0, 8);
  if (numeros.length <= 5) return numeros;
  return numeros.replace(/(\d{5})(\d{0,3})/, '$1-$2');
}

/**
 * Validador de telefone brasileiro (fixo ou celular)
 */
export function telefoneValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const telefone = control.value;

    if (!telefone) return null;

    const numeros = telefone.replace(/\D/g, '');

    // Aceita: (85) 3333-3333 (fixo) ou (85) 98888-8888 (celular)
    if (numeros.length < 10 || numeros.length > 11) {
      return { telefoneInvalido: { message: 'Telefone inválido' } };
    }

    return null;
  };
}

/**
 * Aplica máscara de telefone brasileiro
 */
export function aplicarMascaraTelefone(telefone: string): string {
  if (!telefone) return '';

  const numeros = telefone.replace(/\D/g, '').substring(0, 11);

  if (numeros.length <= 2) return numeros;
  if (numeros.length <= 6) return numeros.replace(/(\d{2})(\d{0,4})/, '($1) $2');
  if (numeros.length <= 10) return numeros.replace(/(\d{2})(\d{4})(\d{0,4})/, '($1) $2-$3');

  // Celular com 9 dígitos
  return numeros.replace(/(\d{2})(\d{5})(\d{0,4})/, '($1) $2-$3');
}

/**
 * Validador de CPF
 */
export function cpfValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const cpf = control.value;

    if (!cpf) return null;

    const cpfNumeros = cpf.replace(/\D/g, '');

    if (cpfNumeros.length !== 11) {
      return { cpfInvalido: { message: 'CPF deve ter 11 dígitos' } };
    }

    // Valida se todos os dígitos são iguais
    if (/^(\d)\1+$/.test(cpfNumeros)) {
      return { cpfInvalido: { message: 'CPF inválido' } };
    }

    // Valida dígitos verificadores
    if (!validarDigitosVerificadoresCPF(cpfNumeros)) {
      return { cpfInvalido: { message: 'CPF inválido' } };
    }

    return null;
  };
}

function validarDigitosVerificadoresCPF(cpf: string): boolean {
  let soma = 0;
  let resto;

  for (let i = 1; i <= 9; i++) {
    soma += parseInt(cpf.substring(i - 1, i)) * (11 - i);
  }

  resto = (soma * 10) % 11;
  if (resto === 10 || resto === 11) resto = 0;
  if (resto !== parseInt(cpf.substring(9, 10))) return false;

  soma = 0;
  for (let i = 1; i <= 10; i++) {
    soma += parseInt(cpf.substring(i - 1, i)) * (12 - i);
  }

  resto = (soma * 10) % 11;
  if (resto === 10 || resto === 11) resto = 0;
  if (resto !== parseInt(cpf.substring(10, 11))) return false;

  return true;
}

/**
 * Aplica máscara de CPF (000.000.000-00)
 */
export function aplicarMascaraCPF(cpf: string): string {
  if (!cpf) return '';

  const numeros = cpf.replace(/\D/g, '').substring(0, 11);

  if (numeros.length <= 3) return numeros;
  if (numeros.length <= 6) return numeros.replace(/(\d{3})(\d{0,3})/, '$1.$2');
  if (numeros.length <= 9) return numeros.replace(/(\d{3})(\d{3})(\d{0,3})/, '$1.$2.$3');

  return numeros.replace(/(\d{3})(\d{3})(\d{3})(\d{0,2})/, '$1.$2.$3-$4');
}

/**
 * Validador de email melhorado
 */
export function emailValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const email = control.value;

    if (!email) return null;

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!emailRegex.test(email)) {
      return { emailInvalido: { message: 'Email inválido' } };
    }

    return null;
  };
}

/**
 * Validador de senha forte
 */
export function senhaForteValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const senha = control.value;

    if (!senha) return null;

    const erros: string[] = [];

    if (senha.length < 8) {
      erros.push('mínimo 8 caracteres');
    }

    if (!/[A-Z]/.test(senha)) {
      erros.push('uma letra maiúscula');
    }

    if (!/[a-z]/.test(senha)) {
      erros.push('uma letra minúscula');
    }

    if (!/[0-9]/.test(senha)) {
      erros.push('um número');
    }

    if (!/[!@#$%^&*(),.?":{}|<>]/.test(senha)) {
      erros.push('um caractere especial');
    }

    if (erros.length > 0) {
      return {
        senhaFraca: {
          message: `A senha deve ter: ${erros.join(', ')}`
        }
      };
    }

    return null;
  };
}
