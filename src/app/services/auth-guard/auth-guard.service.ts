import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { State } from 'src/app/store/reducers';
import * as loginReducers from 'src/app/store/reducers/login/login.reducer';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

/**
 * AuthGuardService to handle login needed pages
 */
@Injectable({ providedIn: 'root' })
export class AuthGuardService implements CanActivate {
  /**
   * constructor method
   * @param store Store instance to select login state
   * @param router Router instance to navigate when needed
   */
  constructor(private store: Store<State>, public router: Router) {}
  /**
   * canActivate method to intercept routes when needed login
   */
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
