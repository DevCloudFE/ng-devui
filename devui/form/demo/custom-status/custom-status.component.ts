import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'd-form-custom-status',
  templateUrl: './custom-status.component.html',
})
export class CustomStatusComponent implements OnInit {
  singleSelectData = null;

  verifierOptions = [
    { 'id': '1', 'name': '管理员1'},
    { 'id': '2', 'name': '管理员2'},
    { 'id': '3', 'name': '管理员3'},
    { 'id': '4', 'name': '管理员4'},
    { 'id': '5', 'name': '管理员5'},
    { 'id': '6', 'name': '管理员6'},
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
