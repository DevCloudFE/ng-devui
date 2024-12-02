import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { isEqual } from 'lodash-es';
import { Subject, Subscription } from 'rxjs';
import { throttleTime } from 'rxjs/operators';

export interface Message {
  severity?: string;
  summary?: string;
  detail?: string;
  content?: string | TemplateRef<any>;
  life?: number;
  id?: any;
}

@Component({
  selector: 'd-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.scss'],
  preserveWhitespaces: false,
})
export class ToastComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('container', { static: true }) containerViewChild: ElementRef;
  @Input() set value(val: Array<Message>) {
    if (val?.length) {
      this._value = this.appendUpperLimit > 0 ? [...val, ...this._value].slice(0, this.appendUpperLimit) : val;
      this.rest = this._value;
      if (this.container) {
        this.handleValueChange();
      }
    } else {
      this._value = [];
      this.rest = [];
      this.onHidden();
    }
  }

  get value(): Array<Message> {
    return this._value;
  }

  @Input() sticky: boolean;
  @Input() life: number;
  @Input() style: object;
  @Input() styleClass: string;
  @Input() appendUpperLimit = 0;
  @Input() lifeMode: 'single' | 'global' = 'global';
  @Output() closeEvent: EventEmitter<any> = new EventEmitter<any>();
  @Output() valueChange: EventEmitter<Message[]> = new EventEmitter<Message[]>();

  _value: Array<Message>;
  rest: Array<Message>; // 单个toast消失后需要保持上下位置不能从_value中移除，从rest中移除并发送valueChange
  zIndex = 1060;
  container: HTMLDivElement;
  timeout: any;
  timeoutArr = [];
  timestamp: number;
  clickSub = new Subject();
  subItem: Subscription;

  get _life() {
    if (this.life) {
      return this.life;
    } else {
      if (this.value && this.value.length > 0) {
        return this.severityDelay(this.value[0]);
      } else {
        return 5000;
      }
    }
  }

  ngOnInit() {
    this.subItem = this.clickSub
      .pipe(throttleTime(250, undefined, { leading: true, trailing: false }))
      .subscribe((obj: any) => this.remove(obj.index, obj.dom));
  }

  ngAfterViewInit() {
    this.container = <HTMLDivElement>this.containerViewChild.nativeElement;
  }

  ngOnDestroy() {
    if (!this.sticky) {
      if (this.lifeMode === 'single') {
        this.timeoutArr.forEach((item) => item && clearTimeout(item));
      } else {
        clearTimeout(this.timeout);
      }
    }
    if (this.subItem) {
      this.subItem.unsubscribe();
    }
  }

  severityDelay(item: Message) {
    switch (item.severity) {
    case 'warn':
    case 'error':
      return 10000;
    default:
      // common | success | info | default
      return 5000;
    }
  }

  show() {
    if (!this.container) {
      this.container = <HTMLDivElement>this.containerViewChild.nativeElement;
    }
    this.handleValueChange();
  }

  // Will overwrite this method in toast service
  close() {}

  // Will overwrite this method in toast service
  onHidden() {}

  handleValueChange() {
    this.zIndex++;
    const doms = this.container.children;
    setTimeout(() => this._value.forEach((v, i) => v && doms[i]?.classList.add('slide-in')));

    if (!this.sticky) {
      if (this.timeout) {
        clearTimeout(this.timeout);
      }
      if (this.timeoutArr.length > 0) {
        this.timeoutArr.forEach((item) => item && clearTimeout(item));
        this.timeoutArr = [];
      }
      this.timestamp = new Date().getTime();
      if (this.lifeMode === 'single') {
        setTimeout(() => {
          this._value.forEach((v, i) => {
            this.timeoutArr[i] = setTimeout(() => this.singleModeRemove(v, doms[i]), v.life || this.severityDelay(v));
          });
        });
      } else {
        this.timeout = setTimeout(() => {
          this.removeAll();
        }, this._life);
      }
    }
  }

  singleModeRemove(msg: Message, msgItem: any) {
    let dom = msgItem;
    // 当点击关闭某个后，重新渲染导致原来赋予的dom失效，需要重新获取
    if (!msgItem) {
      const index = this._value.findIndex((item) => item === msg);
      const doms = this.container.children;
      dom = doms[index];
    }
    if (dom) {
      dom.classList.remove('slide-in');
    }
    setTimeout(() => {
      dom.style.display = 'none';
      this.closeEvent.emit({ message: msg });
      if (this.container.querySelectorAll('.slide-in').length === 0) {
        this.value = [];
        this.valueChange.emit(this.value);
        this.onHidden();
      } else {
        this.rest = this.rest.filter((item) => item !== msg);
        this.valueChange.emit(this.rest);
      }
    }, 300);
  }

  interrupt(index: number, msgItem: any) {
    // 避免正在动画中的toast触发方法
    if (msgItem.className.indexOf('slide-in') === -1) {
      return;
    }
    if (this.lifeMode === 'single') {
      if (this.timeoutArr[index]) {
        clearTimeout(this.timeoutArr[index]);
      }
    } else {
      this.resetDelay(() => {
        const otherToasts = this._value.slice(0);
        otherToasts.splice(index, 1, undefined);
        const doms = this.container.children;
        otherToasts.forEach((v, i) => v && doms[i]?.classList.remove('slide-in'));
      });
    }
  }

  resetDelay(fn: Function) {
    if (!this.sticky && this.timeout) {
      clearTimeout(this.timeout);
      const remainTime = this._life - (new Date().getTime() - this.timestamp);
      this.timeout = setTimeout(() => fn(), remainTime);
    }
  }

  remove(index: number, msgItem: any) {
    if (this.lifeMode === 'single' && this.timeoutArr[index]) {
      clearTimeout(this.timeoutArr[index]);
      this.timeoutArr.splice(index, 1);
    }
    msgItem.classList.remove('slide-in');
    setTimeout(() => {
      this.closeEvent.emit({ message: this.value[index] });
      this._value = this.value.filter((val, i) => i !== index);
      this.valueChange.emit(this._value);
      if (this.container.querySelectorAll('.slide-in').length === 0) {
        this.onHidden();
      }
      if (this.lifeMode === 'global') {
        this.removeReset();
      }
    }, 300);
  }

  removeAll() {
    if (this.value && this.value.length) {
      const doms = this.container.children;
      this._value.forEach((v, i) => v && doms[i]?.classList.remove('slide-in'));
      setTimeout(() => {
        this.value.forEach((msg, index) => this.closeEvent.emit({ message: this.value[index] }));
        this.value = [];
        this.valueChange.emit(this.value);
      }, 300);
    }
  }

  removeThrottle(index: number, msgItem: any) {
    this.clickSub.next({ index: index, dom: msgItem });
  }

  removeIndexThrottle(index: number) {
    const doms = this.container.children;
    if (index < doms.length) {
      this.clickSub.next({ index: index, dom: doms[index] });
    }
  }

  removeMsgThrottle(msg: any) {
    const doms = this.container.children;
    const index = this._value.findIndex((item) => {
      return isEqual(item, msg);
    });
    if (index < doms.length && index > -1) {
      this.clickSub.next({ index: index, dom: doms[index] });
    }
  }

  removeReset(index?: number, msgItem?: any, msg?: any) {
    // 避免点击关闭但正在动画中或自动消失正在动画中的toast触发重置方法
    const removed = this._value.findIndex((item) => item === msg) === -1;
    if (removed || msgItem.className.indexOf('slide-in') === -1) {
      return;
    }
    if (this.lifeMode === 'single') {
      const msgLife = msg.life || this.severityDelay(msg);
      const remainTime = msgLife - (new Date().getTime() - this.timestamp);
      this.timeoutArr[index] = setTimeout(() => this.singleModeRemove(msg, msgItem), remainTime);
    } else {
      this.resetDelay(() => this.removeAll());
    }
  }
}
