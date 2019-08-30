import {
  Component,
  Input,
  ContentChild,
  HostBinding,
} from '@angular/core';

import { PanelType } from './panel.types';
import { PanelHeaderComponent } from './panel-header.component';
import { PanelFooterComponent } from './panel-footer.component';

@Component({
  selector: 'd-panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.scss']
})
export class PanelComponent {
  @Input() type: PanelType = 'default';
  @Input() heading: string;
  @Input() isCollapsed: boolean;
  @ContentChild(PanelHeaderComponent) panelHeader;
  @ContentChild(PanelFooterComponent) panelFooter;

  toggleBody() {
    if (this.isCollapsed !== undefined) {
      this.isCollapsed = !this.isCollapsed;
    }
  }
}
