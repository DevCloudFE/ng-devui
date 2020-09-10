import {
  Component,
  Input,
} from '@angular/core';

@Component({
  selector: 'd-loading-backdrop',
  template: `<div class='devui-loading-backdrop'
                  *ngIf='backdrop'>
             </div>`,
  styleUrls: ['./loading-backdrop.component.scss'],
})
export class LoadingBackdropComponent {
  @Input() backdrop = true;
}
