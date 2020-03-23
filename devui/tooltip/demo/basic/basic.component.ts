import { Component, OnInit, HostBinding } from '@angular/core';

@Component({
  selector: 'd-basic',
  templateUrl: './basic.component.html',
  styleUrls: ['./basic.component.css']
})
export class BasicComponent implements OnInit {
  message = '请上传sh,js,ts,java,css,html,xml.aql,rb,py,php,c,cpp,txt格式的文件';
  position: 'left';

  constructor() { }

  ngOnInit() {
  }

}
