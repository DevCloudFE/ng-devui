/* eslint-disable @angular-eslint/no-input-rename */
import { Directive, Input, OnChanges, OnDestroy, Self } from '@angular/core';
import { NgControl } from '@angular/forms';
import { DValidateSyncService } from '../services/d-validate-sync.service';

@Directive({
  selector: `[dValidateSyncKey][formControlName],[dValidateSyncKey][ngModel],[dValidateSyncKey][formControl],
    [dValidateSyncKey][formGroupName],[dValidateSyncKey][formArrayName],[dValidateSyncKey][ngModelGroup],
    [dValidateSyncKey][formGroup],[dValidateSyncKey]form:not([ngNoForm]),[dValidateSyncKey][ngForm]
  `,
  exportAs: 'dValidateSync',
})
export class DValidateSyncDirective implements OnChanges, OnDestroy {
  private _added = false;

  @Input('dValidateSyncKey') key: string;

  constructor(@Self() private _cd: NgControl, private syncService: DValidateSyncService) {}

  ngOnChanges() {
    if (this.key && this._cd.control && !this._added) {
      this.syncService.addControl(this.key, this._cd.control);
      this._added = true;
    }
  }

  ngOnDestroy(): void {
    if (this.key && this._cd.control) {
      this.syncService.removeControl(this.key, this._cd.control);
    }
  }
}
