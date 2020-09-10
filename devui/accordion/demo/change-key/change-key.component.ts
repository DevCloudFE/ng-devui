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
    value: '内容一',
  }, {
    value: '内容二（展开）',
    $show: true,
    subs: [
      {value: '子内容1（禁用）', forbidden: true},
      {value: '子内容2（选中）', $selected: true},
      {value: '子内容3'},
    ]
  }];
}
