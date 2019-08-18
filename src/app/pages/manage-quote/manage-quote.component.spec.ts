import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageQuoteComponent } from './manage-quote.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StoreModule, Store } from '@ngrx/store';
import { reducers, metaReducers, State } from 'src/app/store/reducers';
import { ActivatedRoute, Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { MyQuotesComponent } from '../my-quotes/my-quotes.component';
import { QuoteListComponent } from 'src/app/ui-elements/quote-list/quote-list.component';
import { ModalComponent } from 'src/app/ui-elements/modal/modal.component';
import { ModalService } from 'src/app/services/modal/modal.service';
import * as myQuotesActions from '../../store/actions/my-quotes/my-quotes.actions';
import { of } from 'rxjs';
import { Update } from '@ngrx/entity';
import { QuoteModel } from 'src/app/models/quote.model';

describe('ManageQuoteComponent', () => {
  let component: ManageQuoteComponent;
  let fixture: ComponentFixture<ManageQuoteComponent>;
  let router: Router;
  let activatedRoute: ActivatedRoute;
  let store: Store<State>;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageQuoteComponent, MyQuotesComponent, QuoteListComponent, ModalComponent ],
      imports: [
        FormsModule,
        ReactiveFormsModule,
        StoreModule.forRoot(reducers, { metaReducers, runtimeChecks: {
          strictStateImmutability: false,
          strictActionImmutability: false,
          strictStateSerializability: false,
          strictActionSerializability: false,
        } }),
        RouterTestingModule.withRoutes([
          {
            path: 'my-quotes',
            component: MyQuotesComponent
          }
        ])
      ],
      providers: [{
          provide: ActivatedRoute,
          useValue: {
              snapshot: {
                  paramMap: {
                      get: () => {},
                  },
              },
          },
        },
        ModalService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageQuoteComponent);
    component = fixture.componentInstance;
    activatedRoute = TestBed.get(ActivatedRoute);
    store = TestBed.get(Store);
    router = TestBed.get(Router);
    spyOn(store, 'select').and.callThrough();
    spyOn(store, 'dispatch').and.callThrough();
    spyOn(activatedRoute.snapshot.paramMap, 'get').and.callThrough();
    spyOn(router, 'navigate').and.callThrough();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should init as expected', () => {
    spyOn(component, 'initializeForm').and.callThrough();
    (store.select as jasmine.Spy).and.callFake(() => of({
      value: '',
      tags: []
    }));
    (activatedRoute.snapshot.paramMap.get as jasmine.Spy).and.returnValue('123');
    component.ngOnInit();
    expect(component.initializeForm).toHaveBeenCalled();
    expect(component.isQuoteAvailable).toBe(true);
  });

  it('should init as expected even if there is not a quote with that id', () => {
    spyOn(component, 'initializeForm').and.callThrough();
    (store.select as jasmine.Spy).and.callFake(() => of(undefined));
    (activatedRoute.snapshot.paramMap.get as jasmine.Spy).and.returnValue('123');
    component.ngOnInit();
    expect(component.initializeForm).not.toHaveBeenCalled();
    expect(component.isQuoteAvailable).toBe(false);
  });

  it('submit as expected on edit mode', () => {
    spyOn(component, 'initializeForm').and.callThrough();
    (store.select as jasmine.Spy).and.callFake(() => of({
      value: 'test value',
      tags: ['test', 'tag']
    }));
    (activatedRoute.snapshot.paramMap.get as jasmine.Spy).and.returnValue('123');
    component.ngOnInit();
    component.submit();
    component.formGroup.get('value').setValue(`this sentence should be a
    valid sentence i assume but i will try to make it as long as i can so that it will be valid`);
    component.formGroup.get('tags').setValue('valid, tags');
    component.formGroup.updateValueAndValidity();
    component.submit();
    expect(component.isEditMode).toBe(true);
    const quoteUpdate: Update<QuoteModel> = {
      id: component.quote.quoteId,
      changes: { ...component.quote }
    };
    expect(store.dispatch).toHaveBeenCalledWith(new myQuotesActions.UpdateOne(quoteUpdate));
    expect(router.navigate).toHaveBeenCalledWith(['my-quotes']);
  });

  it('submit as expected on add mode', () => {
    spyOn(component, 'initializeForm').and.callThrough();
    (store.select as jasmine.Spy).and.callFake(() => of({
      value: 'test value',
      tags: ['test', 'tag']
    }));
    (activatedRoute.snapshot.paramMap.get as jasmine.Spy).and.returnValue(undefined);
    component.ngOnInit();
    component.submit();
    component.formGroup.get('value').setValue(`this sentence should be a
    valid sentence i assume but i will try to make it as long as i can so that it will be valid`);
    component.formGroup.get('tags').setValue('valid, tags');
    component.formGroup.updateValueAndValidity();
    component.submit();
    expect(component.isEditMode).toBe(false);
    expect(store.dispatch).toHaveBeenCalledWith(new myQuotesActions.AddOne(component.quote));
    expect(router.navigate).toHaveBeenCalledWith(['my-quotes']);
  });
});
