import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalComponent } from './modal.component';

describe('ModalComponent', () => {
  let component: ModalComponent;
  let fixture: ComponentFixture<ModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('open method should work as expected', () => {
    component.open();
    expect(document.body.classList.contains('trump-modal-open')).toBe(true);
  });
  it('open method should work as expected', () => {
    component.open();
    component.close();
    expect(document.body.classList.contains('trump-modal-open')).toBe(false);
  });

});
