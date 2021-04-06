import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'd-header-version-switch',
  templateUrl: './version-switch.component.html',
  styleUrls: ['./version-switch.component.scss']
})
export class VersionSwitchComponent implements OnInit {
  @Input() versionOptions = [];

  currentOption;

  constructor() { }

  ngOnInit() {
    this.currentOption = this.versionOptions[0];
  }

  jumpTo($event) {
    window.open($event.link, $event.target);
  }

}
