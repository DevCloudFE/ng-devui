import {
  Component,
  Input,
  Output,
  EventEmitter,
  ChangeDetectorRef
} from '@angular/core';
import { I18nInterface, I18nService } from 'ng-devui/i18n';
import { Subscription } from 'rxjs';
@Component({
  selector: 'd-modal-header',
  templateUrl: './modal-header.component.html',
  styleUrls: ['./modal-header.component.scss'],
})
export class ModalHeaderComponent {
  @Input() title: string;
  @Output() closeEvent: EventEmitter<any> = new EventEmitter<any>();
  @Input() dialogtype = 'standard';
  @Input() showCloseBtn: boolean;
  i18nText: I18nInterface['modal'];
  i18nSubscription: Subscription;
  constructor(private ref: ChangeDetectorRef, private i18n: I18nService) {
    this.i18nText = this.i18n.getI18nText().modal;
    this.i18nSubscription = this.i18n.langChange().subscribe((data) => {
      this.i18nText = data.modal;
      this.ref.markForCheck();
    });
  }
  close(event) {
    this.closeEvent.emit(event);
  }
}
