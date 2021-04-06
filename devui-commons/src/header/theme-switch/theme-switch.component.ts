import { Component, Input, OnInit, TemplateRef } from '@angular/core';

@Component({
  selector: 'd-header-theme-switch',
  templateUrl: './theme-switch.component.html',
  styleUrls: ['./theme-switch.component.scss']
})
export class ThemeSwitchComponent implements OnInit {
  @Input() contentTemplate: TemplateRef<any>;

  constructor() { }

  ngOnInit() {
  }

}
