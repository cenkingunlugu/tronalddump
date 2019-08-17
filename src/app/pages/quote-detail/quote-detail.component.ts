import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { QuotesService } from 'src/app/services/quotes/quotes.service';
import { QuoteModel } from 'src/app/models/quote.model';

@Component({
  selector: 'app-quote-detail',
  templateUrl: './quote-detail.component.html',
  styleUrls: ['./quote-detail.component.scss']
})
export class QuoteDetailComponent implements OnInit {

  constructor(private route: ActivatedRoute, private service: QuotesService, private location: Location) { }
  quote: QuoteModel;
  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.service.getQuoteById(id).subscribe((q) => {
      this.quote = q;
    });
  }

  goBack() {
    this.location.back();
  }

}
