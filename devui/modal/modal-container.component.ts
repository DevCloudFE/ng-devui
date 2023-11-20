import {
  Component,
  Input,
  OnInit,
  TemplateRef,
  ViewChild
} from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { IButtonStyle } from 'ng-devui/button';
import { ModalComponent } from './modal.component';
import { ModalContentDirective } from './modal.directive';
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
  @Input() showMaximizeBtn: boolean;
  @Input() buttons: Array<{
    id?: string;
    cssClass?: IButtonStyle;
    text: string;
    handler: ($event: Event) => void;
    btnwidth?: string;
    autofocus?: boolean;
    disabled: boolean;
  }>;
  @Input() html: boolean;
  @Input() onClose: ($event?: Event) => void;
  @Input() onMaximize: (maximized: boolean) => void;
  @ViewChild(ModalContentDirective, { static: true }) modalContentHost: ModalContentDirective;
  @Input() dialogtype = 'standard';
  @Input() showCloseBtn: boolean;
  contentTemplate: TemplateRef<any>;
  _oldMaxHeight: string;

  constructor(private sanitizer: DomSanitizer, public modalInstance: ModalComponent) {}

  ngOnInit() {
    if (this.html) {
      this.content = <HTMLElement>this.sanitizer.bypassSecurityTrustHtml(<string>this.content);
    }
  }

  close(event) {
    this.onClose(event);
  }

  maximize(maximized: boolean) {
    if (this.onMaximize) {
      this.onMaximize(maximized);
    }
    if (maximized) {
      this._oldMaxHeight = this.maxHeight;
      this.maxHeight = '100vh';
    } else {
      this.maxHeight = this._oldMaxHeight;
    }
  }

  updateButtonOptions(buttonOptions = []) {
    this.buttons = this.buttons.map((button, index) => {
      return {...button, ...buttonOptions[index]};
    });
  }
}
