import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyQuotesComponent } from './my-quotes.component';
import { StoreModule, Store } from '@ngrx/store';
import { reducers, metaReducers, State } from 'src/app/store/reducers';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { FakeQuoteListComponent } from '../favorites/favorites.component.spec';
import { of } from 'rxjs';

describe('MyQuotesComponent', () => {
  let component: MyQuotesComponent;
  let fixture: ComponentFixture<MyQuotesComponent>;
  let router: Router;
  let store: Store<State>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyQuotesComponent, FakeQuoteListComponent ],
      imports: [
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
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyQuotesComponent);
    component = fixture.componentInstance;
    router = TestBed.get(Router);
    store = TestBed.get(Store);
    spyOn(store, 'select').and.callThrough();
    spyOn(router, 'navigate').and.callThrough();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should init as expected when there is no user', () => {
    expect(router.navigate).toHaveBeenCalledWith(['/my-quotes']);
  });
  it('should init as expected when there is user', () => {
    (store.select as jasmine.Spy).and.callFake(() => of({
      user: {
        id: 'test-user'
      }
    }));
    (router.navigate as jasmine.Spy).calls.reset();
    component.ngOnInit();
    expect(router.navigate).not.toHaveBeenCalled();
  });
  it('should destroy gracefully', () => {
    spyOn(component.mainSubscription, 'unsubscribe').and.callThrough();
    component.ngOnDestroy();
    expect(component.mainSubscription.unsubscribe).toHaveBeenCalled();
  });
});
