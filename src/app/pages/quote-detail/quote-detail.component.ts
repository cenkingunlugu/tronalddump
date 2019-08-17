import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { QuotesService } from 'src/app/services/quotes/quotes.service';
import { QuoteModel } from 'src/app/models/quote.model';

/**
 * Quote detail component
 */
@Component({
  selector: 'app-quote-detail',
  templateUrl: './quote-detail.component.html',
  styleUrls: ['./quote-detail.component.scss']
})
export class QuoteDetailComponent implements OnInit {
  /**
   * constructor method
   * @param route ActivatedRoute to get path params
   * @param service QuotesService to get quote by its id
   * @param location Location to navigate back
   */
  constructor(private route: ActivatedRoute, private service: QuotesService, private location: Location) { }
  /**
   * quote object to deal with
   */
  quote: QuoteModel;
  /**
   * Initialization method
   */
  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.service.getQuoteById(id).subscribe((q) => {
      this.quote = q;
    });
  }
  /**
   * Back button handler method
   */
  goBack() {
    this.location.back();
  }

}
