import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'd-demo-template',
  templateUrl: './readtip-template.component.html',
  styleUrls: ['./readtip-template.component.scss'],
})
export class ReadtipTemplateComponent implements OnInit {
  readTipOptions = {
    trigger: 'click',
    showAnimate: false,
    position: 'top-left',
    rules: { selector: 'h4' },
  };

  ngOnInit() {}
}
