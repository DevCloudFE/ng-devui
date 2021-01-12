import { CdkOverlayOrigin } from '@angular/cdk/overlay';
import { Component, ElementRef, Input, TemplateRef, ViewChild } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
import { fadeInOut } from 'ng-devui/utils';
import { AutoCompleteConfig } from './auto-complete-config';

@Component({
  selector: 'd-auto-complete-popup',
  templateUrl: './auto-complete-popup.component.html',
  styleUrls: ['auto-complete-popup.component.scss'],
  animations: [fadeInOut],
  preserveWhitespaces: false,
})
export class AutoCompletePopupComponent implements ControlValueAccessor {
  @Input() width: number;
  @Input() cssClass: string;
  @Input() maxHeight: number;
  @Input() disabled: boolean;
  @Input() disabledKey: string;
  @Input() source: any[];
  @Input() position: any;
  @Input() isOpen: boolean;
  @Input() term: string;
  @Input() popTipsText: string;
  @Input() overview: string;
  @Input() itemTemplate: TemplateRef<any>;
  @Input() noResultItemTemplate: TemplateRef<any>;
  @Input() searchingTemplate: TemplateRef<any>;
  @Input() isSearching = false;
  @Input() formatter: (item: any) => string;
  @Input() dropdown: boolean;
  @Input() selectWidth: any;
  @Input() enableLazyLoad: boolean;
  @Input() appendToBody = false;
  @Input() origin: CdkOverlayOrigin | undefined;
  @ViewChild('selectMenuElement') selectMenuElement: ElementRef;
  @ViewChild('dropdownUl') dropdownUl: ElementRef;
  activeIndex = 0;
  showLoading = false;
  private value: any;
  labelMinHeight = 20; // position.top小于20px时候，表示光标在第一行
  private onChange = (_: any) => null;
  private onTouched = () => null;

  constructor(private autoCompleteConfig: AutoCompleteConfig, public elementRef: ElementRef) {
    this.formatter = this.autoCompleteConfig.autoComplete.formatter;
    this.maxHeight = 300;
  }

  writeValue(obj): void {
    this.value = obj;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  registerOnChange(fn): void {
    this.onChange = fn;
  }

  registerOnTouched(fn): void {
    this.onTouched = fn;
  }

  onSelect(event, item) {
    if (this.disabledKey && item[this.disabledKey]) {
      event.preventDefault();
      event.stopPropagation();
      return;
    }
    if (this.overview === 'single') {
      // 单选场景和单行场景不需要冒泡
      event.preventDefault();
      event.stopPropagation();
    }

    this.value = item;
    this.onTouched();
    this.onChange({ type: 'select', value: this.value });
  }

  selectCurrentItem(event) {
    this.onSelect(event, this.source[this.activeIndex]);
  }

  onActiveIndexChange(index) {
    this.activeIndex = index;
  }

  reset() {
    this.activeIndex = 0;
  }

  scrollToActive(): void {
    const that = this;
    setTimeout(() => {
      const selectIndex = that.activeIndex;
      const scrollPane: any = that.dropdownUl.nativeElement.children[selectIndex];
      if (scrollPane.scrollIntoViewIfNeeded) {
        scrollPane.scrollIntoViewIfNeeded(false);
      } else {
        const containerInfo = that.dropdownUl.nativeElement.getBoundingClientRect();
        const elementInfo = scrollPane.getBoundingClientRect();
        if (elementInfo.bottom > containerInfo.bottom || elementInfo.top < containerInfo.top) {
          scrollPane.scrollIntoView(false);
        }
      }
    });
  }

  next() {
    if (this.isOpen && this.source && this.source.length) {
      if (this.activeIndex === this.source.length - 1) {
        this.activeIndex = 0;
        this.scrollToActive();
        return;
      }
      this.activeIndex = this.activeIndex + 1;
      this.scrollToActive();
    }
  }

  prev() {
    if (this.isOpen && this.source && this.source.length) {
      if (this.activeIndex === 0) {
        this.activeIndex = this.source.length - 1;
        this.scrollToActive();
        return;
      }
      this.activeIndex = this.activeIndex - 1;
      this.scrollToActive();
    }
  }

  trackByFn(index, item) {
    return index;
  }

  animationEnd($event) {
    if (!this.isOpen && this.selectMenuElement) {
      const targetElement = this.selectMenuElement.nativeElement;
      targetElement.style.display = 'none';
    }
  }

  loadMoreEvent($event) {
    this.showLoading = true;
    this.onChange({ type: 'loadMore', value: this });
  }

  loadFinish($event) {
    this.showLoading = false;
  }
}
