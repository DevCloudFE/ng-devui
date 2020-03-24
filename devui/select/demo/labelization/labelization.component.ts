import { Component } from '@angular/core';
@Component({
  selector: 'd-labelization',
  templateUrl: './labelization.component.html',
  styleUrls: ['./labelization.component.css'],
})
export class LabelizationComponent {
  options3 = [{
    name: '这是一个超长的选项1',
    value: 1
  }, {
    name: '选项2',
    value: 2
  }, {
    name: '这是一个超长的选项3',
    value: 3
  }, {
    name: '选项4',
    value: 4
  }, {
    name: '这是一个超长的选项5',
    value: 5
  }, {
    name: '这是一个超长的选项6',
    value: 6
  }, {
    name: '这是一个超长的选项7',
    value: 7
  }, {
    name: '选项8',
    value: 8
  }, {
    name: '选项9',
    value: 9
  }];
  select1 = [{
    name: '这是一个超长的选项1',
    value: 1
  }, {
    name: '选项2',
    value: 2
  }];
  select2 = [{
    name: '这是一个超长的选项1',
    value: 1
  }, {
    name: '这是一个超长的选项3',
    value: 3
  }];
  select3 = [{
    name: '这是一个超长的选项1',
    value: 1
  }, {
    name: '这是一个超长的选项3',
    value: 3
  }, {
    name: '选项4',
    value: 4
  }];
  select4 = [];
  select5 = [];

  changeSelect1() {
    this.select1 = [
    {
      name: '选项2',
      value: 2
    }, {
      name: '选项4',
      value: 4
    }];
  }
}
