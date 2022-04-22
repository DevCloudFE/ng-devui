import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { DevConfigService, WithConfig } from 'ng-devui/utils';

@Component({
  selector: 'd-toggle-menu-operation',
  templateUrl: './toggle-menu-operation.component.html',
  styleUrls: [`./toggle-menu-operation.component.scss`],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToggleMenuOperationComponent {
  @Input() controlConfig: {
    clear?: boolean;
    chevron?: boolean;
  };
  @Input() @WithConfig() showAnimation = true;
  @Input() chevronStatus = false;
  @Output() operationChangeEvent = new EventEmitter<any>();

  constructor(private devConfigService: DevConfigService) {}

  operationFn(event, operate) {
    this.operationChangeEvent.emit({ event, operate });
  }
}
