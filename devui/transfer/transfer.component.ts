import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import {
  Component,
  ContentChild,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges,
  TemplateRef,
  ViewChild
} from '@angular/core';
import { I18nInterface, I18nService } from 'ng-devui/i18n';
import { Observable, Subscription } from 'rxjs';
import { TransferDataFormat, TransferDirection } from './transfer.types';

@Component({
  selector: 'd-transfer',
  templateUrl: './transfer.component.html',
  styleUrls: ['./transfer.component.scss'],
  preserveWhitespaces: false,
})
export class TransferComponent implements OnInit, OnChanges, OnDestroy {
  static ID_SEED = 0;
  id: number;

  @Input() sourceOption: Array<TransferDataFormat> = [];
  @Input() targetOption: Array<TransferDataFormat> = [];
  @Input() titles = { source: 'source', target: 'target' };
  @Input() height = '320px';
  @Input() isSearch = false;
  @Input() disabled = false;
  @Input() isSourceDroppable = false;
  @Input() isTargetDroppable = false;
  @Input() showOptionTitle = false;
  @Input() beforeTransfer: (sourceOption, targetOption) => boolean | Promise<boolean> | Observable<boolean>;
  @Input() virtualScroll = false;

  // 自定义
  @Input() customSourceCheckedLen = 0;
  @Input() customTargetCheckedLen = 0;
  @Input() noResultTemplate: TemplateRef<any>;

  @Output() transferToTarget = new EventEmitter<any>();
  @Output() transferToSource = new EventEmitter<any>();
  @Output() searching = new EventEmitter<any>();
  @Output() transferring = new EventEmitter<any>();
  @Output() afterTransfer = new EventEmitter<any>();

  @ContentChild('sourceTemplate') sourceCustomViewTemplate: TemplateRef<any>;
  @ContentChild('targetTemplate') targetCustomViewTemplate: TemplateRef<any>;
  @ViewChild(CdkVirtualScrollViewport) virtualScrollViewport: CdkVirtualScrollViewport;

  transferDirection: any = TransferDirection;

  sourceDisplayOption = [];
  sourceDisplayOptionLen = 0;
  sourceCheckedLen = 0;
  sourceHalfChecked = false;
  sourceAllChecked = false;
  sourceCanTransfer = false;

  targetDisplayOption = [];
  targetDisplayOptionLen = 0;
  targetCheckedLen = 0;
  targetHalfChecked = false;
  targetAllChecked = false;
  targetCanTransfer = false;

  sourceSearchText = '';
  targetSearchText = '';

  itemSize = 36;
  minBuffer = parseInt(this.height, 10) * 2;
  maxBuffer = parseInt(this.height, 10) * 3;

  i18nCommonText: I18nInterface['common'];
  i18nSubscription: Subscription;

  constructor(private i18n: I18nService) {
    this.id = TransferComponent.ID_SEED++;
  }

  ngOnInit() {
    this.setI18nText();
    this.sourceDisplayOption = this.sourceOption;
    this.sourceDisplayOptionLen = this.sourceDisplayOption.length;
    this.targetDisplayOption = this.targetOption;
    this.targetDisplayOptionLen = this.targetDisplayOption.length;
  }

  canChange() {
    let changeResult = Promise.resolve(true);

    if (this.beforeTransfer) {
      const result: any = this.beforeTransfer(this.sourceOption, this.targetOption);
      if (typeof result !== 'undefined') {
        if (result.then) {
          changeResult = result;
        } else if (result.subscribe) {
          changeResult = (result as Observable<boolean>).toPromise();
        } else {
          changeResult = Promise.resolve(result);
        }
      }
    }

    return changeResult;
  }

  setI18nText() {
    this.i18nCommonText = this.i18n.getI18nText().common;
    this.i18nSubscription = this.i18n.langChange().subscribe((data) => {
      this.i18nCommonText = data.common;
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes && changes.customSourceCheckedLen) {
      this.targetCanTransfer = !!(this.customSourceCheckedLen > 0);
    }
    if (changes && changes.customTargetCheckedLen) {
      this.sourceCanTransfer = !!(this.customTargetCheckedLen > 0);
    }

    if (changes && (changes.sourceOption || changes.targetOption)) {
      this.sourceDisplayOption = this.sourceOption;
      this.sourceDisplayOptionLen = this.sourceDisplayOption ? this.sourceDisplayOption.length : 0;
      this.targetDisplayOption = this.targetOption;
      this.targetDisplayOptionLen = this.targetDisplayOption ? this.targetDisplayOption.length : 0;
    }
  }

  checkboxChange(direction: TransferDirection, event: any) {
    if (direction === TransferDirection.SOURCE) {
      this.sourceDisplayOption.filter(item => item.checked).length > 0 ? this.targetCanTransfer = true : this.targetCanTransfer = false;
      this.listTotalCheck(direction);
    } else if (direction === TransferDirection.TARGET) {
      this.targetDisplayOption.filter(item => item.checked).length > 0 ? this.sourceCanTransfer = true : this.sourceCanTransfer = false;
      this.listTotalCheck(direction);
    }
  }

  listTotalCheck(direction?: TransferDirection) {
    if (direction === TransferDirection.SOURCE || !direction) {
      const sourceLen = this.sourceDisplayOption.filter(item => item.checked).length;
      this.sourceCheckedLen = sourceLen;
      if (sourceLen === 0) {
        this.sourceAllChecked = false;
        this.sourceHalfChecked = false;
      } else {
        if (sourceLen !== this.sourceDisplayOption.length) {
          this.sourceAllChecked = false;
          this.sourceHalfChecked = true;
        } else {
          this.sourceAllChecked = true;
          this.sourceHalfChecked = false;
        }
      }
    }
    if (direction === TransferDirection.TARGET || !direction) {
      const rightLen = this.targetDisplayOption.filter(item => item.checked).length;
      this.targetCheckedLen = rightLen;
      if (rightLen === 0) {
        this.targetAllChecked = false;
        this.targetHalfChecked = false;
      } else {
        if (rightLen !== this.targetDisplayOption.length) {
          this.targetAllChecked = false;
          this.targetHalfChecked = true;
        } else {
          this.targetAllChecked = true;
          this.targetHalfChecked = false;
        }
      }
    }
    this.sourceDisplayOptionLen = this.sourceDisplayOption.length;
    this.targetDisplayOptionLen = this.targetDisplayOption.length;
  }

  transferTo(direction: TransferDirection) {
    this.canChange().then(val => {
      if (!val) {
        return;
      }

      if (this.transferring.observers.length) {
        this.transferring.emit(direction);
        setTimeout(() => {
          this.transferHandle(direction);
        });
      } else {
        const changeData = [];
        if (direction === TransferDirection.TARGET) {
          // 对源数据更改
          this.sourceDisplayOption.filter(item => item.checked === true).forEach(item => {
            const tmp = { name: item.name, value: item.value, id: item.id, checked: false };
            this.targetOption.push(tmp);
            changeData.push(tmp);
            this.sourceOption.splice(this.sourceOption.indexOf(item), 1);
          });
        } else if (direction === TransferDirection.SOURCE) {
          this.targetDisplayOption.filter(item => item.checked === true).forEach(item => {
            const tmp = { name: item.name, value: item.value, id: item.id, checked: false };
            this.sourceOption.push(tmp);
            changeData.push(tmp);
            this.targetOption.splice(this.targetOption.indexOf(item), 1);
          });
          this.targetOption = this.targetOption.filter(item => item.checked !== true);
        }

        this.transferHandle(direction, changeData);
      }
    });
  }

  transferHandle(direction: TransferDirection, changeData?: object) {
    if (direction === TransferDirection.TARGET) {
      this.targetCanTransfer = false;

      if (this.sourceCustomViewTemplate) {
        this.transferToTarget.next({});
      } else {
        changeData === undefined
          ? this.transferToTarget.next({ sourceOption: this.sourceOption, targetOption: this.targetOption })
          : this.transferToTarget.next({ sourceOption: this.sourceOption, targetOption: this.targetOption, changeData });
      }
      if (this.isSearch && this.sourceSearchText !== '') {
        this.sourceSearchText = '';
      }
    } else if (direction === TransferDirection.SOURCE) {
      this.sourceCanTransfer = false;

      if (this.targetCustomViewTemplate) {
        this.transferToSource.next({});
      } else {
        changeData === undefined
          ? this.transferToSource.next({ sourceOption: this.sourceOption, targetOption: this.targetOption })
          : this.transferToSource.next({ sourceOption: this.sourceOption, targetOption: this.targetOption, changeData });
      }
      if (this.isSearch && this.targetSearchText !== '') {
        this.targetSearchText = '';
      }
    }

    this.targetDisplayOption = [...this.targetOption];
    this.sourceDisplayOption = [...this.sourceOption];
    this.listTotalCheck(TransferDirection.TARGET);
    this.listTotalCheck(TransferDirection.SOURCE);
    this.afterTransfer.emit(direction);
  }

  checkAll(direction: TransferDirection, event: any) {
    if (direction === TransferDirection.SOURCE) {
      if (event) {
        this.sourceHalfChecked = false;
        this.sourceCheckedLen = this.sourceDisplayOption.filter(item => item.disabled !== true).length;
      } else {
        this.sourceCheckedLen = 0;
      }
      this.targetCanTransfer = event;
      this.sourceDisplayOption.forEach(item => {
        if (item.checked !== event && item.disabled !== true) {
          item.checked = event;
        }
      });
    } else if (direction === TransferDirection.TARGET) {
      if (event) {
        this.targetHalfChecked = false;
        this.targetCheckedLen = this.targetDisplayOption.filter(item => item.disabled !== true).length;
      } else {
        this.targetCheckedLen = 0;
      }
      this.sourceCanTransfer = event;
      this.targetDisplayOption.forEach(item => {
        if (item.checked !== event && item.disabled !== true) {
          item.checked = event;
        }
      });
    }
  }

  search(direction: TransferDirection, keyword: any) {
    if (this.searching.observers.length) {
      this.searching.emit({direction, keyword});
    } else {
      if (keyword !== '') {
        if (direction === TransferDirection.SOURCE) {
          this.sourceDisplayOption = this.sourceOption.filter(item => item.name.includes(keyword));
        } else if (direction === TransferDirection.TARGET) {
          this.targetDisplayOption = this.targetOption.filter(item => item.name.includes(keyword));
        }
      } else {
        if (direction === TransferDirection.SOURCE) {
          this.sourceDisplayOption = this.sourceOption;
        } else if (direction === TransferDirection.TARGET) {
          this.targetDisplayOption = this.targetOption;
        }
      }
      this.listTotalCheck(direction);
    }
  }

  onDrop(direction: TransferDirection, e: any) {
    let index = e.dropIndex;
    const fromIndex = e.dragFromIndex;
    if (-1 !== index) {
      if (-1 !== fromIndex && index > fromIndex) {
        index--;
      }
      if (direction === TransferDirection.SOURCE) {
        this.sourceOption.splice(index, 0, fromIndex === -1 ? e.dragData : this.sourceOption.splice(fromIndex, 1)[0]);
        this.sourceDisplayOption = [...this.sourceOption];
        this.transferToSource.next({ sourceOption: this.sourceOption, targetOption: this.targetOption });
      } else {
        this.targetOption.splice(index, 0, fromIndex === -1 ? e.dragData : this.targetOption.splice(fromIndex, 1)[0]);
        this.targetDisplayOption = [...this.targetOption];
        this.transferToTarget.next({ sourceOption: this.sourceOption, targetOption: this.targetOption });
      }
    } else {
      if (direction === TransferDirection.SOURCE) {
        this.sourceOption.push(e.dragData);
        this.sourceDisplayOption = [...this.sourceOption];
        this.transferToSource.next({ sourceOption: this.sourceOption, targetOption: this.targetOption });
      } else {
        this.targetOption.push(e.dragData);
        this.targetDisplayOption = [...this.targetOption];
        this.transferToTarget.next({ sourceOption: this.sourceOption, targetOption: this.targetOption });
      }
    }
  }

  trackByFn(index, item) {
    return index;
  }

  ngOnDestroy() {
    if (this.i18nSubscription) {
      this.i18nSubscription.unsubscribe();
    }
  }
}
