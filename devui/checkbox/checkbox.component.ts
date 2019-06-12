import {
  Component,
  Input,
  Output,
  EventEmitter,
  forwardRef,
  TemplateRef,
  ViewEncapsulation,
  ChangeDetectorRef
} from '@angular/core';
import {
  ControlValueAccessor,
  NG_VALUE_ACCESSOR
} from '@angular/forms';

@Component({
  selector: 'ave-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.scss'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => CheckBoxComponent),
    multi: true
  }]
})
export class CheckBoxComponent implements ControlValueAccessor {
  static ID_SEED = 0;
  @Input() name: string;
  @Input() label: string;
  @Input() disabled = false;
  @Input() isShowTitle = true;
  @Input() labelTemplate: TemplateRef<any>;
  @Output() change: EventEmitter<boolean> = new EventEmitter();
  @Input() halfchecked =  false;
  @Input() cssClass;
  id: number;
  checked = false;

  private onChange = (_: any) => null;
  private onTouch = () => null;


  constructor(private changeDetectorRef: ChangeDetectorRef) {
    this.id = CheckBoxComponent.ID_SEED++;
  }

  writeValue(checked: any): void {
    if (checked != null) {
      this.checked = checked ? true : false;
    } else {
      this.checked = false;
    }
    this.changeDetectorRef.markForCheck();
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }

  toggle($event) {
    $event.stopPropagation();
    if (this.disabled) {
      return;
    }
    this.checked = !this.checked;
    this.onChange(this.checked);
    this.change.next(this.checked);
    this.onTouch();
  }
}
