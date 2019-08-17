import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { State } from './store/reducers';
import * as loginReducers from './store/reducers/login/login.reducer';
import * as loginActions from './store/actions/login/login.actions';

import { User } from './services/user/user.service';
import { ModalService } from './services/modal/modal.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(private store: Store<State>,  private modalService: ModalService) {}

  title = 'Tronald Dump case';
  isMenuCollapsed = true;
  user: User;
  ngOnInit() {
    this.store.select(loginReducers.selectLoginState).subscribe((state) => {
      this.user = state.user;
    });
  }
  logOut(e: Event) {
    e.preventDefault();
    this.store.dispatch(new loginActions.LogOut());
  }
  showSurprise() {
    this.modalService.open('kim-modal');
  }
  closeModal(id: string) {
    this.modalService.close(id);
  }
}
