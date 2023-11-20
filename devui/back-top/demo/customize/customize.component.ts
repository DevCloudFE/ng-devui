import { Component, ViewChild } from '@angular/core';
import { TooltipDirective } from 'ng-devui/tooltip';

@Component({
  selector: 'd-back-top-customize',
  templateUrl: './customize.component.html',
  styleUrls: ['./customize.component.scss'],
})
export class CustomizeComponent {
  @ViewChild('tooltipItem', { read: TooltipDirective }) tooltipItem: TooltipDirective;
  content = 'Back to the top';

  toggleTooltip(toggle) {
    if (this.tooltipItem) {
      if (toggle) {
        this.tooltipItem.content = '';
        this.tooltipItem.hide();
      } else {
        this.tooltipItem.content = this.content;
      }
    }
  }

  backTop(event) {
    console.log(event);
  }
}
