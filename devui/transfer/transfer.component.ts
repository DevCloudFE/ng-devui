import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnChanges,
  SimpleChanges,
  OnInit,
  ContentChild,
  TemplateRef,
  OnDestroy
} from '@angular/core';
import { Subscription } from 'rxjs';
import { TransferDirection, TransferDataFormat } from './transfer.types';
import { I18nInterface, I18nService } from 'ng-devui/i18n';

@Component({
  selector: 'd-transfer',
  templateUrl: './transfer.component.html',
  styleUrls: ['./transfer.component.scss'],
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

  // 自定义
  @Input() customSourceCheckedLen = 0;
  @Input() customTargetCheckedLen = 0;
  @ContentChild('sourceTemplate', { static: false }) sourceCustomViewTemplate: TemplateRef<any>;
  @ContentChild('targetTemplate', { static: false }) targetCustomViewTemplate: TemplateRef<any>;

  @Output() transferToTarget = new EventEmitter<any>();
  @Output() transferToSource = new EventEmitter<any>();

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

  i18nCommonText: I18nInterface['common'];
  i18nSubscription: Subscription;

  constructor(private i18n: I18nService) {
    this.id = TransferComponent.ID_SEED++;
    this.setI18nText();
  }

  ngOnInit() {
    this.sourceDisplayOption = this.sourceOption;
    this.sourceDisplayOptionLen = this.sourceDisplayOption.length;
    this.targetDisplayOption = this.targetOption;
    this.targetDisplayOptionLen = this.targetDisplayOption.length;
  }

  setI18nText() {
    this.i18nCommonText = this.i18n.getI18nText().common;
    this.i18nSubscription = this.i18n.langChange().subscribe((data) => {
      this.i18nCommonText = data.common;
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes && (changes.customSourceCheckedLen || changes.customTargetCheckedLen)) {
      this.targetCanTransfer = this.targetCanTransfer
        || (changes.customSourceCheckedLen && changes.customSourceCheckedLen.currentValue > 0);
      this.sourceCanTransfer = this.sourceCanTransfer
        || (changes.customTargetCheckedLen && changes.customTargetCheckedLen.currentValue > 0);
    }
  }

  checkboxChange(direction: any, event: any) {
    if (direction === TransferDirection.SOURCE) {
      this.sourceDisplayOption.filter(item => item.checked).length > 0 ? this.targetCanTransfer = true : this.targetCanTransfer = false;
      this.listTotalCheck(direction);
    } else if (direction === TransferDirection.TARGET) {
      this.targetDisplayOption.filter(item => item.checked).length > 0 ? this.sourceCanTransfer = true : this.sourceCanTransfer = false;
      this.listTotalCheck(direction);
    }
  }

  listTotalCheck(direction: any) {
    if (direction === TransferDirection.SOURCE) {
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
    } else if (direction === TransferDirection.TARGET) {
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

  transferTo(direction: any) {
    if (direction === TransferDirection.TARGET) {
      // 对源数据更改
      this.sourceDisplayOption.filter(item => item.checked === true).forEach(item => {
        const tmp = { name: item.name, value: item.value, id: item.id, checked: false };
        this.targetOption.push(tmp);
      });
      this.sourceOption = this.sourceOption.filter(item => item.checked !== true);
      this.targetCanTransfer = false;

      if (this.sourceCustomViewTemplate) {
        this.transferToTarget.next();
      } else {
        this.transferToSource.next({ sourceOption: this.sourceOption, targetOption: this.targetOption });
      }
      if (this.isSearch && this.sourceSearchText !== '') {
        this.sourceSearchText = '';
      }
    } else if (direction === TransferDirection.SOURCE) {
      this.targetDisplayOption.filter(item => item.checked === true).forEach(item => {
        const tmp = { name: item.name, value: item.value, id: item.id, checked: false };
        this.sourceOption.push(tmp);
      });
      this.targetOption = this.targetOption.filter(item => item.checked !== true);
      this.sourceCanTransfer = false;
      if (this.targetCustomViewTemplate) {
        this.transferToSource.next();
      } else {
        this.transferToSource.next({ sourceOption: this.sourceOption, targetOption: this.targetOption });
      }

      if (this.isSearch && this.targetSearchText !== '') {
        this.targetSearchText = '';
      }
    }
    this.targetDisplayOption = this.targetOption;
    this.sourceDisplayOption = this.sourceOption;
    this.listTotalCheck(TransferDirection.TARGET);
    this.listTotalCheck(TransferDirection.SOURCE);
  }

  checkAll(direction: any, event: any) {
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

  search(direction: any, keyword: any) {
    if (keyword !== '') {
      if (direction === TransferDirection.SOURCE) {
        this.sourceDisplayOption = this.sourceOption.filter(item => item.name.match(keyword) !== null);
      } else if (direction === TransferDirection.TARGET) {
        this.targetDisplayOption = this.targetOption.filter(item => item.name.match(keyword) !== null);
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

  onDrop(direction: any, e: any) {
    let index = e.dropIndex;
    const fromIndex = e.dragFromIndex;
    if (-1 !== index) {
      if (-1 !== fromIndex && index > fromIndex) {
        index--;
      }
      if (direction === TransferDirection.SOURCE) {
        this.sourceOption.splice(index, 0, fromIndex === -1 ? e.dragData : this.sourceOption.splice(fromIndex, 1)[0]);
        this.transferToSource.next({ sourceOption: this.sourceOption, targetOption: this.targetOption });
      } else {
        this.targetOption.splice(index, 0, fromIndex === -1 ? e.dragData : this.targetOption.splice(fromIndex, 1)[0]);
        this.transferToTarget.next({ sourceOption: this.sourceOption, targetOption: this.targetOption });
      }
    } else {
      if (direction === TransferDirection.SOURCE) {
        this.sourceOption.push(e.dragData);
        this.transferToSource.next({ sourceOption: this.sourceOption, targetOption: this.targetOption });
      } else {
        this.targetOption.push(e.dragData);
        this.transferToTarget.next({ sourceOption: this.sourceOption, targetOption: this.targetOption });
      }
    }
  }

  ngOnDestroy() {
    if (this.i18nSubscription) {
      this.i18nSubscription.unsubscribe();
    }
  }
}
