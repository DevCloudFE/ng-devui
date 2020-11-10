import { Directive, Input, OnDestroy, OnInit, Self } from '@angular/core';
import { AbstractControl, NgControl } from '@angular/forms';
import { DValidateSyncService } from '../services/d-validate-sync.service';

@Directive({
  selector: `[dValidateSyncKey][formControlName],[dValidateSyncKey][ngModel],[dValidateSyncKey][formControl],
    [dValidateSyncKey][formGroupName],[dValidateSyncKey][formArrayName],[dValidateSyncKey][ngModelGroup],
    [dValidateSyncKey][formGroup],[dValidateSyncKey]form:not([ngNoForm]),[dValidateSyncKey][ngForm]
  `,
  exportAs: 'dValidateSync'
})

export class DValidateSyncDirective implements OnInit, OnDestroy {
  _control: AbstractControl;

  @Input('dValidateSyncKey') key: string;

  constructor(@Self() cd: NgControl, private syncService: DValidateSyncService) {
    this._control = cd.control;
  }

  ngOnInit(): void {
    if (this.key && this._control) {
      this.syncService.addControl(this.key, this._control);
    }
  }

  ngOnDestroy(): void {
    if (this.key && this._control) {
      this.syncService.removeControl(this.key, this._control);
    }
  }
}
