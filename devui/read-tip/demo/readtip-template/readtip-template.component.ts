import { Component, OnInit } from '@angular/core';
import { ReadTipOptions } from 'ng-devui/read-tip';

@Component({
  selector: 'd-demo-template',
  templateUrl: './readtip-template.component.html',
  styleUrls: ['./readtip-template.component.scss'],
})
export class ReadtipTemplateComponent implements OnInit {
  readTipOptions: ReadTipOptions = {
    trigger: 'click',
    showAnimate: false,
    position: 'top-left',
    rules: { selector: '.readtip-target' },
  };

  ngOnInit() {}
}
