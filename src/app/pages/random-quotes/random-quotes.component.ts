import { Component, OnInit } from '@angular/core';
import { QuotesService } from '../../services/quotes.service';
import { tap } from 'rxjs/operators';
import { combineLatest } from 'rxjs';
import { QuoteModel } from 'src/app/models/quote.model';
export interface ITag {
  disabled: boolean;
  value: string;
}

@Component({
  selector: 'app-random-quotes',
  templateUrl: './random-quotes.component.html',
  styleUrls: ['./random-quotes.component.scss']
})
export class RandomQuotesComponent implements OnInit {
  quotes: QuoteModel[];
  tags: ITag[];
  isLoading: boolean;
  constructor(private quotesService: QuotesService) {
  }
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
  shuffleQuotes() {
    this.quotes.sort(() => Math.random() - 0.5);
  }
  ngOnInit() {
    this.getPageObjects();
  }

}
