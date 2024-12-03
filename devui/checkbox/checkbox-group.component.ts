import { Component, EventEmitter, forwardRef, Input, OnChanges, Output, SimpleChanges, TemplateRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { DevConfigService, WithConfig } from 'ng-devui/utils';
import { isArray } from 'lodash-es';
import { Observable } from 'rxjs';

@Component({
  selector: 'd-checkbox-group',
  templateUrl: './checkbox-group.component.html',
  styleUrls: ['./checkbox-group.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CheckBoxGroupComponent),
      multi: true,
    },
  ],
  preserveWhitespaces: false,
})
export class CheckBoxGroupComponent implements OnChanges, ControlValueAccessor {
  static ID_SEED = 0;
  @Input() name: string;
  @Input() itemWidth: number;
  @Input() color;
  @Input() direction: 'row' | 'column' = 'column';
  @Input() isShowTitle = true;
  @Input() disabled = false;
  @Input() options = [];
  @Input() filterKey: string;
  @Input() labelTemplate: TemplateRef<any>;
  @Input() @WithConfig() showAnimation = true;
  @Input() beforeChange: (value) => boolean | Promise<boolean> | Observable<boolean>;
  @Output() change: EventEmitter<boolean> = new EventEmitter<boolean>();
  values: any[] = [];
  options_display = [];
  private onChange = (_: any) => null;
  private onTouch = () => null;

  constructor(private devConfigService: DevConfigService) {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes.options) {
      this.values = this.values ?? [];
      this.checkType();
    }
  }

  checkType() {
    this.options = this.options ?? [];
    this.options_display = [];
    const checkedArray = [];
    this.values.forEach((item) => {
      if (this.filterKey && item[this.filterKey]) {
        checkedArray[item[this.filterKey]] = true;
      } else {
        checkedArray[item] = true;
      }
    });
    this.options.forEach((item) => {
      const option: any = { isChecked: false };
      option.value = item;
      if (this.filterKey && item[this.filterKey]) {
        if (checkedArray[item[this.filterKey]] === true) {
          option.isChecked = true;
        }
      } else {
        if (checkedArray[item] === true) {
          option.isChecked = true;
        }
      }
      this.options_display.push(option);
    });
  }

  writeValue(inputArray: any): void {
    if (inputArray && isArray(inputArray)) {
      this.values = inputArray;
      this.checkType();
    }
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }

  toggle($event, i) {
    this.onChange(this.getCheckedArray());
    this.onTouch();
    this.change.next(this.options_display[i]);
  }

  getCheckedArray() {
    const checkedArray = [];
    this.options_display.forEach((item) => {
      if (item.isChecked) {
        checkedArray.push(item.value);
      }
    });
    return checkedArray;
  }
}
