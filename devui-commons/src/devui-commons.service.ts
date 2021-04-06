import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { filter, map } from 'rxjs/operators';

interface CommonsEvent {
  key: any;
  data?: any;
}

@Injectable({
  providedIn: 'root'
})

export class DevuiCommonsService {
  private _eventBus: Subject<CommonsEvent>;

  constructor() {
    this._eventBus = new Subject<CommonsEvent>();
  }

  broadcast(key: any, data?: any) {
    this._eventBus.next({key, data});
  }

  on<T>(key: any): Observable<T> {
    return this._eventBus.asObservable().pipe(
      filter(event => event.key === key),
      map(event => <T>event.data)
    )
  }
}
