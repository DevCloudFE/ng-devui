import {
  Component,
  Input,
  TemplateRef,
} from '@angular/core';

@Component({
  selector: 'd-loading',
  template: `<div class="loading-wrapper">
                <ng-container *ngTemplateOutlet="loadingTemplateRef ? loadingTemplateRef : default;">
                </ng-container>
                <ng-template #default>
                    <div class="devui-spinner-wrapper"
                         [ngClass]="{'fix-loading-position': !customPosition}"
                         [style.top]="top"
                         [style.left]="left">
                        <div class="devui-busy-default-sign">
                            <div class="devui-busy-default-spinner">
                                <div class="bar1"></div>
                                <div class="bar2"></div>
                                <div class="bar3"></div>
                                <div class="bar4"></div>
                            </div>
                            <div class="devui-busy-default-text" *ngIf="!!message">{{message}}</div>
                        </div>
                     </div>
                </ng-template>
             </div>`,
  styleUrls: ['./loading.component.scss'],
})
export class LoadingComponent {
  @Input() loadingTemplateRef: TemplateRef<any>;
  @Input() message: string;
  @Input() top: string;
  @Input() left: string;
  @Input() customPosition: boolean;
}
