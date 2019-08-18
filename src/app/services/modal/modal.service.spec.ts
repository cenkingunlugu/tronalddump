import { TestBed } from '@angular/core/testing';

import { ModalService } from './modal.service';

describe('ModalService', () => {
  let service: ModalService;
  beforeEach(() => TestBed.configureTestingModule({}));
  beforeEach(() => {
    service = TestBed.get(ModalService);
  });
  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('open method should run as expected', () => {
    const fakeModal = {
      id: 'test',
      open: jasmine.createSpy('open')
    };
    service.add(fakeModal);
    service.open('test');
    expect(fakeModal.open).toHaveBeenCalled();
  });
  it('open method should run as expected', () => {
    const fakeModal = {
      id: 'test',
      close: jasmine.createSpy('open')
    };
    service.add(fakeModal);
    service.close('test');
    expect(fakeModal.close).toHaveBeenCalled();
  });
});
