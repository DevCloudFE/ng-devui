import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';

@Injectable()
export class AnchorService {
  currentActiveAnchorSubject = new ReplaySubject(1);
  currentActiveAnchorObs = this.currentActiveAnchorSubject.asObservable();
  currentActiveAnchor: string;
  anchorList: string[] = [];

  setCurrentActive(anchor: string) {
    if (this.anchorList.indexOf(anchor) >= 0) {
      this.currentActiveAnchor = anchor;
      this.currentActiveAnchorSubject.next(anchor);
    } else if (!anchor) {
      this.currentActiveAnchor = '';
    }
  }

  getCurrentActive() {
    return this.currentActiveAnchorObs;
  }
}
