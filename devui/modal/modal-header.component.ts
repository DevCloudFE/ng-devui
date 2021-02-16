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
  @Output() closeEvent: EventEmitter<any> = new EventEmitter<any>();
  @Input() dialogtype = 'standard';
  @Input() showCloseBtn: boolean;

  i18nText: I18nInterface['modal'];
  i18nSubscription: Subscription;

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
}
