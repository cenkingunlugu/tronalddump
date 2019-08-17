import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { State } from './store/reducers';
import * as loginReducers from './store/reducers/login/login.reducer';
import * as loginActions from './store/actions/login/login.actions';

import { User } from './services/user/user.service';
import { ModalService } from './services/modal/modal.service';

/**
 * App component
 */
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  /**
   * Constructor method
   * @param store store instance
   * @param modalService modalService instance
   */
  constructor(private store: Store<State>,  private modalService: ModalService) {}
  /**
   * Title to show
   */
  title = 'Tronald Dump case';
  /**
   * Menu collapse indicator
   */
  isMenuCollapsed = true;
  /**
   * User to deal with
   */
  user: User;
  /**
   * Component initialization method
   */
  ngOnInit() {
    this.store.select(loginReducers.selectLoginState).subscribe((state) => {
      this.user = state.user;
    });
  }
  /**
   * Log out functionality
   * @param e the event
   */
  logOut(e: Event) {
    e.preventDefault();
    this.store.dispatch(new loginActions.LogOut());
  }
  /**
   * Surprise method
   */
  showSurprise() {
    this.modalService.open('kim-modal');
  }
  /**
   * Method to close modal
   * @param id id of the modal to close
   */
  closeModal(id: string) {
    this.modalService.close(id);
  }
}
