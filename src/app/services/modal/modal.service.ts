import { Injectable } from '@angular/core';
/**
 * Service for modal implementation
 */
@Injectable({ providedIn: 'root' })
export class ModalService {
  /**
   * modals used by service
   */
  private modals: any[] = [];

  /**
   * add method
   * @param modal to be added to array of active modals
   */
  add(modal: any) {
      this.modals.push(modal);
  }
  /**
   * remove method
   * @param modal to be removed from array of active modals
   */
  remove(id: string) {
      this.modals = this.modals.filter(x => x.id !== id);
  }
  /**
   * Open specified modal
   * @param id string to be opened
   */
  open(id: string) {
      // open modal specified by id
      const modal = this.modals.find(x => x.id === id);
      modal.open();
  }
  /**
   * Close specified modal
   * @param id string to be closed
   */
  close(id: string) {
      // close modal specified by id
      const modal = this.modals.find(x => x.id === id);
      modal.close();
  }
}
