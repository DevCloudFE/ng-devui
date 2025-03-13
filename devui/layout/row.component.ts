import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  HostBinding,
  Input,
  OnChanges,
  OnInit,
  Renderer2,
  ViewEncapsulation
} from '@angular/core';
import { updateClassList } from './layout-utils';
import { DResponseParameter } from './layout.types';

@Component({
    selector: 'd-row',
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
    <ng-content></ng-content>
  `,
    styles: [
        `
      d-row.d-row {
        margin: 0;
        padding: 0;
      }
    `
    ],
    encapsulation: ViewEncapsulation.None,
    preserveWhitespaces: false,
    standalone: false
})
export class DRowComponent implements OnInit, OnChanges {
  @HostBinding('class.dl-row') dlRow = true;
  @HostBinding('class.dl-flex-row') dlFlexRow = true;
  @HostBinding('class.d-row') dRow = true;

  @Input() dCols: DResponseParameter<number>;

  constructor(
    private elementRef: ElementRef,
    private renderer: Renderer2,
  ) { }

  ngOnInit(): void {
    updateClassList(this, this.elementRef, this.renderer);
  }

  ngOnChanges(): void {
    updateClassList(this, this.elementRef, this.renderer);
  }
}
