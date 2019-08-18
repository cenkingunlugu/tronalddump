import { TestBed, fakeAsync, tick } from '@angular/core/testing';

import { RouterHelperService } from './router-helper.service';
import { RouterTestingModule } from '@angular/router/testing';
import { FakeLoginComponent } from '../auth-guard/auth-guard.service.spec';
import { Router } from '@angular/router';
import { FakeQuoteListComponent } from 'src/app/pages/favorites/favorites.component.spec';

describe('RouterHelperService', () => {
  let service: RouterHelperService;
  let router: Router;
  beforeEach(() => TestBed.configureTestingModule({
    declarations: [ FakeLoginComponent, FakeQuoteListComponent ],
    imports: [
      RouterTestingModule.withRoutes([
        {
          path: 'fake-login',
          component: FakeLoginComponent
        },
        {
          path: 'other-fake-login',
          component: FakeQuoteListComponent
        }
      ])
    ]
  }));

  beforeEach(() => {
    service = TestBed.get(RouterHelperService);
    router = TestBed.get(Router);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should run getPreviousUrl as expected', fakeAsync(() => {
    router.navigate(['fake-login']);
    tick();
    router.navigate(['other-fake-login']);
    tick();
    expect(service.getPreviousUrl()).toBe('/fake-login');
  }));
});
