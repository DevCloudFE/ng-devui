import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';

@Injectable()
export class AccordionService {
  childListSubject = new ReplaySubject(1);
  childListObs = this.childListSubject.asObservable();

  setChildListInstance(listInstance, parent) {
    this.childListSubject.next({ listInstance, parent });
  }

  getChildListInstance() {
    return this.childListObs;
  }
}
