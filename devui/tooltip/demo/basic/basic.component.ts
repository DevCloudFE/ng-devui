import { Component, OnInit, HostBinding } from '@angular/core';

@Component({
  selector: 'ave-basic',
  templateUrl: './basic.component.html',
  styleUrls: ['./basic.component.css']
})
export class BasicComponent implements OnInit {
  message = 'I have animation!';
  position: 'left';
  @HostBinding('attr.ave-ui') aveUi = true;

  constructor() { }

  ngOnInit() {
  }

}
