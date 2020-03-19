import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnDestroy, Output, ViewChild } from '@angular/core';
import { ToastService } from './toast.service';


export interface Message {
  severity?: string;
  summary?: string;
  detail?: string;
  id?: any;
}

@Component({
  selector: 'd-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.scss']
})
export class ToastComponent implements AfterViewInit, OnDestroy {

  @Input() sticky = false;

  @Input() life = 3000;

  @Output() closeEvent: EventEmitter<any> = new EventEmitter();

  @Output() valueChange: EventEmitter<Message[]> = new EventEmitter<Message[]>();

  @ViewChild('container', { static: true }) containerViewChild: ElementRef;

  _value: Array<Message>;

  zIndex: number;

  container: HTMLDivElement;

  timeout: any;

  preventRerender: boolean;

  constructor(public el: ElementRef, public toastService: ToastService) {
    this.zIndex = ToastService.zindex;
  }

  ngAfterViewInit() {
    this.container = <HTMLDivElement>this.containerViewChild.nativeElement;
  }

  @Input() get value(): Array<Message> {
    return this._value;
  }

  set value(val: Array<Message>) {
    this._value = val;
    if (this.container) {
      this.handleValueChange();
    }
  }

  handleValueChange() {
    if (this.preventRerender) {
      this.preventRerender = false;
      return;
    }

    this.zIndex = ++ToastService.zindex;
    this.toastService.fadeIn(this.container, 250);

    if (!this.sticky) {
      if (this.timeout) {
        clearTimeout(this.timeout);
      }
      this.timeout = setTimeout(() => {
        this.removeAll();
      }, this.life);
    }
  }

  remove(index: number, msgel: any) {
    this.toastService.fadeOut(msgel, 250);

    setTimeout(() => {
      this.preventRerender = true;
      this.closeEvent.emit({ message: this.value[index] });
      this._value = this.value.filter((val, i) => i !== index);
      this.valueChange.emit(this._value);
    }, 250);
  }

  removeAll() {
    if (this.value && this.value.length) {
      this.toastService.fadeOut(this.container, 250);

      setTimeout(() => {
        this.value.forEach((msg, index) => this.closeEvent.emit({ message: this.value[index] }));
        this.value = [];
        this.valueChange.emit(this.value);
      }, 250);
    }
  }

  ngOnDestroy() {
    if (!this.sticky) {
      clearTimeout(this.timeout);
    }
  }

}
