import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
  TemplateRef
} from '@angular/core';
@Component({
  selector: 'd-loading',
  template: `<div class="devui-loading-wrapper" [ngClass]="{ 'devui-loading-full': targetName === 'BODY' }">
                <ng-container *ngTemplateOutlet="loadingTemplateRef ? loadingTemplateRef : default;">
                </ng-container>
                <ng-template #default>
                    <div class="devui-spinner-wrapper"
                         [ngClass]="{'devui-fix-loading-position': !customPosition,'devui-message-wrapper':!!message}"
                         [ngStyle]="{ 'z-index': zIndex,'top': top ,'left': left }">
                        <div class="devui-busy-default-sign">
                            <div class="devui-busy-default-spinner">
                                <div class="devui-loading-bar1"></div>
                                <div class="devui-loading-bar2"></div>
                                <div class="devui-loading-bar3"></div>
                                <div class="devui-loading-bar4"></div>
                            </div>
                            <div class="devui-busy-default-text" *ngIf="!!message">{{message}}</div>
                        </div>
                     </div>
                </ng-template>
             </div>`,
  styleUrls: ['./loading.component.scss'],
  preserveWhitespaces: false,
})
export class LoadingComponent  implements OnInit, OnChanges {
  @Input() loadingTemplateRef: TemplateRef<any>;
  @Input() message: string;
  @Input() top: string;
  @Input() left: string;
  @Input() customPosition: boolean;
  @Input() target: Element;
  @Input() zIndex: number;
  targetName: string;
  ngOnInit() {
    if (this.target) {
      this.targetName = this.target.nodeName;
    }
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['target']) {
      if (this.target) {
        this.targetName = this.target.nodeName;
      }
    }
  }
  // Will overwrite this method in modal service
  close() {}
}
