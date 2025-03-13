import { Component, OnInit } from '@angular/core';
import { DFormControlStatus, FormLayout } from 'ng-devui/form';

@Component({
    selector: 'd-form-custom-status',
    templateUrl: './custom-status.component.html',
    standalone: false
})
export class CustomStatusComponent implements OnInit {
  layoutDirection: FormLayout = FormLayout.Horizontal;
  singleSelectData = null;

  inputStatus: DFormControlStatus = 'pending';

  verifierOptions = [
    { 'id': '1', 'name': 'Administrator1'},
    { 'id': '2', 'name': 'Administrator2'},
    { 'id': '3', 'name': 'Administrator3'},
    { 'id': '4', 'name': 'Administrator4'},
    { 'id': '5', 'name': 'Administrator5'},
    { 'id': '6', 'name': 'Administrator6'},
  ];

  constructor() { }

  ngOnInit(): void {
    setInterval(() => {
      this.inputStatus = 'pending';

      setTimeout(() => {
        this.inputStatus = 'success';
      }, 2000);
    }, 3000);
  }

}
