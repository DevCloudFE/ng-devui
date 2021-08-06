import { Component, OnInit } from '@angular/core';
import { ReadTipOptions } from 'ng-devui/read-tip';
import { of } from 'rxjs';

@Component({
  selector: 'd-demo-async',
  templateUrl: './readtip-async.component.html',
  styleUrls: ['./readtip-async.component.scss'],
})
export class ReadtipAsyncComponent implements OnInit {
  readTipOptions: ReadTipOptions = {
    trigger: 'click',
    position: 'top-left',
    rules: { selector: 'h4', trigger: 'click', dataFn: this.getDataFromDB, key: 'GetData' },
  };

  ngOnInit() {}

  getDataFromDB({ element, rule }) {
    return of({ content: element.innerHTML, title: rule.key });
  }
}
