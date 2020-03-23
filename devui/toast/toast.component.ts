import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnDestroy, Output, ViewChild } from '@angular/core';
import { ToastService } from './toast.service';
import { Subject, Subscription } from 'rxjs';
import { throttleTime } from 'rxjs/operators';

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
  @Input() sticky: boolean;
  @Input() life: any;
  @Input() style: any;
  @Input() styleClass: string;

  @Output() closeEvent: EventEmitter<any> = new EventEmitter();
  @Output() valueChange: EventEmitter<Message[]> = new EventEmitter<Message[]>();
  @ViewChild('container', { static: true }) containerViewChild: ElementRef;

  get _life() {
    if (this.life) {
      return this.life;
    } else {
      if (this.value && this.value.length > 0) {
        switch (this.value[0].severity) {
          case 'success':
            return 5000;
            break;
          case 'info':
            return 5000;
            break;
          case 'warn':
            return 10000;
            break;
          case 'error':
            return 10000;
            break;
          default:
            return 5000;
        }
      } else {
        return 5000;
      }
    }
  }
  _value: Array<Message>;
  zIndex: number;
  container: HTMLDivElement;
  timeout: any;

  timestamp: number;

  clickSub: any;

  subItem: Subscription;

  constructor(public el: ElementRef, public toastService: ToastService) {
    this.zIndex = ToastService.zIndex;
    this.clickSub = new Subject();
    this.subItem = this.clickSub.pipe(throttleTime(250, undefined, { leading: true, trailing: false }))
      .subscribe(obj => this.remove(obj.index, obj.dom));
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
    this.zIndex = ++ToastService.zIndex;
    this.toastService.fadeIn(this.container, 250);

    if (!this.sticky) {
      if (this.timeout) {
        clearTimeout(this.timeout);
      }
      this.timestamp = new Date().getTime();
      this.timeout = setTimeout(() => {
        this.removeAll();
      }, this._life);
    }
  }

  interrupt(index: number) {
    this.resetDelay(() => {
      const otherToasts = this._value.slice(0);
      otherToasts.splice(index, 1, undefined);
      const doms = this.container.children;
      otherToasts.forEach((v, i) => v && this.toastService.fadeOut(doms[i], 250));
    });
  }

  resetDelay(fn: Function) {
    if (!this.sticky && this.timeout) {
      clearTimeout(this.timeout);
      const remainTime = this._life - (new Date().getTime() - this.timestamp);
      this.timeout = setTimeout(() => { fn(); }, remainTime);
    }
  }

  remove(index: number, msgel: any) {
    this.toastService.fadeOut(msgel, 250, () => {
      this.closeEvent.emit({ message: this.value[index] });
      this._value = this.value.filter((val, i) => i !== index);
      this.valueChange.emit(this._value);
      this.removeReset();
    });
  }

  removeAll() {
    if (this.value && this.value.length) {
      this.toastService.fadeOut(this.container, 250, () => {
        this.value.forEach((msg, index) => this.closeEvent.emit({ message: this.value[index] }));
        this.value = [];
        this.valueChange.emit(this.value);
      });
    }
  }

  removeThrottle(index: number, msgel: any) {
    this.clickSub.next({ index: index, dom: msgel });
  }

  removeReset() {
    this.resetDelay(() => { this.removeAll(); });
  }

  ngOnDestroy() {
    if (!this.sticky) {
      clearTimeout(this.timeout);
    }
    if (this.subItem) {
      this.subItem.unsubscribe();
    }
  }
}
