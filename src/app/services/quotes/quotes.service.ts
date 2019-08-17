import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { QuoteModel} from '../../models/quote.model';

/**
 * Interface for tags response
 */
export interface TagsResponse {
  /**
   * count of tags
   */
  count: number;
  /**
   * embedded tags
   */
  _embedded: any;
}

/**
 * Quotes service
 */
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

  /**
   * method to get a single quote by id
   * @param id string to get quote by
   */
  getQuoteById(id: string): Observable<QuoteModel> {
    return this.http.get<QuoteModel>(this.baseUrl + '/quotes/quote/' + id);
  }

  /**
   * method to get random quotes
   */
  getRandomQuotes(): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl + '/quotes/randomlist').pipe(
      map((quotes) => {
        return quotes.map((q) => new QuoteModel().deserialize(q));
      })
    );
  }

  /**
   * method to get tags
   */
  getTags(): Observable<[]> {
    return this.http.get<TagsResponse>(this.baseUrl + '/quotes/tags').pipe(map((objects) => {
      return objects._embedded as [];
    }));
  }

  /**
   * method to get a random meme image
   */
  getRandomMeme(): Observable<Blob> {
    return this.http.get(this.baseUrl + '/quotes/randommeme', {responseType: 'blob'}).pipe(map((value) => {
      return value;
    }));
  }

  /**
   * method to get the details of a single tag
   * @param tagName name of the tag
   */
  getTagsDetail(tagName: string): Observable<[]> {
    return this.http.get<TagsResponse>(this.baseUrl + '/quotes/tags/' + tagName).pipe(map((objects) => {
      return objects._embedded.tags.map((q) => new QuoteModel().deserialize(q));
    }));
  }
}
