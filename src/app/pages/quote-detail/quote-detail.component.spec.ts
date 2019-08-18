import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuoteDetailComponent } from './quote-detail.component';
import { Location } from '@angular/common';

import { ActivatedRoute } from '@angular/router';
import { QuotesService } from 'src/app/services/quotes/quotes.service';
import { of } from 'rxjs';

describe('QuoteDetailComponent', () => {
  let component: QuoteDetailComponent;
  let service: QuotesService;
  let loc: Location;
  let fixture: ComponentFixture<QuoteDetailComponent>;
  const locationStub = {
    back: jasmine.createSpy('back')
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuoteDetailComponent ],
      providers: [ {
        provide: ActivatedRoute,
        useValue: {
            snapshot: {
                paramMap: {
                    get(): string {
                        return '123';
                    },
                },
            },
        },
    },
    {provide: QuotesService, useValue: {
      getQuoteById: jasmine.createSpy('getQuoteById').and.returnValue(of([{}]))
    }},
    {provide: Location, useValue: locationStub} ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuoteDetailComponent);
    component = fixture.componentInstance;
    service = TestBed.get(QuotesService);
    loc = TestBed.get(Location);
    fixture.detectChanges();

  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should init as expected', () => {
    expect(service.getQuoteById).toHaveBeenCalledWith('123');
    expect(component.quote).toBeDefined();
  });

  it('should go back as expected', () => {
    component.goBack();
    expect(loc.back).toHaveBeenCalled();
  });
});
