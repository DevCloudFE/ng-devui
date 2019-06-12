import {
  Component,
  Input,
  TemplateRef,
  ComponentRef,
  OnInit,
  OnChanges,
  ViewChild,
  ChangeDetectorRef,
  SimpleChanges,
  forwardRef,
  HostBinding
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Observable } from 'rxjs';

import { AutoCompletePopupComponent, AutoCompleteDirective } from '../auto-complete';


@Component({
  selector: 'ave-editable-select',
  templateUrl: './editable-select.component.html',
  exportAs: 'editable-select',
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => EditableSelectComponent),
    multi: true
  }]
})
export class EditableSelectComponent implements ControlValueAccessor, OnInit, OnChanges {
  @Input() cssClass: string;
  @Input() disabled = false;
  @Input() placeholder = '';
  @Input() source: any[];
  @Input() isOpen: boolean;
  @Input() term: string;
  @Input() itemTemplate: TemplateRef<any>;
  @Input() noResultItemTemplate: TemplateRef<any>;
  @Input() dropdown: boolean;
  @Input() minLength: number;
  @Input() maxHeight: number;
  @Input() searchFn: (term: string) => Observable<any[]>;
  @ViewChild(AutoCompleteDirective) autoCompleteDirective: AutoCompleteDirective;
  multiItems: any[] = [];
  inputValue: any;
  subscription;

  private popupRef: ComponentRef<AutoCompletePopupComponent>;
  private value: any;
  private placement = 'bottom-left';

  private onChange = (_: any) => null;
  private onTouched = () => null;
  constructor(private changeDetectorRef: ChangeDetectorRef) {
  }

  writeValue(obj: any): void {
    const value = obj || '';
    this.inputValue = value;
    this.changeDetectorRef.markForCheck();
  }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes && changes['searchFn'] && typeof this.searchFn === 'function') {
      if (this.subscription) {
        this.subscription.unsubscribe();
      }
      this.subscription = this.searchFn('').subscribe(source => {
        this.source = source;
      });
    }
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  onTermChange(value) {
    this.inputValue = value;
    this.onChange(this.inputValue);
  }

  toggle($event: Event) {
    // $event.stopPropagation();
    this.autoCompleteDirective.popupRef.instance.isOpen = !this.autoCompleteDirective.popupRef.instance.isOpen;
  }
}
