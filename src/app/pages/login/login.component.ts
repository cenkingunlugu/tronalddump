import { Component, OnInit } from '@angular/core';
import * as loginActions from '../../store/actions/login/login.actions';
import { Store } from '@ngrx/store';
import { State } from 'src/app/store/reducers';
import * as appReducers from '../../store/reducers/login/login.reducer';
import { Router } from '@angular/router';
import { RouterHelperService } from 'src/app/services/router-helper/router-helper.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private store: Store<State>, private router: Router, private routerHelper: RouterHelperService) { }
  username = 'admin';
  password = 'admin';
  ngOnInit() {
    this.store.select(appReducers.selectLoginState).subscribe((state) => {
      if (state.user) {
        const assumedPreviousUrl = this.routerHelper.getPreviousUrl();
        const previousUrl = assumedPreviousUrl.indexOf('login') > -1 ? '/' : assumedPreviousUrl;
        this.router.navigate([previousUrl]);
      }
    });
  }

  onLogin() {
    this.store.dispatch(new loginActions.Login(this.username, this.password));
  }

}
