import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RandomQuotesComponent } from './random-quotes.component';
import { QuotesService } from 'src/app/services/quotes/quotes.service';
import { FakeQuoteListComponent } from '../favorites/favorites.component.spec';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { QuoteModel } from 'src/app/models/quote.model';

describe('RandomQuotesComponent', () => {
  let component: RandomQuotesComponent;
  let fixture: ComponentFixture<RandomQuotesComponent>;
  let service: QuotesService;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RandomQuotesComponent, FakeQuoteListComponent ],
      providers: [
        {
          provide: QuotesService,
          useValue: {
            getRandomQuotes: jasmine.createSpy('getRandomQuotes').and.returnValue(of([])),
            getTags: jasmine.createSpy('getTags').and.returnValue(of([]))
          }
        }
      ],
      imports: [
        RouterTestingModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RandomQuotesComponent);
    component = fixture.componentInstance;
    service = TestBed.get(QuotesService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should init as expected', () => {
    spyOn(component, 'getPageObjects').and.callFake(() => {});
    component.ngOnInit();
    expect(component.getPageObjects).toHaveBeenCalled();
  });
  it('should run shuffleQuotes as expected', () => {
    const randomQuote1 = new QuoteModel().deserialize({
      tags: ['a-tag']
    });
    const randomQuote2 = new QuoteModel().deserialize({
      tags: ['b-tag']
    });
    (service.getRandomQuotes as jasmine.Spy).and.returnValue(of([
      randomQuote1, randomQuote2
    ]));
    component.ngOnInit();
    spyOn(component.quotes, 'sort').and.callThrough();
    component.shuffleQuotes();
    expect(component.quotes.sort).toHaveBeenCalled();
  });

  it('should run getPageObjects as expected', () => {
    const randomQuote1 = new QuoteModel().deserialize({
      tags: ['a-tag']
    });
    const randomQuote2 = new QuoteModel().deserialize({
      tags: ['b-tag']
    });
    (service.getRandomQuotes as jasmine.Spy).and.returnValue(of([
      randomQuote1, randomQuote2
    ]));
    (service.getTags as jasmine.Spy).and.returnValue(of([
      'a-tag', 'b-tag', 'c-tag'
    ]));
    component.getPageObjects();
    expect(component.tags)
      .toEqual([{disabled: false, value: 'a-tag'}, {disabled: false, value: 'b-tag'}, {disabled: true, value: 'c-tag'}]);
  });
});
