import {
  Component,
  Input,
  OnInit,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ModalComponent } from './modal.component';
import {ModalContentDirective} from './modal.directive';
@Component({
  selector: 'd-modal-container',
  templateUrl: './modal-container.component.html',
  styleUrls: ['./modal-container.component.scss'],
  preserveWhitespaces: false,
})
export class ModalContainerComponent implements OnInit {
  @Input() maxHeight: string;
  @Input() data: any;
  @Input() title: string;
  @Input() content: string | HTMLElement;
  @Input() buttons: Array<{
    id?: string,
    cssClass?: string,
    text: string,
    handler: ($event: Event) => void,
    btnwidth?: string,
    autofocus?: boolean,
    disabled: boolean
  }>;
  @Input() html: boolean;
  @Input() onClose: EventListener;
  @ViewChild(ModalContentDirective, { static: true }) modalContentHost: ModalContentDirective;
  @Input() dialogtype = 'standard';
  @Input() showCloseBtn: boolean;
  contentTemplate: TemplateRef<any>;

  constructor(private sanitizer: DomSanitizer, public modalInstance: ModalComponent) {}

  ngOnInit() {
    if (this.html) {
        this.content = <HTMLElement>this.sanitizer.bypassSecurityTrustHtml(<string>this.content);
    }
  }

  close(event) {
    this.onClose(event);
  }

  updateButtonOptions(buttonOptions = []) {
    this.buttons = this.buttons.map((button, index) => {
      return {...button, ...buttonOptions[index]};
    });
  }
}
