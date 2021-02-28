import { Component } from '@angular/core';

@Component({
  selector: 'd-change-key',
  templateUrl: './change-key.component.html',
  styleUrls: ['./change-key.component.css']
})
export class ChangeKeyComponent {
  key = {
    titleKey: 'value',
    activeKey: '$selected',
    disabledKey: 'forbidden',
    openKey: '$show',
    childrenKey: 'subs',
  };
  menu = [{
    value: 'Content 1',
  }, {
    value: 'Content 2 (expended)',
    $show: true,
    subs: [
      { value: 'Child Content 1 (disabled)', forbidden: true },
      { value: 'Child Content 2 (active)', $selected: true },
      { value: 'Child Content 3' },
    ]
  }];
}
