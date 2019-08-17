import { Directive, Output, EventEmitter, HostListener } from '@angular/core';

@Directive({
  selector: '[appSurprise]'
})
export class SurpriseDirective {
  @Output()
  private surprise: EventEmitter<void>;

  private sequence: string[];

  private surpriseCode: string[];

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

  constructor() {
    this.surprise = new EventEmitter<void>();
    this.sequence = [];
    this.surpriseCode = ['84', '82', '79', '78', '65', '76', '68'];
  }

  isSurpriseCode(): boolean {
    return this.surpriseCode.every((code: string, index: number) => code === this.sequence[index]);
  }
}
