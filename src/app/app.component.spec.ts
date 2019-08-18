import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { ModalService } from './services/modal/modal.service';
import { ModalComponent } from './ui-elements/modal/modal.component';
import { StoreModule, Store } from '@ngrx/store';
import { reducers, metaReducers, State } from './store/reducers';
import * as loginActions from './store/actions/login/login.actions';

describe('AppComponent', () => {
  let component: AppComponent;
  let store: Store<State>;
  let modalService: ModalService;
  let app;
  let fixture: ComponentFixture<AppComponent>;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        StoreModule.forRoot(reducers, { metaReducers, runtimeChecks: {
          strictStateImmutability: false,
          strictActionImmutability: false,
          strictStateSerializability: false,
          strictActionSerializability: false,
        } })
      ],
      declarations: [
        AppComponent,
        ModalComponent
      ],
      providers: [
        ModalService
      ]
    }).compileComponents();
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    app = fixture.debugElement.componentInstance;
    store = TestBed.get(Store);
    modalService = TestBed.get(ModalService);
    spyOn(store, 'dispatch').and.callThrough();
    spyOn(modalService, 'open').and.callFake(() => {});
    spyOn(modalService, 'close').and.callFake(() => {});
    fixture.detectChanges();
  }));

  it('should create the app', () => {
    expect(app).toBeTruthy();
  });

  it(`should have as title 'Tronald Dump case'`, () => {
    expect(app.title).toEqual('Tronald Dump case');
  });

  it('should render title in a .navbar-brand tag', () => {
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('.navbar-brand').textContent).toContain('Tronald Dump case');
  });
  it('should run logOut function as expected', () => {
    const ev = new Event('click');
    component.logOut(ev);
    expect(store.dispatch).toHaveBeenCalledWith(new loginActions.LogOut());
  });
  it('should run showSurprise function as expected', () => {
    component.showSurprise();
    expect(modalService.open).toHaveBeenCalledWith('kim-modal');
  });
  it('should run closeModal function as expected', () => {
    const closeModalId = 'close-modal-test';
    component.closeModal(closeModalId);
    expect(modalService.close).toHaveBeenCalledWith(closeModalId);
  });
});
