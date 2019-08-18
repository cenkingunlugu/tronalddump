import { Component, OnInit, Input } from '@angular/core';
import { QuoteModel } from 'src/app/models/quote.model';
import { Store } from '@ngrx/store';
import { State } from 'src/app/store/reducers';
import * as loginReducers from '../../store/reducers/login/login.reducer';
import * as memeReducers from '../../store/reducers/meme/meme.reducer';

import * as favoriteReducers from '../../store/reducers/favorites/favorites.reducer';
import * as favoriteActions from '../../store/actions/favorites/favorites.actions';
import * as myQuoteActions from '../../store/actions/my-quotes/my-quotes.actions';

import { tap, concatMapTo } from 'rxjs/operators';
import { merge } from 'rxjs';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { ModalService } from 'src/app/services/modal/modal.service';

/**
 * Quote list component to be used whenever needed
 * (in favorites, my-quotes, tags, etc.)
 */
@Component({
  selector: 'app-quote-list',
  templateUrl: './quote-list.component.html',
  styleUrls: ['./quote-list.component.scss']
})
export class QuoteListComponent implements OnInit {
  /**
   * constructor method
   * @param store Store instance to select and dispatch
   * @param sanitizer DomSanitizer instance to sanitize Blob url
   * @param modalService ModalService to open or close modals when needed
   */
  constructor(private store: Store<State>, private sanitizer: DomSanitizer, private modalService: ModalService) { }

  /**
   * List of quotes to be listed as an input
   */
  @Input() quotes: QuoteModel[];
  /**
   * Flag to check if myQuotes
   */
  @Input() isMyQuotes: boolean;
  /**
   * favoriteQuoteId's to check them as favorite
   */
  favoriteQuoteIds: string[];
  /**
   * User login flag
   */
  isUserLoggedIn: boolean;
  /**
   * Meme state to be shown when needed
   */
  meme: memeReducers.MemeState;
  /**
   * Meme url to be set when needed
   */
  memeUrl: SafeUrl;
  /**
   * Initialization method
   */
  ngOnInit() {

    const quoteStream = this.store.select(loginReducers.selectLoginState).pipe(tap(
      (state) => {
        this.isUserLoggedIn = !!state.user;
      }),
      concatMapTo(this.store.select(favoriteReducers.getFavoritesEntitiesState)),
      tap((favorites) => {
        const filtered = this.quotes.filter(o => !!favorites.find(o2 => o.quoteId === o2.quoteId)).map((quote) => quote.quoteId);
        this.favoriteQuoteIds = filtered;
      })
    );

    const memeStream = this.store.select(memeReducers.selectMemeState).pipe(tap((meme: memeReducers.MemeState) => {
      this.meme = meme;
      if (meme.memeImage) {
        this.memeUrl = this.sanitizer.bypassSecurityTrustUrl(meme.memeImage.toString());
        this.modalService.open('fake-modal');
      } else {
        if (this.memeUrl) {
          this.modalService.close('fake-modal');
        }
        this.memeUrl = '';
      }
    }));

    merge(quoteStream, memeStream).subscribe();
  }
  /**
   * Favorite checker method
   * @param quote to check if it is favorited
   */
  isFavorite(quote: QuoteModel) {
    return this.favoriteQuoteIds.includes(quote.quoteId);
  }

  /**
   * Favorite toggler method
   * @param quote QuoteModel to favorite or unfavorite
   */
  favoriteQuote(quote: QuoteModel) {
    if (this.isFavorite(quote)) {
      this.store.dispatch(new favoriteActions.Delete(quote));
    } else {
      this.store.dispatch(new favoriteActions.AddOne(quote));
    }
  }

  /**
   * Quote deletion method
   */
  removeMyQuote(quote: QuoteModel) {
    this.store.dispatch(new myQuoteActions.Delete(quote));
  }

  /**
   * Modal closer method
   */
  closeModal(id: string) {
    this.modalService.close(id);
  }

}
