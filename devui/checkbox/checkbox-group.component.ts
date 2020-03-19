import {
  Component,
  Input,
  Output,
  EventEmitter,
  forwardRef,
  TemplateRef,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import {
  ControlValueAccessor,
  NG_VALUE_ACCESSOR
} from '@angular/forms';

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
  @Input() color;
  @Input() direction: 'row' | 'column' = 'column';
  @Input() isShowTitle = true;
  @Input() options = [];
  @Input() filterKey: string;
  @Input() labelTemplate: TemplateRef<any>;
  @Output() change: EventEmitter<boolean> = new EventEmitter();
  values: any[];
  options_display = [];
  private onChange = (_: any) => null;
  private onTouch = () => null;

  ngOnChanges(changes: SimpleChanges) {
    if (changes['options']) {
      this.checkType();
    }
  }

  checkType() {
    if (!this.values) {
      return;
    }
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
      const option = {isChecked: false};
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
    this.values = inputArray;
    this.checkType();
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
