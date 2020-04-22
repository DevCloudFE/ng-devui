import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnDestroy, Output, ViewChild } from '@angular/core';
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
  @Input() life: number;
  @Input() style: string;
  @Input() styleClass: string;

  @Output() closeEvent: EventEmitter<any> = new EventEmitter<any>();
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
          case 'info':
            return 5000;
          case 'warn':
            return 10000;
          case 'error':
            return 10000;
          default:
            return 5000;
        }
      } else {
        return 5000;
      }
    }
  }
  _value: Array<Message>;
  zIndex = 1060;
  container: HTMLDivElement;
  timeout: any;

  timestamp: number;

  clickSub: any;

  subItem: Subscription;

  constructor(public el: ElementRef) {
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
    this.zIndex++;
    setTimeout(() => {
      const doms = this.container.children;
      this._value.forEach((v, i) => v && doms[i].classList.add('slide-in'));
    });

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
      otherToasts.forEach((v, i) => v && doms[i].classList.remove('slide-in'));
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
    msgel.classList.remove('slide-in');
    setTimeout(() => {
      this.closeEvent.emit({ message: this.value[index] });
      this._value = this.value.filter((val, i) => i !== index);
      this.valueChange.emit(this._value);
      this.removeReset();
    }, 300);
  }

  removeAll() {
    if (this.value && this.value.length) {
      const doms = this.container.children;
      this._value.forEach((v, i) => v && doms[i].classList.remove('slide-in'));
      setTimeout(() => {
        this.value.forEach((msg, index) => this.closeEvent.emit({ message: this.value[index] }));
        this.value = [];
        this.valueChange.emit(this.value);
      }, 300);
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
