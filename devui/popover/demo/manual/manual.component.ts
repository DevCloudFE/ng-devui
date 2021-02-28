import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'd-manual',
  templateUrl: './manual.component.html'
})
export class ManualComponent implements OnInit {
  name;
  nameErrMsg = 'The value must contain at least four characters!';
  constructor() { }

  ngOnInit() {
  }

}
