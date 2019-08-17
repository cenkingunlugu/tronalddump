import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { QuoteModel} from '../../models/quote.model';

export interface TagsResponse {
  count: number;
  _embedded: any;
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

  getQuoteById(id: string): Observable<QuoteModel> {
    return this.http.get<QuoteModel>(this.baseUrl + '/quotes/quote/' + id);
  }

  getRandomQuotes(): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl + '/quotes/randomlist').pipe(
      map((quotes) => {
        return quotes.map((q) => new QuoteModel().deserialize(q));
      })
    );
  }

  getTags(): Observable<[]> {
    return this.http.get<TagsResponse>(this.baseUrl + '/quotes/tags').pipe(map((objects) => {
      return objects._embedded as [];
    }));
  }

  getRandomMeme(): Observable<Blob> {
    return this.http.get(this.baseUrl + '/quotes/randommeme', {responseType: 'blob'}).pipe(map((value) => {
      return value;
    }));
  }

  getTagsDetail(tagName: string): Observable<[]> {
    return this.http.get<TagsResponse>(this.baseUrl + '/quotes/tags/' + tagName).pipe(map((objects) => {
      return objects._embedded.tags.map((q) => new QuoteModel().deserialize(q));
    }));
  }
}
