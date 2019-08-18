import { TestBed } from '@angular/core/testing';

import { AuthGuardService } from './auth-guard.service';
import { StoreModule, Store } from '@ngrx/store';
import { reducers, metaReducers, State } from 'src/app/store/reducers';
import { RouterTestingModule } from '@angular/router/testing';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { of } from 'rxjs';

@Component({
  template: `login`
})
export class FakeLoginComponent {
}

describe('AuthGuardService', () => {
  let store: Store<State>;
  let service: AuthGuardService;
  let router: Router;
  beforeEach(() => TestBed.configureTestingModule({
      declarations: [
        FakeLoginComponent
      ],
      imports: [
        StoreModule.forRoot(reducers, {
          metaReducers,
          runtimeChecks: {
            strictStateImmutability: false,
            strictActionImmutability: false,
            strictStateSerializability: false,
            strictActionSerializability: false,
          }
        }),
        RouterTestingModule.withRoutes([
          {
            path: 'login',
            component: FakeLoginComponent
          }
        ])
      ]}
    )
  );
  beforeEach(() => {
    service = TestBed.get(AuthGuardService);
    store = TestBed.get(Store);
    router = TestBed.get(Router);
    spyOn(store, 'select').and.callThrough();
    spyOn(router, 'navigate').and.callThrough();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('canActivate method should work as expected when there is no user', () => {
    (store.select as jasmine.Spy).and.callFake(() => of({
      user: undefined
    }));
    service.canActivate().subscribe();
    expect(router.navigate).toHaveBeenCalledWith(['/login']);
  });
  it('canActivate method should work as expected when there is no user', () => {
    (store.select as jasmine.Spy).and.callFake(() => of({
      user: {
        id: 'some-user'
      }
    }));
    service.canActivate().subscribe();
    expect(router.navigate).not.toHaveBeenCalled();
  });
});
