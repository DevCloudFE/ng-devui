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
      { required: true },
      { maxUser: this.maxUsers(3), message: 'The number of selected users cannot exceed three.'}
    ]
  };

  verifierOptions = [
    { 'id': '1', 'name': 'User1'},
    { 'id': '2', 'name': 'User2'},
    { 'id': '3', 'name': 'User3'},
    { 'id': '4', 'name': 'User4'},
    { 'id': '5', 'name': 'User5'},
    { 'id': '6', 'name': 'User6'},
  ];

  maxUsers(num) {
    return (val) => {
      return !val || val.length <= num;
    };
  }
}
