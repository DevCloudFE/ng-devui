import { OnInit, QueryList, Injectable, OnDestroy } from '@angular/core';
import { Subject, BehaviorSubject, Observable, Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

export class DescendantChildren<T> implements OnInit, OnDestroy {
  constructor (private drs: DescendantRegisterService<T>) {}
  protected descendantItem: T;
  ngOnInit() {
    this.drs.register(this.descendantItem);
  }
  ngOnDestroy() {
    this.drs.unregister(this.descendantItem);
  }
}

export class DescendantRoot<T> extends QueryList<T> {
  protected sub: Subscription;
  constructor(private drs: DescendantRegisterService<T>) {
    super();
  }
  public on() {
    if (this.sub) { return; }
    this.reset(this.drs.queryResult());
    this.sub = this.drs.changes.subscribe(result => {this.reset(result); });
  }

  public off() {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }
}

@Injectable()
export class DescendantRegisterService<T> {
  protected _result: Array<T> = [];
  protected changeSubject: Subject<Array<T>> = new BehaviorSubject<Array<T>>([]);
  public changes: Observable<Array<T>> = this.changeSubject.asObservable().pipe(
    debounceTime(200)
  );
  public register(t: T) {
    if (!t) {return; }
    const index = this._result.indexOf(t);
    if (index === -1 ) {
      this._result.push(t);
      this.changeSubject.next(this._result);
    }
  }
  public unregister(t: T) {
    if (!t) {return; }
    const index = this._result.indexOf(t);
    if (index > -1 ) {
      this._result.splice(index, 1);
      this.changeSubject.next(this._result);
    }
  }
  public queryResult() {
    return this._result.concat([]);
  }
}
