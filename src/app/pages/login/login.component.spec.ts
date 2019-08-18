import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import { FormsModule } from '@angular/forms';
import { StoreModule, Store } from '@ngrx/store';
import { reducers, metaReducers, State } from 'src/app/store/reducers';
import { RouterTestingModule } from '@angular/router/testing';
import * as loginActions from '../../store/actions/login/login.actions';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { RouterHelperService } from 'src/app/services/router-helper/router-helper.service';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let router: Router;
  let store: Store<State>;
  let helperService: RouterHelperService;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginComponent ],
      imports: [
        FormsModule,
        StoreModule.forRoot(reducers, { metaReducers, runtimeChecks: {
          strictStateImmutability: false,
          strictActionImmutability: false,
          strictStateSerializability: false,
          strictActionSerializability: false,
        } }),
        RouterTestingModule.withRoutes([
          {
            path: 'login',
            component: LoginComponent
          },
          {
            path: 'something',
            component: LoginComponent
          }
        ])
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    store = TestBed.get(Store);
    router = TestBed.get(Router);
    helperService = TestBed.get(RouterHelperService);
    spyOn(store, 'select').and.callThrough();
    spyOn(store, 'dispatch').and.callThrough();
    spyOn(router, 'navigate').and.callThrough();
    spyOn(helperService, 'getPreviousUrl').and.callThrough();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(router.navigate).not.toHaveBeenCalled();
  });

  it('init as expected when there is user and previousUrl is login', () => {
    (store.select as jasmine.Spy).and.callFake(() => of({
      user: {
        id: 'test-user'
      }
    }));
    (helperService.getPreviousUrl as jasmine.Spy).and.callFake(() => '/login');
    component.ngOnInit();
    expect(router.navigate).toHaveBeenCalledWith(['/']);
  });

  it('init as expected when there is user and previousUrl is not login', () => {
    (store.select as jasmine.Spy).and.callFake(() => of({
      user: {
        id: 'test-user'
      }
    }));
    (helperService.getPreviousUrl as jasmine.Spy).and.callFake(() => '/something');
    component.ngOnInit();
    expect(router.navigate).toHaveBeenCalledWith(['/something']);
  });

  it('onLogin should work as expected', () => {
    component.onLogin();
    expect(store.dispatch).toHaveBeenCalledWith(new loginActions.Login(component.username, component.password))
  });
});
