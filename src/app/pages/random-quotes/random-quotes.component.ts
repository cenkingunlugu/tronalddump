import { Component, OnInit } from '@angular/core';
import { QuotesService } from '../../services/quotes/quotes.service';
import { tap } from 'rxjs/operators';
import { combineLatest } from 'rxjs';
import { QuoteModel } from 'src/app/models/quote.model';
/**
 * Tag interface to simplify
 */
export interface ITag {
  /**
   * is tag disabled (not included by random quotes?)
   */
  disabled: boolean;
  /**
   * value of the tag
   */
  value: string;
}
/**
 * Random quotes component
 */
@Component({
  selector: 'app-random-quotes',
  templateUrl: './random-quotes.component.html',
  styleUrls: ['./random-quotes.component.scss']
})
export class RandomQuotesComponent implements OnInit {
  /**
   * constructor method
   * @param quotesService QuotesService to get randomQuotes and tags
   */
  constructor(private quotesService: QuotesService) {}
  /**
   * random quotes to list
   */
  quotes: QuoteModel[];
  /**
   * tags included in quotes
   */
  tags: ITag[];
  /**
   * Loading indicator
   */
  isLoading: boolean;
  /**
   * Method to handle the requests and set quotes and tags
   */
  getPageObjects() {
    this.isLoading = true;

    const quotesStream = this.quotesService.getRandomQuotes();

    const tagsStream = this.quotesService.getTags();

    combineLatest(quotesStream, tagsStream).pipe(tap(([quotes, tags]) => {
      this.quotes = quotes;
      const quoteTags = [...new Set([].concat.apply([], this.quotes.map((q) => q.tags)))];
      this.tags = [];
      tags.forEach((t) => {
        let disabled = true;
        if (quoteTags.includes(t)) {
          disabled = false;
        }
        this.tags.push({
          disabled,
          value: t
        });
      });
      this.isLoading = false;
    })).subscribe();

  }
  /**
   * Quote shuffling method
   */
  shuffleQuotes() {
    this.quotes.sort(() => Math.random() - 0.5);
  }
  /**
   * Initialization method
   */
  ngOnInit() {
    this.getPageObjects();
  }

}
