import { Component, OnInit } from '@angular/core';
import { QuotesService } from 'src/app/services/quotes/quotes.service';
import { ActivatedRoute } from '@angular/router';
import { QuoteModel } from 'src/app/models/quote.model';
import { DeviceDetectorService } from 'ngx-device-detector';

/**
 * Tags component
 */
@Component({
  selector: 'app-tags',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.scss']
})
export class TagsComponent implements OnInit {
  /**
   * constructor method
   * @param service QuotesService to get tagsDetail
   * @param route ActivatedRoute to get path param tagName
   * @param deviceDetectorService DeviceDetectorService to detect if device is mobile for not rendering 2 different types of view
   * for both mobile and desktop devices. A little bit optimization.
   */
  constructor(private service: QuotesService, private route: ActivatedRoute, private deviceDetectorService: DeviceDetectorService) { }
  /**
   * Tag name to see detail
   */
  tagName: string;
  /**
   * QuoteModel list related to the tag
   */
  quotes: QuoteModel[];
  /**
   * Loading checker flag
   */
  isLoading: boolean;
  /**
   * Mobile checker flag
   */
  isMobile: boolean;
  /**
   * Index to handle swipes, etc.
   */
  currentIndex = 0;
  /**
   * Initialization method
   */
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
