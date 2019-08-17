import { Component, OnInit, Input } from '@angular/core';
import { QuoteModel } from 'src/app/models/quote.model';
import * as uuid from 'uuid';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { State } from 'src/app/store/reducers';
import * as myQuotesActions from '../../store/actions/my-quotes/my-quotes.actions';
import * as favoritesActions from '../../store/actions/favorites/favorites.actions';

import * as myQuotesReducers from '../../store/reducers/my-quotes/my-quotes.reducer';
import * as favoritesReducers from '../../store/reducers/favorites/favorites.reducer';

import { Router, ActivatedRoute } from '@angular/router';
import { Update } from '@ngrx/entity';
import { tap } from 'rxjs/operators';
import { merge } from 'rxjs';

/**
 * Component to add, update MyQuotes
 */
@Component({
  selector: 'app-manage-quote',
  templateUrl: './manage-quote.component.html',
  styleUrls: ['./manage-quote.component.scss']
})
export class ManageQuoteComponent implements OnInit {

  /**
   * Constructor method
   * @param fb FormBuilder instance to use
   * @param store Store instance to use
   * @param router Router instance to use
   * @param route ActivatedRoute instance to use
   */
  constructor(private fb: FormBuilder, private store: Store<State>, private router: Router, private route: ActivatedRoute) { }

  /**
   * quote to handle
   */
  quote: QuoteModel;
  /**
   * Delimiter to check if is add or edit mode.
   */
  isEditMode: boolean;
  /**
   * Model for editing
   */
  formGroup: FormGroup;
  /**
   * Flag to see if form is submitted
   */
  isSubmitted: boolean;
  /**
   * Flag to see if quote is available
   */
  isQuoteAvailable = true;
  /**
   * Flag to see if quote is favorited
   */
  isQuoteFavorited = false;
  /**
   * Component initialization method
   */
  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.isEditMode = !!id;
    if (!this.isEditMode) {
      this.quote = new QuoteModel().deserialize({
        quoteId: this.getUniqueId(),
        tags: [],
        value: ''
      });
      this.initializeForm();
    } else {
      const userQuoteStream = this.store.select(myQuotesReducers.getUserEntityById(id)).pipe(tap((quote) => {
        this.quote = quote;
        if (this.quote) {
          this.initializeForm();
        } else {
          this.isQuoteAvailable = false;
        }
      }));
      const favoriteQuoteStream = this.store.select(favoritesReducers.getFavoriteEntityById(id)).pipe(tap((quote) => {
        if (quote) {
          this.isQuoteFavorited = true;
        }
      }));

      merge(userQuoteStream, favoriteQuoteStream).subscribe();
    }
  }
  /**
   * Form initialization method
   */
  initializeForm() {
    this.formGroup = this.fb.group({
      value: new FormControl(this.quote.value, [Validators.required, Validators.minLength(100), Validators.maxLength(255)]),
      tags: new FormControl(this.quote.tags.join(', '), [Validators.required, Validators.pattern(/^\w+(,(|\s)\w+)*$/)]),
    });
  }
  /**
   * Unique id generator for new quotes
   */
  getUniqueId() {
    return uuid.v4();
  }

  /**
   * Form submit handler
   */
  submit() {
    this.isSubmitted = true;
    if (this.formGroup.valid) {
      this.quote = new QuoteModel().deserialize({
        quoteId: this.quote.quoteId,
        tags: this.formGroup.get('tags').value.split(',').map((t) => t.trim()),
        value: this.formGroup.get('value').value
      });
      if (this.isEditMode) {
        const quoteUpdate: Update<QuoteModel> = {
          id: this.quote.quoteId,
          changes: { ...this.quote }
        };
        this.store.dispatch(new myQuotesActions.UpdateOne(quoteUpdate));
        if (this.isQuoteFavorited) {
          this.store.dispatch(new favoritesActions.UpdateOne(quoteUpdate));
        }
      } else {
        this.store.dispatch(new myQuotesActions.AddOne(this.quote));
      }

      this.router.navigate(['my-quotes']);

    }
  }

}
