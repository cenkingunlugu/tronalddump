import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FavoritesComponent } from './favorites.component';
import { StoreModule, Store } from '@ngrx/store';
import { reducers, metaReducers, State } from 'src/app/store/reducers';
import { RouterTestingModule } from '@angular/router/testing';
import { Component, Input } from '@angular/core';
import { QuoteModel } from 'src/app/models/quote.model';
import { Router } from '@angular/router';
import { of } from 'rxjs';

@Component({
  template: `quote-list`,
  selector: 'app-quote-list'
})
export class FakeQuoteListComponent {
  @Input() quotes: QuoteModel[];
  @Input() isMyQuotes: boolean;
}

describe('FavoritesComponent', () => {
  let component: FavoritesComponent;
  let fixture: ComponentFixture<FavoritesComponent>;
  let router: Router;
  let store: Store<State>;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FavoritesComponent, FakeQuoteListComponent ],
      imports: [
        StoreModule.forRoot(reducers, { metaReducers, runtimeChecks: {
          strictStateImmutability: false,
          strictActionImmutability: false,
          strictStateSerializability: false,
          strictActionSerializability: false,
        } }),
        RouterTestingModule.withRoutes([
          {
            path: 'favorites',
            component: FavoritesComponent
          }
        ])
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FavoritesComponent);
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
    expect(router.navigate).toHaveBeenCalledWith(['/favorites']);
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
