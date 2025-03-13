import { Component, Input } from '@angular/core';

@Component({
    selector: 'd-status',
    templateUrl: './status.component.html',
    styleUrls: ['./status.component.scss'],
    preserveWhitespaces: false,
    standalone: false
})

export class StatusComponent {
  private _type: string;
  classMap = {};

  @Input()
  get type() {
    return this._type;
  }

  set type(value: string) {
    this._type = value;
    this.setClassMap();
  }

  setClassMap() {
    this.classMap = 'devui-status-bg-' + this.type;
  }
}
