import {
  CdkConnectedOverlay, CdkOverlayOrigin, ConnectedOverlayPositionChange, ConnectedPosition, VerticalConnectionPos
} from '@angular/cdk/overlay';
import {Component, ElementRef, Host, Input, OnChanges, OnInit, SimpleChanges, ViewChild, ViewEncapsulation} from '@angular/core';
import {AppendToBodyDirection, AppendToBodyDirectionsConfig } from 'ng-devui/utils';
import {fadeInOut} from 'ng-devui/utils';
import {DropDownDirective} from './dropdown.directive';

@Component({
  selector: '[dDropDown][appendToBody]',
  template: `
    <ng-content></ng-content>
    <ng-template cdk-connected-overlay
      [cdkConnectedOverlayOrigin]="origin || dropDown.cdkConnectedOverlayOrigin"
      [cdkConnectedOverlayOpen]="dropDown.isOpen"
      [cdkConnectedOverlayPositions]="positions"
      (backdropClick)="dropDown.isOpen=false"
      (positionChange)="onPositionChange($event)">
      <div [@fadeInOut]="(dropDown.isOpen ? menuPosition : 'void')" #dropDownWrapper>
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
    this.changeFormWithDropDown(position.connectionPair.overlayY);
  }

  changeFormWithDropDown(position) {
    const ele = this.formWithDropDown();
    const wrapperEle = this.dropDownWrapper && this.dropDownWrapper.nativeElement;
    let formBorder;
    if (ele && !ele.classList.contains('devui-dropdown-origin-open')) {
      ele.classList.add('devui-dropdown-origin-open');
    }
    if (position === 'bottom') {
      formBorder = 'top';
    } else {
      formBorder = 'bottom';
    }
    if (ele && !ele.classList.contains(`devui-dropdown-origin-${formBorder}`)) {
      ele.classList.add(`devui-dropdown-origin-${formBorder}`);
      ele.classList.remove(`devui-dropdown-origin-${position}`);
    }
    if (wrapperEle && !wrapperEle.classList.contains(`devui-dropdown-${formBorder}`)) {
      wrapperEle.classList.add(`devui-dropdown-${formBorder}`);
      wrapperEle.classList.remove(`devui-dropdown-${position}`);
    }
  }

  formWithDropDown() {
    if (this.dropDown && this.dropDown.toggleEl) {
      if (!this.dropDown.toggleEl.nativeElement.classList.contains('devui-dropdown-origin')) {
        const parentEle = this.dropDown.toggleEl.nativeElement.parentElement;
        if (parentEle && parentEle.classList.contains('devui-dropdown-origin')) {
          return this.dropDown.toggleEl.nativeElement.parentElement;
        } else {
          return this.dropDown.toggleEl.nativeElement;
        }
      } else {
        return this.dropDown.toggleEl.nativeElement;
      }
    }
  }
}
