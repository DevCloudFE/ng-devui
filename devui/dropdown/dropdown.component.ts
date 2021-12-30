import {
  CdkConnectedOverlay, CdkOverlayOrigin, ConnectedOverlayPositionChange, ConnectedPosition, VerticalConnectionPos
} from '@angular/cdk/overlay';
import { Component, ElementRef, Host, Input, OnChanges, OnInit, SimpleChanges, ViewChild, ViewEncapsulation } from '@angular/core';
import { AppendToBodyDirection, AppendToBodyDirectionsConfig, fadeInOut } from 'ng-devui/utils';
import { DropDownDirective } from './dropdown.directive';

@Component({
  /* eslint-disable-next-line @angular-eslint/component-selector*/
  selector: '[dDropDown][appendToBody]',
  template: `
    <ng-content></ng-content>
    <ng-template cdk-connected-overlay
      [cdkConnectedOverlayOrigin]="origin || dropDown.cdkConnectedOverlayOrigin"
      [cdkConnectedOverlayOpen]="dropDown.isOpen"
      [cdkConnectedOverlayPositions]="positions"
      (backdropClick)="dropDown.isOpen=false"
      (positionChange)="onPositionChange($event)">
      <div [@fadeInOut]="dropDown.startAnimation ? menuPosition : 'void'" #dropDownWrapper
        [@.disabled]="!dropDown.showAnimation">
        <ng-content select="[dDropDownMenu]"></ng-content>
      </div>
    </ng-template>
  `,
  styleUrls: ['dropdown.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: [
    fadeInOut
  ],
  preserveWhitespaces: false,
})
export class DropDownAppendToBodyComponent implements OnInit, OnChanges {
  menuPosition: VerticalConnectionPos = 'bottom';
  positions;
  origin;
  @ViewChild('dropDownWrapper') dropDownWrapper: ElementRef;
  @ViewChild(CdkConnectedOverlay, { static: true }) overlay: CdkConnectedOverlay;
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
        if (typeof position === 'string') {
          return AppendToBodyDirectionsConfig[position];
        } else {
          return position;
        }
      }).filter(position => position !== undefined);
    } else {
      this.positions = undefined;
    }
  }

  reposition(): void {
    if (this.overlay && this.overlay.overlayRef) {
      setTimeout(() => {
        this.setPositions();
        this.overlay.overlayRef.updatePosition();
      }, 0);
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
