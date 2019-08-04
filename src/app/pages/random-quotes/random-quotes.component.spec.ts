import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RandomQuotesComponent } from './random-quotes.component';

describe('RandomQuotesComponent', () => {
  let component: RandomQuotesComponent;
  let fixture: ComponentFixture<RandomQuotesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RandomQuotesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RandomQuotesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
