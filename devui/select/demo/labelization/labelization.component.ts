import { Component } from '@angular/core';
@Component({
  selector: 'd-labelization',
  templateUrl: './labelization.component.html',
  styleUrls: ['./labelization.component.css'],
})
export class LabelizationComponent {
  options3 = [{
    name: 'This is a long long displayed option 1',
    value: 1
  }, {
    name: 'option 2',
    value: 2
  }, {
    name: 'This is a long long displayed option 3',
    value: 3
  }, {
    name: 'option 4',
    value: 4
  }, {
    name: 'This is a long long displayed option 5',
    value: 5
  }, {
    name: 'This is a long long displayed option 6',
    value: 6
  }, {
    name: 'This is a long long displayed option 7',
    value: 7
  }, {
    name: 'option 8',
    value: 8
  }, {
    name: 'option 9',
    value: 9
  }];
  select1 = [{
    name: 'This is a long long displayed option 1',
    value: 1
  }, {
    name: 'option 2',
    value: 2
  }];
  select2 = [{
    name: 'This is a long long displayed option 1',
    value: 1
  }, {
    name: 'This is a long long displayed option 3',
    value: 3
  }];
  select3 = [{
    name: 'This is a long long displayed option 1',
    value: 1
  }, {
    name: 'This is a long long displayed option 3',
    value: 3
  }, {
    name: 'option 4',
    value: 4
  }];
  select4 = [];
  select5 = [];

  changeSelect1() {
    this.select1 = [
    {
      name: 'option 2',
      value: 2
    }, {
      name: 'option 4',
      value: 4
    }];
  }
}
