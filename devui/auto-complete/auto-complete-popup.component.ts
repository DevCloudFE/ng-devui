import {
  Component,
  Input,
  TemplateRef
} from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
import { DevUIConfig } from 'ng-devui/devui.config';

@Component({
  selector: 'd-auto-complete-popup',
  templateUrl: './auto-complete-popup.component.html',
  // tslint:disable-next-line:no-host-metadata-property
  host: {
    '[class]': '"devui-dropdown-menu "  +  (cssClass ? cssClass : "")',
    '[style.display]': 'isOpen && (source?.length || noResultItemTemplate) ? "inline-block" : "none"',
  },
  styleUrls: ['auto-complete-popup.component.scss']
})
export class AutoCompletePopupComponent implements ControlValueAccessor {
  activeIndex = 0;
  @Input() cssClass: string;
  @Input() maxHeight: number;
  @Input() disabled: boolean;
  @Input() source: any[];
  @Input() isOpen: boolean;
  @Input() term: string;
  @Input() itemTemplate: TemplateRef<any>;
  @Input() noResultItemTemplate: TemplateRef<any>;
  @Input() formatter: (item: any) => string;
  @Input() dropdown: boolean;
  // @Input() selectWidth: any;  // not use

  private value: any;
  private onChange = (_: any) => null;
  private onTouched = () => null;

  constructor(private devuiConfig: DevUIConfig) {
    this.formatter = this.devuiConfig.autoComplete.formatter;
    this.maxHeight = 300;
  }

  writeValue(obj: any): void {
    this.value = obj;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  onSelect(item: any) {
    this.value = item;
    this.onTouched();
    this.onChange(this.value);
  }

  selectCurrentItem() {
    this.onSelect(this.source[this.activeIndex]);
  }

  onActiveIndexChange(index) {
    this.activeIndex = index;
  }

  reset() {
    this.activeIndex = 0;
  }

  next() {
    if (this.isOpen && this.source && this.source.length) {
      if (this.activeIndex === this.source.length - 1) {
        this.activeIndex = 0;
        return;
      }
      this.activeIndex = this.activeIndex + 1;
    }
  }

  prev() {
    if (this.isOpen && this.source && this.source.length) {
      if (this.activeIndex === 0) {
        this.activeIndex = this.source.length - 1;
        return;
      }
      this.activeIndex = this.activeIndex - 1;
    }
  }
  trackByFn(index, item) {
    return index;
  }
}
