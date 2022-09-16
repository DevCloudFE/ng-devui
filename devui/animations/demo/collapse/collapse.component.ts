import { Component } from '@angular/core';
import { expandCollapseForDomDestroy } from 'ng-devui/utils';

@Component({
  selector: 'd-collapse',
  templateUrl: './collapse.component.html',
  styleUrls: ['./collapse.component.scss'],
  animations: [expandCollapseForDomDestroy],
})
export class CollapseComponent {
  open = false;

  constructor() {}
}
