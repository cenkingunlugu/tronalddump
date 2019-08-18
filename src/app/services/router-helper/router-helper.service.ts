import { Injectable } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

/**
 * Router helper service
 */
@Injectable({
  providedIn: 'root'
})
export class RouterHelperService {
  /**
   * Previous url to remember
   */
  private previousUrl: string = undefined;
  /**
   * Current url to know
   */
  private currentUrl: string = undefined;
  /**
   * constructor method
   * @param router Router instance for event subscription
   */
  constructor(private router: Router) {
    this.currentUrl = this.router.url;
    router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        console.log(event);
        this.previousUrl = this.currentUrl;
        this.currentUrl = event.url;
      }
    });
  }

  /**
   * Previous url getter method
   */
  public getPreviousUrl() {
    return this.previousUrl;
  }
}
