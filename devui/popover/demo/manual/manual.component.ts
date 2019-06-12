import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ave-manual',
  templateUrl: './manual.component.html',
  styleUrls: ['./manual.component.css']
})
export class ManualComponent implements OnInit {
  name;
  nameErrMsg = 'Name cannot be less than 4 characters!';
  constructor() { }

  ngOnInit() {
  }

}
