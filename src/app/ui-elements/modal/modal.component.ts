import { Component, OnInit, OnDestroy, Input, ElementRef } from '@angular/core';
import { ModalService } from 'src/app/services/modal/modal.service';

/**
 * Modal component
 */
@Component({
  selector: 'app-trump-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit, OnDestroy {
  /**
   * id input for the modal
   */
  @Input() id: string;
  /**
   * ElementRef's native element
   */
  private element: any;
  /**
   * constructor method
   * @param modalService to add or remove
   * @param el ElementRef to get native element
   */
  constructor(private modalService: ModalService, private el: ElementRef) {
      this.element = el.nativeElement;
  }

  /**
   * Initialization method
   */
  ngOnInit() {
      // ensure id attribute exists
      if (!this.id) {
          console.error('modal must have an id');
          return;
      }

      // move element to bottom of page (just before </body>) so it can be displayed above everything else
      document.body.appendChild(this.element);

      // close modal on background click
      this.element.addEventListener('click', el => {
          if (el.target.className === 'trump-modal') {
              this.close();
          }
      });

      // add self (this modal instance) to the modal service so it's accessible from controllers
      this.modalService.add(this);
  }

  /**
   * Destroy method
   * removes self from modal service when component is destroyed
   */
  ngOnDestroy() {
      this.modalService.remove(this.id);
      this.element.remove();
  }

  /**
   * Modal opener method
   */
  open() {
      this.element.style.display = 'block';
      document.body.classList.add('trump-modal-open');
  }

  /**
   * Modal closer method
   */
  close() {
      this.element.style.display = 'none';
      document.body.classList.remove('trump-modal-open');
  }
}
