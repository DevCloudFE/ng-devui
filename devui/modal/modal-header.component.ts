import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output
} from '@angular/core';
import { I18nInterface, I18nService } from 'ng-devui/i18n';
import { Subscription } from 'rxjs';
@Component({
  selector: 'd-modal-header',
  templateUrl: './modal-header.component.html',
  styleUrls: ['./modal-header.component.scss'],
  preserveWhitespaces: false,
})
export class ModalHeaderComponent implements OnInit, OnDestroy {
  @Input() title: string;
  @Input() dialogtype = 'standard';
  @Input() showCloseBtn: boolean;
  @Output() closeEvent: EventEmitter<any> = new EventEmitter<any>();

  @Input() showMaximizeBtn = false;
  @Output() maximizeEvent = new EventEmitter<boolean>();
  maximized = false;

  i18nText: I18nInterface['modal'];
  i18nSubscription: Subscription;

  get checkDialogType() {
    return this.dialogtype?.toLowerCase() || 'standard';
  }

  constructor(private ref: ChangeDetectorRef, private i18n: I18nService) {}

  ngOnInit() {
    this.i18nText = this.i18n.getI18nText().modal;
    this.i18nSubscription = this.i18n.langChange().subscribe((data) => {
      this.i18nText = data.modal;
      this.ref.markForCheck();
    });
  }

  close(event) {
    this.closeEvent.emit(event);
  }

  ngOnDestroy() {
    if (this.i18nSubscription) {
      this.i18nSubscription.unsubscribe();
    }
  }

  maximize() {
    this.maximized = !this.maximized;
    this.maximizeEvent.emit(this.maximized);
  }
}
