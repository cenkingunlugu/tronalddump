import { Directive, Output, EventEmitter, HostListener } from '@angular/core';

/**
 * App surprise directive for easter egg
 */
@Directive({
  selector: '[appSurprise]'
})
export class SurpriseDirective {
  /**
   * constructor method
   */
  constructor() {
    this.surprise = new EventEmitter<void>();
    this.sequence = [];
    this.surpriseCode = ['84', '82', '79', '78', '65', '76', '68'];
  }
  /**
   * Surprise emitter
   */
  @Output()
  private surprise: EventEmitter<void>;
  /**
   * sequence of strings to check if it deserves the surprise
   */
  private sequence: string[];

  /**
   * String array of surprise keyCodes
   */
  private surpriseCode: string[];

  /**
   * Keyboard keydown event handler
   * @param event KeyboardEvent to listen
   */
  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if (event.keyCode) {
      this.sequence.push(event.keyCode.toString());

      if (this.sequence.length > this.surpriseCode.length) {
        this.sequence.shift();
      }

      if (this.isSurpriseCode()) {
        this.surprise.emit();
      }
    }
  }

  /**
   * Surprise code checker method
   */
  isSurpriseCode(): boolean {
    return this.surpriseCode.every((code: string, index: number) => code === this.sequence[index]);
  }
}
