import { EventEmitter } from '@angular/core';

export class PreserveNextEventEmitter<T> extends EventEmitter<T> {
  /** 保留注册的 generatorOrNext构成的函数*/
  private _schedulerFns: Set<any>;
  private _isAsync: boolean;
  get schedulerFns() { return this._schedulerFns; }

  constructor(isAsync = false) {
    super(isAsync);
    this._isAsync = isAsync;
  }

  forceCallback(value: T, once = false) {
    if (this.schedulerFns && this.schedulerFns.size) {
      this.schedulerFns.forEach(fn => {
        fn (value);
      });
      if (once) {
        this.cleanCallbackFn();
      }
    }
  }
  cleanCallbackFn() {
    this._schedulerFns = undefined;
  }

  emit(value?: T) { super.emit(value); }

  subscribe(generatorOrNext?: any, error?: any, complete?: any): any {
    let schedulerFn: (t: any) => any;

    if (generatorOrNext && typeof generatorOrNext === 'object') {
      schedulerFn = this._isAsync ? (value: any) => {
        setTimeout(() => generatorOrNext.next(value));
      } : (value: any) => { generatorOrNext.next(value); };
    } else {
      schedulerFn = this._isAsync ? (value: any) => { setTimeout(() => generatorOrNext(value)); } :
        (value: any) => { generatorOrNext(value); };
    }
    if (!this._schedulerFns) {
      this._schedulerFns = new Set<any>();
    }
    this._schedulerFns.add(schedulerFn);

    return super.subscribe(generatorOrNext, error, complete);
  }

}
