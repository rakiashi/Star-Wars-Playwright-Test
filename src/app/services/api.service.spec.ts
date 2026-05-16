import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ApiService } from './api.service';

describe('ApiService', () => {
  let service: ApiService;
  let httpMock: HttpTestingController;
  const baseUrl = 'https://swapi.dev/api/';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ApiService]
    });

    service = TestBed.inject(ApiService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call GET with correct url and params', () => {
    const mockRes = { results: [] };

    service.search('people', 'luke').subscribe(res => {
      expect(res).toEqual(mockRes);
    });

    const req = httpMock.expectOne(request =>
      request.method === 'GET' && request.url === `${baseUrl}people/`
    );

    expect(req.request.params.get('search')).toBe('luke');
    req.flush(mockRes);
  });

  it('should send empty string when query is empty', () => {
    const mockRes = { results: [] };

    service.search('planets', '').subscribe(res => {
      expect(res).toEqual(mockRes);
    });

    const req = httpMock.expectOne(request =>
      request.method === 'GET' && request.url === `${baseUrl}planets/`
    );

    // empty query should still produce the 'search' param with empty value
    expect(req.request.params.has('search')).toBeTrue();
    expect(req.request.params.get('search')).toBe('');
    req.flush(mockRes);
  });

});
