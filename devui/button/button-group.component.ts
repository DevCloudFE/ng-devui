import { ChangeDetectionStrategy, Component, Input} from '@angular/core';

export type IButtonGroupSize = 'lg' | 'md' | 'sm' | 'xs';

@Component({
    selector: 'd-button-group',
    templateUrl: './button-group.component.html',
    styleUrls: ['./button-group.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    preserveWhitespaces: false,
    standalone: false
})
export class ButtonGroupComponent {
  @Input() size: IButtonGroupSize = 'md';
  constructor() {
  }

}
