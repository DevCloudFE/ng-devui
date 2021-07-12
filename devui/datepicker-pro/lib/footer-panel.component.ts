import {
  Component, Input, OnDestroy, TemplateRef
} from '@angular/core';
import { I18nInterface, I18nService } from 'ng-devui/i18n';
import { Subscription } from 'rxjs';
import { DatepickerProService } from '../datepicker-pro.service';

@Component({
  selector: 'd-datepicker-footer-panel',
  templateUrl: './footer-panel.component.html',
  styleUrls: ['./footer-panel.component.scss'],
  preserveWhitespaces: false,
})
export class FooterPanelComponent implements OnDestroy {
  @Input() footerTemplate: TemplateRef<any>;

  i18nText: I18nInterface['common'];
  i18nSubscription: Subscription;

  get isRange() {
    return this.pickerSrv.isRange;
  }

  get confirmDisable() {
    if (this.isRange) {
      return (this.pickerSrv.currentActiveInput === 'start' && !this.pickerSrv.curRangeDate[0]) ||
      (this.pickerSrv.currentActiveInput === 'end' && !this.pickerSrv.curRangeDate[1]);
    } else {
      return false;
    }
  }

  constructor(
    private pickerSrv: DatepickerProService,
    protected i18n: I18nService
  ) {
    this.setI18nText();
  }

  setI18nText() {
    this.i18nText = this.i18n.getI18nText().common;
    this.i18nSubscription = this.i18n.langChange().subscribe((data) => {
      this.i18nText = data.common;
    });
  }

  ensureDate() {
    if (this.pickerSrv.isRange) {
      if (this.pickerSrv.currentActiveInput === 'start') {
        this.pickerSrv.currentActiveInput = 'end';
        this.pickerSrv.activeInputChange.next('end');
      } else if (!this.pickerSrv.curRangeDate[0]) {
        this.pickerSrv.currentActiveInput = 'start';
        this.pickerSrv.activeInputChange.next('start');
      } else {
        this.close(true);
      }
    } else {
      this.close(true);
    }
  }

  close(isConfirm = false) {
    this.pickerSrv.closeDropdownEvent.next(isConfirm);
  }

  ngOnDestroy() {
    this.i18nSubscription.unsubscribe();
  }

}
