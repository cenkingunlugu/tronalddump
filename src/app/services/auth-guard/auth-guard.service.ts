import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { State } from 'src/app/store/reducers';
import * as loginReducers from 'src/app/store/reducers/login/login.reducer';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthGuardService implements CanActivate {

  constructor(private store: Store<State>, public router: Router) {}
  canActivate(): Observable<boolean> {
    return this.store.select(loginReducers.selectLoginState).pipe(
      map(e => {
        if (e.user) {
          return true;
        } else {
          this.router.navigate(['/login']);
          return false;
        }
      })
    );
  }
}
