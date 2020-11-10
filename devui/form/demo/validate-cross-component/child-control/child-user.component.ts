import { Component, Input } from '@angular/core';
import { DValidateRules } from 'ng-devui/form';

@Component({
  selector: 'child-user',
  templateUrl: './child-user.component.html'
})
export class ChildUserComponent {

  @Input() control;

  singleSelectRules: DValidateRules = {
    validators: [
      { required: true, message: '请至少选择一个用户' },
      { maxUser: this.maxUsers(3), message: '选择的用户人数请勿超过三个'}
    ]
  };

  verifierOptions = [
    { 'id': '1', 'name': '用户1'},
    { 'id': '2', 'name': '用户2'},
    { 'id': '3', 'name': '用户3'},
    { 'id': '4', 'name': '用户4'},
    { 'id': '5', 'name': '用户5'},
    { 'id': '6', 'name': '用户6'},
  ];

  maxUsers(num) {
    return (val) => {
      return !val || val.length <= num;
    };
  }
}
