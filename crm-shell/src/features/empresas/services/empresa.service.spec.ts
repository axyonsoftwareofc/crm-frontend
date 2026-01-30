// src/features/empresas/services/empresa.service.spec.ts
import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { EmpresaService } from './empresa.service';
import { Empresa, PageResponse } from '../../../core/models/empresa.model';

describe('EmpresaService', () => {
  let service: EmpresaService;
  let httpMock: HttpTestingController;

  // Dados de teste reutilizáveis
  const empresaMock: Empresa = {
    id: 1,
    razaoSocial: 'Tech Solutions LTDA',
    nomeFantasia: 'Tech Solutions',
    cnpj: '11.222.333/0001-81',
    setor: 'Tecnologia',
    logradouro: 'Rua das Flores',
    numero: '123',
    complemento: 'Sala 45',
    bairro: 'Centro',
    cidade: 'Fortaleza',
    uf: 'CE',
    cep: '60000-000',
    status: 'Ativa',
    observacao: 'Cliente premium',
    criadoEm: new Date(),
    atualizadoEm: new Date()
  };

  // SETUP: Executado ANTES de cada teste
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule], // Mock do HttpClient
      providers: [EmpresaService]
    });

    service = TestBed.inject(EmpresaService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  // CLEANUP: Executado DEPOIS de cada teste
  afterEach(() => {
    httpMock.verify(); // Verifica se não há requisições pendentes
  });

  // Teste básico: verifica se o serviço foi criado
  it('deve ser criado', () => {
    expect(service).toBeTruthy();
  });

  describe('listar()', () => {

    it('deve retornar lista paginada de empresas', () => {
      // ARRANGE: Prepara a resposta mockada
      const mockResponse: PageResponse<Empresa> = {
        content: [empresaMock],
        pageNumber: 0,
        pageSize: 10,
        totalElements: 1,
        totalPages: 1,
        first: true,
        last: true
      };

      // ACT: Chama o método
      service.listar(0, 10, 'razaoSocial').subscribe(response => {
        // ASSERT: Verifica a resposta
        expect(response.content.length).toBe(1);
        expect(response.content[0].razaoSocial).toBe('Tech Solutions LTDA');
        expect(response.totalElements).toBe(1);
      });

      // Simula a resposta do backend
      const req = httpMock.expectOne(
        'http://localhost:8080/api/empresas?page=0&size=10&sort=razaoSocial'
      );
      expect(req.request.method).toBe('GET');
      req.flush(mockResponse); // Retorna o mock
    });

    it('deve incluir parâmetro search quando fornecido', () => {
      service.listar(0, 10, 'razaoSocial', 'Tech').subscribe();

      const req = httpMock.expectOne(
        'http://localhost:8080/api/empresas?page=0&size=10&sort=razaoSocial&search=Tech'
      );
      expect(req.request.method).toBe('GET');
      req.flush({ content: [], pageNumber: 0, pageSize: 10, totalElements: 0, totalPages: 0, first: true, last: true });
    });

  });

  describe('buscar()', () => {

    it('deve buscar empresa por ID', () => {
      const empresaId = 1;

      service.buscar(empresaId).subscribe(empresa => {
        expect(empresa).toEqual(empresaMock);
        expect(empresa.id).toBe(empresaId);
      });

      const req = httpMock.expectOne(`http://localhost:8080/api/empresas/${empresaId}`);
      expect(req.request.method).toBe('GET');
      req.flush(empresaMock);
    });

    it('deve retornar erro quando empresa não existe', () => {
      const empresaId = 999;

      service.buscar(empresaId).subscribe({
        next: () => fail('Deveria ter dado erro'),
        error: (error) => {
          expect(error.status).toBe(404);
        }
      });

      const req = httpMock.expectOne(`http://localhost:8080/api/empresas/${empresaId}`);
      req.flush('Empresa não encontrada', { status: 404, statusText: 'Not Found' });
    });

  });

  describe('criar()', () => {

    it('deve criar nova empresa', () => {
      const novaEmpresa: Partial<Empresa> = {
        razaoSocial: 'Nova Empresa',
        cnpj: '11.222.333/0001-81'
      };

      service.criar(novaEmpresa).subscribe(empresa => {
        expect(empresa.id).toBe(1);
        expect(empresa.razaoSocial).toBe('Nova Empresa');
      });

      const req = httpMock.expectOne('http://localhost:8080/api/empresas');
      expect(req.request.method).toBe('POST');
      expect(req.request.body).toEqual(novaEmpresa);
      req.flush({ ...novaEmpresa, id: 1 });
    });

    it('deve retornar erro 409 quando CNPJ já existe', () => {
      const empresaDuplicada: Partial<Empresa> = {
        razaoSocial: 'Empresa Duplicada',
        cnpj: '11.222.333/0001-81'
      };

      service.criar(empresaDuplicada).subscribe({
        next: () => fail('Deveria ter dado erro'),
        error: (error) => {
          expect(error.status).toBe(409);
        }
      });

      const req = httpMock.expectOne('http://localhost:8080/api/empresas');
      req.flush('CNPJ já cadastrado', { status: 409, statusText: 'Conflict' });
    });

  });

  describe('atualizar()', () => {

    it('deve atualizar empresa existente', () => {
      const empresaId = 1;
      const empresaAtualizada: Partial<Empresa> = {
        razaoSocial: 'Razão Social Atualizada'
      };

      service.atualizar(empresaId, empresaAtualizada).subscribe(empresa => {
        expect(empresa.razaoSocial).toBe('Razão Social Atualizada');
      });

      const req = httpMock.expectOne(`http://localhost:8080/api/empresas/${empresaId}`);
      expect(req.request.method).toBe('PUT');
      req.flush({ ...empresaMock, ...empresaAtualizada });
    });

  });

  describe('remover()', () => {

    it('deve remover empresa por ID', () => {
      const empresaId = 1;

      service.remover(empresaId).subscribe(response => {
        expect(response).toBeUndefined(); // DELETE não retorna corpo
      });

      const req = httpMock.expectOne(`http://localhost:8080/api/empresas/${empresaId}`);
      expect(req.request.method).toBe('DELETE');
      req.flush(null);
    });

  });

  describe('Casos de erro genéricos', () => {

    it('deve lidar com erro de rede', () => {
      service.listar().subscribe({
        next: () => fail('Deveria ter dado erro'),
        error: (error) => {
          expect(error.error.type).toBe('Network error');
        }
      });

      const req = httpMock.expectOne(req => req.url.includes('empresas'));
      req.error(new ProgressEvent('Network error'));
    });

    it('deve lidar com erro 500', () => {
      service.listar().subscribe({
        next: () => fail('Deveria ter dado erro'),
        error: (error) => {
          expect(error.status).toBe(500);
        }
      });

      const req = httpMock.expectOne(req => req.url.includes('empresas'));
      req.flush('Erro interno', { status: 500, statusText: 'Internal Server Error' });
    });

  });

});

/**
 * 📊 Comandos úteis:
 *
 * 1. Rodar apenas este arquivo de teste:
 *    ng test --include='**/empresa.service.spec.ts'
 *
 * 2. Rodar em modo watch (re-executa ao salvar):
 *    ng test
 *
 * 3. Ver cobertura de código:
 *    ng test --code-coverage --watch=false
 */
