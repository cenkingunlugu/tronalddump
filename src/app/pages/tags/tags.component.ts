import { Component, OnInit } from '@angular/core';
import { QuotesService } from 'src/app/services/quotes/quotes.service';
import { ActivatedRoute } from '@angular/router';
import { QuoteModel } from 'src/app/models/quote.model';
import { DeviceDetectorService } from 'ngx-device-detector';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-tags',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.scss']
})
export class TagsComponent implements OnInit {

  constructor(private service: QuotesService, private route: ActivatedRoute, private deviceDetectorService: DeviceDetectorService) { }
  tagName: string;
  quotes: QuoteModel[];
  isLoading: boolean;
  isMobile: boolean;
  currentIndex = 0;
  ngOnInit() {
    this.isLoading = true;
    this.isMobile = this.deviceDetectorService.isMobile();
    this.tagName = this.route.snapshot.paramMap.get('tagName').toString();
    this.service.getTagsDetail(this.tagName).subscribe((q) => {
      this.quotes = q;
      this.isLoading = false;
    });
  }

}
