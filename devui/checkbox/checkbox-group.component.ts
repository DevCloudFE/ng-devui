import {
  Component,
  Input,
  Output,
  EventEmitter,
  forwardRef,
  ViewEncapsulation,
  TemplateRef,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import {
  ControlValueAccessor,
  NG_VALUE_ACCESSOR
} from '@angular/forms';
import { isArray } from 'lodash-es';
import { Observable } from 'rxjs';

@Component({
  selector: 'd-checkbox-group',
  templateUrl: './checkbox-group.component.html',
  styleUrls: ['./checkbox-group.component.scss'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => CheckBoxGroupComponent),
    multi: true
  }]
})
export class CheckBoxGroupComponent implements OnChanges, ControlValueAccessor {
  static ID_SEED = 0;

  @Input() name: string;
  @Input() itemWidth: number;
  @Input() color;
  @Input() direction: 'row' | 'column' = 'column';
  @Input() isShowTitle = true;
  @Input() options = [];
  @Input() filterKey: string;
  @Input() labelTemplate: TemplateRef<any>;
  @Input() showAnimation = true;
  @Input() beforeChange: (value) => boolean | Promise<boolean> | Observable<boolean>;
  @Output() change: EventEmitter<boolean> = new EventEmitter<boolean>();
  values: any[] = [];
  options_display = [];
  private onChange = (_: any) => null;
  private onTouch = () => null;

  ngOnChanges(changes: SimpleChanges) {
    if (changes['options']) {
      this.checkType();
    }
  }

  checkType() {
    this.options_display = [];
    const checkedArray = [];
    this.values.forEach(item => {
      if (this.filterKey && item[this.filterKey]) {
        checkedArray[item[this.filterKey]] = true;
      } else {
        checkedArray[item] = true;
      }
    });
    this.options.forEach(item => {
      const option = { isChecked: false };
      option['value'] = item;
      if (this.filterKey && item[this.filterKey]) {
        if (checkedArray[item[this.filterKey]]) {
          option['isChecked'] = true;
        }
      } else {
        if (checkedArray[item]) {
          option['isChecked'] = true;
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
    this.options_display.forEach(item => {
      if (item.isChecked) {
        checkedArray.push(item.value);
      }
    });
    return checkedArray;
  }
}
