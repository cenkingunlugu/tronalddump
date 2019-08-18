import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClientModule } from '@angular/common/http';
import { QuotesService } from './quotes.service';
import { QuoteModel } from 'src/app/models/quote.model';

describe('QuotesService', () => {
  let httpMock: HttpTestingController;
  let service: QuotesService;
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      HttpClientModule,
      HttpClientTestingModule,
    ]
  }));

  beforeEach(() => {
    httpMock = TestBed.get(HttpTestingController);
    service = TestBed.get(QuotesService);
  });


  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should run getQuoteById as expected', () => {
    service.getQuoteById('fake-quote-id').subscribe(response => {
      expect(response).toBeTruthy();
    });

    const req = httpMock.expectOne(`${service.baseUrl}/quotes/quote/fake-quote-id`);

    expect(req.request.method).toBe('GET');

    expect(req.cancelled).toBeFalsy();
    expect(req.request.responseType).toEqual('json');

    req.flush({});
  });

  it('should run getRandomQuotes as expected', () => {
    service.getRandomQuotes().subscribe(response => {
      expect(response).toBeTruthy();
    });

    const req = httpMock.expectOne(`${service.baseUrl}/quotes/randomlist`);

    expect(req.request.method).toBe('GET');

    expect(req.cancelled).toBeFalsy();
    expect(req.request.responseType).toEqual('json');

    req.flush([new QuoteModel().deserialize({
      quoteId: 'test'
    })]);
  });

  it('should run getTags as expected', () => {
    service.getTags().subscribe(response => {
      expect(response).toBeTruthy();
    });

    const req = httpMock.expectOne(`${service.baseUrl}/quotes/tags`);

    expect(req.request.method).toBe('GET');

    expect(req.cancelled).toBeFalsy();
    expect(req.request.responseType).toEqual('json');

    req.flush({
      _embedded: []
    });
  });

  it('should run getRandomMeme as expected', () => {
    service.getRandomMeme().subscribe(response => {
      expect(response).toBeTruthy();
    });

    const req = httpMock.expectOne(`${service.baseUrl}/quotes/randommeme`);

    expect(req.request.method).toBe('GET');

    expect(req.cancelled).toBeFalsy();
    expect(req.request.responseType).toEqual('blob');

    req.flush(new Blob());
  });

  it('should run getRandomMeme as expected', () => {
    service.getTagsDetail('fake-tag').subscribe(response => {
      expect(response).toBeTruthy();
    });

    const req = httpMock.expectOne(`${service.baseUrl}/quotes/tags/fake-tag`);

    expect(req.request.method).toBe('GET');

    expect(req.cancelled).toBeFalsy();
    expect(req.request.responseType).toEqual('json');

    req.flush({
      _embedded: {
        tags: [new QuoteModel().deserialize({
          quoteId: 'test'
        })]
      }
    });
  });
});
