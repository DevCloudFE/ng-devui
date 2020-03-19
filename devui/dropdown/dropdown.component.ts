import {Component, Host, OnInit, Input, OnChanges, SimpleChanges, ViewEncapsulation, ElementRef} from '@angular/core';
import {ConnectedPosition, CdkOverlayOrigin, ConnectedOverlayPositionChange, VerticalConnectionPos} from '@angular/cdk/overlay';
import {AppendToBodyDirection, AppendToBodyDirectionsConfig } from 'ng-devui/utils';
import {fadeInOut} from 'ng-devui/utils';
import {DropDownDirective} from './dropdown.directive';

@Component({
  // tslint:disable-next-line: component-selector
  selector: '[dDropDown][appendToBody]',
  template: `
    <ng-content></ng-content>
    <ng-template cdk-connected-overlay
      [cdkConnectedOverlayOrigin]="origin || dropDown.cdkConnectedOverlayOrigin"
      [cdkConnectedOverlayOpen]="dropDown.isOpen"
      [cdkConnectedOverlayPositions]="positions"
      (backdropClick)="dropDown.isOpen=false"
      (positionChange)="onPositionChange($event)">
      <div [@fadeInOut]="(dropDown.isOpen ? menuPosition : 'void')">
        <ng-content select="[dDropDownMenu]"></ng-content>
      </div>
    </ng-template>
  `,
  styleUrls: ['dropdown.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: [
    fadeInOut
  ]
})
export class DropDownAppendToBodyComponent implements OnInit, OnChanges {
  menuPosition: VerticalConnectionPos = 'bottom';
  positions;
  origin;
  @Input() alignOrigin: ElementRef<any>;
  @Input() appendToBodyDirections: Array<AppendToBodyDirection | ConnectedPosition> = [
    'rightDown', 'leftDown', 'rightUp', 'leftUp'
  ];
  constructor(@Host() public dropDown: DropDownDirective) {
    this.dropDown.appendToBody = true;
  }

  ngOnInit() {
    this.setPositions();
    this.setOrigin();
  }
  ngOnChanges(changes: SimpleChanges) {
    if (changes['appendToBodyDirections']) {
      this.setPositions();
    }
    if (changes['alignOrigin']) {
      this.setOrigin();
    }
  }
  setOrigin() {
    if (this.alignOrigin) {
      this.origin = new CdkOverlayOrigin(this.alignOrigin);
    } else {
      this.origin = undefined;
    }
  }
  setPositions() {
    if (this.appendToBodyDirections && this.appendToBodyDirections.length > 0) {
      this.positions = this.appendToBodyDirections.map(position => {
        if (typeof position ===  'string') {
          return AppendToBodyDirectionsConfig[position];
        } else {
          return position;
        }
      }).filter(position => position !== undefined);
    } else {
      this.positions = undefined;
    }
  }

  onPositionChange(position: ConnectedOverlayPositionChange) {
    switch (position.connectionPair.overlayY) {
      case 'top':
      case 'center':
        this.menuPosition = 'bottom';
      break;
      case 'bottom':
        this.menuPosition = 'top';
    }
  }
}
