import { Injectable } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';

@Injectable({providedIn: 'root'})
export class ComponentDataService {
  private comDataSubject = new ReplaySubject<any>(1);
  private comDataObs = this.comDataSubject.asObservable();

  set comData(value) {
    this.comDataSubject.next(value);
  }

  getComData(): Observable<any> {
    return this.comDataObs;
  }
}
