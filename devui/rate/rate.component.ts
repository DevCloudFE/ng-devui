import { ChangeDetectorRef, Component, forwardRef, Input, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'd-rate',
  templateUrl: './rate.component.html',
  styleUrls: ['./rate.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => RateComponent),
      multi: true
    }
  ],
  preserveWhitespaces: false,
})
export class RateComponent implements OnInit, ControlValueAccessor {
  @Input() read = false;
  @Input() count = 5;
  @Input() color = '';
  @Input() icon = '';
  @Input() character = '';
  @Input() type: 'success' | 'warning' | 'error';
  @Input() allowHalf = false;
  totalLevel_array = [];
  chooseValue: number;
  width = '';
  onChange: (value: number) => void;
  onTouched: () => void;

  constructor(
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    for (let i = 0; i < this.count; i++) {
      this.totalLevel_array.push({ width: '0' });
    }
  }

  // 只读模式配置
  setStaticRating() {
    const half_star = this.chooseValue % 1;
    const int_current_level = Math.floor(this.chooseValue);
    this.setChange(0, int_current_level + 1, '100%');
    if (half_star > 0) {
      this.totalLevel_array[int_current_level + 1]['width'] = half_star * 100 + '%';
      this.setChange(int_current_level + 2, this.count, '0');
    } else {
      this.setChange(int_current_level + 1, this.count, '0');
    }
  }

  // 动态模式配置
  setDynamicRating() {
    const halfStar = this.chooseValue % 1;
    const wholeStar = Math.floor(this.chooseValue);
    this.setChange(0, wholeStar + 1, '100%');
    if (this.allowHalf && halfStar) {
      this.setChange(wholeStar + 1, wholeStar + 2, '50%');
      this.setChange(wholeStar + 2, this.count, '0');
    } else {
      this.setChange(wholeStar + 1, this.count, '0');
    }
  }

  hoverToggle(event, index?: number, reset = false) {
    if (this.read) {
      return;
    }
    if (reset) {
      // chooseValue从index取值故比真实值小1
      if (this.chooseValue >= -0.5) {
        this.setDynamicRating();
      } else {
        this.setChange(0, this.count, '0');
      }
    } else {
      this.setChange(0, index, '100%');
      if (this.allowHalf && (event.offsetX * 2 <= event.target.clientWidth)) {
        this.setChange(index, index + 1, '50%');
      } else {
        this.setChange(index, index + 1, '100%');
      }
      this.setChange(index + 1, this.count, '0');
    }
  }
  // 根据mouseMove，mouseLeave,select等操作，改变颜色与是否选中
  setChange(start, end, width) {
    for (let i = start; i < end; i++) {
      this.totalLevel_array[i]['width'] = width;
    }
  }

  selectValue(event, index) {
    if (this.read) {
      return;
    }
    this.setChange(0, index, '100%');

    if (this.allowHalf && (event.offsetX * 2 <= event.target.clientWidth)) {
      this.setChange(index, index + 1, '50%');
      this.chooseValue = index - 0.5;
    } else {
      this.setChange(index, index + 1, '100%');
      this.chooseValue = index;
    }

    this.setChange(index + 1, this.count, '0');
    this.onChange(this.chooseValue + 1);
    this.onTouched();
  }

  registerOnChange(fn: (_: number) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  writeValue(value: number | null): void {
    this.chooseValue = value - 1;
    if (this.read) {
      this.setStaticRating();
    } else {
      this.setDynamicRating();
    }
  }
}
