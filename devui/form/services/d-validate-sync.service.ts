import { Injectable } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { Subscription } from 'rxjs';

function resolvedPromiseFunc() { return Promise.resolve(null); }
const resolvedPromise = resolvedPromiseFunc();
@Injectable({ providedIn: 'root' })
export class DValidateSyncService {

  controlsMap: Map<string, AbstractControl[]>;
  controlsSubMap: Map<AbstractControl, Subscription>;

  constructor() {
    this.controlsMap = new Map();
    this.controlsSubMap = new Map();
  }

  addControl(key: string, cd: AbstractControl): void {
    if (!this.controlsMap.get(key)) {
      this.controlsMap.set(key, []);
    }
    this.controlsMap.get(key).push(cd);
    this._addControlSubscription(key, cd);
  }

  removeControl(key: string, cd: AbstractControl): void {
    if (this.controlsMap.get(key)) {
      const controls = this.controlsMap.get(key);
      const index = controls.indexOf(cd);
      if (index !== -1) {
        controls.splice(index, 1);
      }
    }
    this._removeControlSubscription(cd);
  }

  validateControlsSync(key: string, cd: AbstractControl): void {
    const controls = this.controlsMap.get(key);

    if (controls) {
      controls.forEach(control => { // 首先清除当前周期监听，避免循环监听
        this._removeControlSubscription(control);
      });

      controls.forEach(control => {
        if (control !== cd) {
          resolvedPromise.then(() => { // 在下一个视图更新周期执行
            control.updateValueAndValidity();
          });
        }
      });

      controls.forEach(control => {
        resolvedPromise.then(() => {
          this._addControlSubscription(key, control);
        });
      });
    }
  }

  _addControlSubscription(key: string, cd: AbstractControl): void {
    this._removeControlSubscription(cd);
    const sub = cd.valueChanges.subscribe(() => {
      this.validateControlsSync(key, cd);
    });
    this.controlsSubMap.set(cd, sub);
  }

  _removeControlSubscription(cd: AbstractControl): void {
    if (this.controlsSubMap.get(cd)) {
      this.controlsSubMap.get(cd).unsubscribe();
      this.controlsSubMap.delete(cd);
    }
  }
}
