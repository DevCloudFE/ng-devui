import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MentionService {

  subs = new Subject();

  scrollSubs = new Subject();

  constructor() {}

  selectSuggestion (suggestion) {
    this.subs.next(suggestion);
  }
}
