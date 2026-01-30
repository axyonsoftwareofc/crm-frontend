// src/shared/validators/cnpj.validator.spec.ts
import { FormControl } from '@angular/forms';
import { cnpjValidator, aplicarMascaraCNPJ, removerMascaraCNPJ } from './cnpj.validator';

describe('Validador de CNPJ', () => {

  // Cria um validador para usar nos testes
  const validator = cnpjValidator();

  describe('cnpjValidator()', () => {

    it('deve retornar null para CNPJ válido COM máscara', () => {
      // ARRANGE: Cria um controle com CNPJ válido
      const control = new FormControl('11.222.333/0001-81');

      // ACT: Executa o validador
      const resultado = validator(control);

      // ASSERT: Verifica que não há erro (null = válido)
      expect(resultado).toBeNull();
    });

    it('deve retornar null para CNPJ válido SEM máscara', () => {
      const control = new FormControl('11222333000181');
      const resultado = validator(control);
      expect(resultado).toBeNull();
    });

    it('deve retornar erro para CNPJ com menos de 14 dígitos', () => {
      const control = new FormControl('11.222.333/0001');
      const resultado = validator(control);

      expect(resultado).not.toBeNull();
      expect(resultado?.['cnpjInvalido']).toBeDefined();
      expect(resultado?.['cnpjInvalido'].message).toBe('CNPJ deve ter 14 dígitos');
    });

    it('deve retornar erro para CNPJ com todos os dígitos iguais', () => {
      const control = new FormControl('11.111.111/1111-11');
      const resultado = validator(control);

      expect(resultado).not.toBeNull();
      expect(resultado?.['cnpjInvalido']).toBeDefined();
    });

    it('deve retornar erro para CNPJ com dígito verificador inválido', () => {
      const control = new FormControl('11.222.333/0001-99'); // Dígito errado
      const resultado = validator(control);

      expect(resultado).not.toBeNull();
      expect(resultado?.['cnpjInvalido']).toBeDefined();
    });

    it('deve retornar null para campo vazio (deixa Validators.required tratar)', () => {
      const control = new FormControl('');
      const resultado = validator(control);

      expect(resultado).toBeNull();
    });

    it('deve retornar null para campo null', () => {
      const control = new FormControl(null);
      const resultado = validator(control);

      expect(resultado).toBeNull();
    });

  });

  describe('aplicarMascaraCNPJ()', () => {

    it('deve aplicar máscara completa para 14 dígitos', () => {
      const resultado = aplicarMascaraCNPJ('11222333000181');
      expect(resultado).toBe('11.222.333/0001-81');
    });

    it('deve aplicar máscara parcial para menos dígitos', () => {
      expect(aplicarMascaraCNPJ('11')).toBe('11');
      expect(aplicarMascaraCNPJ('11222')).toBe('11.222');
      expect(aplicarMascaraCNPJ('11222333')).toBe('11.222.333');
      expect(aplicarMascaraCNPJ('112223330001')).toBe('11.222.333/0001');
    });

    it('deve retornar string vazia para input vazio', () => {
      expect(aplicarMascaraCNPJ('')).toBe('');
    });

    it('deve ignorar caracteres não numéricos', () => {
      const resultado = aplicarMascaraCNPJ('11.222.333/0001-81');
      expect(resultado).toBe('11.222.333/0001-81');
    });

  });

  describe('removerMascaraCNPJ()', () => {

    it('deve remover toda a máscara', () => {
      const resultado = removerMascaraCNPJ('11.222.333/0001-81');
      expect(resultado).toBe('11222333000181');
    });

    it('deve retornar string vazia para input vazio', () => {
      expect(removerMascaraCNPJ('')).toBe('');
    });

    it('deve funcionar com CNPJ já sem máscara', () => {
      expect(removerMascaraCNPJ('11222333000181')).toBe('11222333000181');
    });

  });

  describe('Casos de uso reais', () => {

    // Lista de CNPJs válidos reais para testar
    const cnpjsValidos = [
      '11.222.333/0001-81',
      '00.000.000/0001-91',
      '11.111.111/0001-11'
    ];

    cnpjsValidos.forEach(cnpj => {
      it(`deve validar CNPJ válido: ${cnpj}`, () => {
        const control = new FormControl(cnpj);
        const resultado = validator(control);
        expect(resultado).toBeNull();
      });
    });

    // Lista de CNPJs inválidos para testar
    const cnpjsInvalidos = [
      '11.222.333/0001-99', // Dígito errado
      '00.000.000/0000-00', // Todos zeros
      '11.111.111/1111-11', // Todos iguais
      '123',                 // Muito curto
      'abc.def.ghi/jklm-no'  // Letras
    ];

    cnpjsInvalidos.forEach(cnpj => {
      it(`deve rejeitar CNPJ inválido: ${cnpj}`, () => {
        const control = new FormControl(cnpj);
        const resultado = validator(control);
        expect(resultado).not.toBeNull();
      });
    });

  });

});

/**
 * 📊 Como rodar os testes:
 *
 * 1. No terminal, execute:
 *    ng test
 *
 * 2. Abrirá uma janela do navegador mostrando os resultados
 *
 * 3. Para rodar uma vez só (CI/CD):
 *    ng test --watch=false --browsers=ChromeHeadless
 *
 * 4. Para ver cobertura de código:
 *    ng test --code-coverage
 *    (gera relatório em coverage/index.html)
 */
