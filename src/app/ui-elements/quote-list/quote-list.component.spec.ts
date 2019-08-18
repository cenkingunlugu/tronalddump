import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuoteListComponent } from './quote-list.component';
import { StoreModule, Store } from '@ngrx/store';
import { reducers, metaReducers, State } from 'src/app/store/reducers';
import { ModalService } from 'src/app/services/modal/modal.service';
import { ModalComponent } from '../modal/modal.component';
import { RouterTestingModule } from '@angular/router/testing';
import { QuoteModel } from 'src/app/models/quote.model';
import * as loginReducers from '../../store/reducers/login/login.reducer';
import * as memeReducers from '../../store/reducers/meme/meme.reducer';
import * as favoriteReducers from '../../store/reducers/favorites/favorites.reducer';
import { of } from 'rxjs';
import { DomSanitizer } from '@angular/platform-browser';
import * as favoriteActions from '../../store/actions/favorites/favorites.actions';
import * as myQuoteActions from '../../store/actions/my-quotes/my-quotes.actions';

describe('QuoteListComponent', () => {
  let component: QuoteListComponent;
  let fixture: ComponentFixture<QuoteListComponent>;
  let store: Store<State>;
  let modalService: ModalService;
  let sanitizer: DomSanitizer;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuoteListComponent, ModalComponent ],
      imports: [
        RouterTestingModule,
        StoreModule.forRoot(reducers, { metaReducers, runtimeChecks: {
          strictStateImmutability: false,
          strictActionImmutability: false,
          strictStateSerializability: false,
          strictActionSerializability: false,
        } })
      ],
      providers: [
        ModalService
      ]
    })
    .compileComponents();
  }));

  const favoriteQuote = new QuoteModel().deserialize({
    quoteId: 'favorite-quote'
  });
  const nonFavoriteQuote = new QuoteModel().deserialize({
    quoteId: 'non-favorite-quote'
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuoteListComponent);
    component = fixture.componentInstance;
    store = TestBed.get(Store);
    modalService = TestBed.get(ModalService);
    sanitizer = TestBed.get(DomSanitizer);
    spyOn(store, 'dispatch').and.callThrough();
    spyOn(store, 'select').and.callFake((selector) => {
      switch (selector) {
        case loginReducers.selectLoginState:
          return of({
            user: 'test-user'
          });
        case favoriteReducers.getFavoritesEntitiesState:
          return of([favoriteQuote]);
        case memeReducers.selectMemeState:
          return of({
            isVisible: false,
            memeImage: ''
          });
        default:
          return;
      }
    });

    spyOn(modalService, 'open').and.callFake(() => {});
    spyOn(modalService, 'close').and.callFake(() => {});
    component.quotes = [favoriteQuote, nonFavoriteQuote];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should init as expected', () => {
    component.ngOnInit();
    expect(component.favoriteQuoteIds.includes(favoriteQuote.quoteId)).toBe(true);
  });

  describe('memeImage mechanism', () => {
    it('should work as expected when there is no meme', () => {
      component.memeUrl = 'fake-meme-url';
      component.ngOnInit();
      expect(modalService.close).toHaveBeenCalledWith('fake-modal');
      expect(component.memeUrl).toBe('');
    });

    it('should work as expected when there is a meme', () => {
      (store.select as jasmine.Spy).and.callFake((selector) => {
        switch (selector) {
          case loginReducers.selectLoginState:
            return of({
              user: 'test-user'
            });
          case favoriteReducers.getFavoritesEntitiesState:
            return of([favoriteQuote]);
          case memeReducers.selectMemeState:
            return of({
              isVisible: true,
              memeImage: 'some-fake-meme-image-url'
            });
          default:
            return;
        }
      });
      component.ngOnInit();
      expect(component.memeUrl).toEqual(sanitizer.bypassSecurityTrustUrl('some-fake-meme-image-url'));
      expect(modalService.open).toHaveBeenCalledWith('fake-modal');
    });
  });

  it('should run isFavorite function as expected', () => {
    const favoriteExpectation = component.isFavorite(favoriteQuote);
    const nonFavoriteExpectation = component.isFavorite(nonFavoriteQuote);
    expect(favoriteExpectation).toBe(true);
    expect(nonFavoriteExpectation).toBe(false);
  });

  it('should run favoriteQuote method as expected', () => {
    component.favoriteQuote(favoriteQuote);
    expect(store.dispatch).toHaveBeenCalledWith(new favoriteActions.Delete(favoriteQuote));
    component.favoriteQuote(nonFavoriteQuote);
    expect(store.dispatch).toHaveBeenCalledWith(new favoriteActions.AddOne(nonFavoriteQuote));
  });

  it('should run removeMyQuote as expected', () => {
    component.removeMyQuote(nonFavoriteQuote);
    expect(store.dispatch).toHaveBeenCalledWith(new myQuoteActions.Delete(nonFavoriteQuote));
  });

  it('should run closeModal function as expected', () => {
    const closeModalId = 'close-modal-test';
    component.closeModal(closeModalId);
    expect(modalService.close).toHaveBeenCalledWith(closeModalId);
  });
});

