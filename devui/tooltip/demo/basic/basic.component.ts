import { Component } from '@angular/core';

@Component({
  selector: 'd-basic',
  templateUrl: './basic.component.html',
  styleUrls: ['./basic.component.css'],
})
export class BasicComponent {
  message = 'Upload a file in sh,js,ts,java,css,html,xml.aql,rb,py,php,c,cpp,txt format.';
  position: 'left';

  constructor() {}
}
