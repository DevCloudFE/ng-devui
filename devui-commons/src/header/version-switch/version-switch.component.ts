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

  ngOnInit(): void {
    this.currentOption = this.versionOptions[0];
  }

  jumpTo($event): void {
    window.open($event.link, $event.target);
  }

}
