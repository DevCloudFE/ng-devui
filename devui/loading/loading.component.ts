import {
  Component,
  Input,
  TemplateRef,
} from '@angular/core';

@Component({
  selector: 'ave-loading',
  template: `<div class="devui-loading-wrapper">
                <ng-container *ngTemplateOutlet="templateRef ? templateRef : default;">
                </ng-container>
                <ng-template #default>
                    <div class="devui-loading-spinner-wrapper">
                        <div class="devui-loading-default-sign">
                            <div class="devui-loading-default-spinner">
                                <div class="bar1"></div>
                                <div class="bar2"></div>
                                <div class="bar3"></div>
                                <div class="bar4"></div>
                                <div class="bar5"></div>
                                <div class="bar6"></div>
                                <div class="bar7"></div>
                                <div class="bar8"></div>
                                <div class="bar9"></div>
                                <div class="bar10"></div>
                                <div class="bar11"></div>
                                <div class="bar12"></div>
                            </div>
                            <div class="devui-loading-default-text" *ngIf="!!message">{{message}}</div>
                        </div>
                     </div>
                </ng-template>
             </div>`,
  styleUrls: ['./loading.component.scss'],
})
export class LoadingComponent {
  @Input() templateRef: TemplateRef<any>;
  @Input() message: string;
}
