import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'd-manual',
  templateUrl: './manual.component.html'
})
export class ManualComponent implements OnInit {
  name;
  nameErrMsg = '输入长度不能小于4个字符!';
  constructor() { }

  ngOnInit() {
  }

}
