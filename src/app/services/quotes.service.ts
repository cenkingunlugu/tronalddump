import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { QuoteModel} from '../models/quote.model';
export interface TagsResponse {
  count: number;
  _embedded: [];
}

@Injectable({
  providedIn: 'root'
})
export class QuotesService {
  /**
   * Base url for requests
   */
  baseUrl = environment.baseUrl;

  /**
   * Constructor method
   * @param http client instance
   */
  constructor(private http: HttpClient) { }

  getRandomQuotes(): Observable<QuoteModel[]> {
    return this.http.get<QuoteModel[]>(this.baseUrl + 'quotes/randomlist');
  }

  getTags(): Observable<[]> {
    return this.http.get<TagsResponse>(this.baseUrl + 'quotes/tags').pipe(map((objects) => {
      return objects._embedded;
    }));
  }
}
